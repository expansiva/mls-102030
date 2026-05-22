#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ENV_CANDIDATE_PATHS = [
  resolve(ROOT_DIR, '.env'),
  resolve(ROOT_DIR, '_102034_', 'l1', '.env'),
  resolve(ROOT_DIR, 'projects', '_102034_', 'l1', '.env'),
];
const GENERATED_SCHEMA_BOOTSTRAP_PATH = resolve(
  ROOT_DIR,
  'dist',
  'local',
  '_102034_',
  'l1',
  'server',
  'layer_1_external',
  'persistence',
  'schemaBootstrap.js',
);
const SETUP_TIMEOUT_MS = Number(process.env.MIGRATE_SETUP_TIMEOUT_MS ?? 5 * 60 * 1000);

function log(message) {
  console.log(`[migrate] ${message}`);
}

function stripWrappingQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function loadEnvFile() {
  for (const envPath of ENV_CANDIDATE_PATHS) {
    if (!existsSync(envPath)) {
      continue;
    }

    const content = readFileSync(envPath, 'utf8');
    for (const rawLine of content.split(/\r?\n/u)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) {
        continue;
      }

      const separatorIndex = line.indexOf('=');
      if (separatorIndex <= 0) {
        continue;
      }

      const key = line.slice(0, separatorIndex).trim();
      const value = stripWrappingQuotes(line.slice(separatorIndex + 1).trim());
      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }

    return envPath;
  }

  return null;
}

function normalizeAppEnv(value) {
  switch ((value ?? '').toLowerCase()) {
    case 'dev':
    case 'development':
      return 'development';
    case 'staging':
    case 'stage':
      return 'staging';
    case 'prod':
    case 'production':
      return 'production';
    default:
      throw new Error('APP_ENV must be one of: development, staging, production');
  }
}

function readEnvValue(key, appEnv) {
  const suffix = appEnv.toUpperCase();
  return process.env[`${key}_${suffix}`] ?? process.env[key];
}

function requireValues(appEnv, keys) {
  return keys.filter((key) => !readEnvValue(key, appEnv));
}

function hasAwsCredentialSource(appEnv) {
  const hasAccessKeyPair =
    Boolean(readEnvValue('AWS_ACCESS_KEY_ID', appEnv)) &&
    Boolean(readEnvValue('AWS_SECRET_ACCESS_KEY', appEnv));

  return (
    hasAccessKeyPair ||
    Boolean(process.env.AWS_PROFILE) ||
    Boolean(process.env.AWS_WEB_IDENTITY_TOKEN_FILE) ||
    Boolean(process.env.AWS_CONTAINER_CREDENTIALS_RELATIVE_URI) ||
    Boolean(process.env.AWS_CONTAINER_CREDENTIALS_FULL_URI)
  );
}

function preflight() {
  const envPath = loadEnvFile();
  const appEnv = normalizeAppEnv(process.env.APP_ENV);

  if (appEnv === 'production') {
    const missing = requireValues(appEnv, [
      'PGHOST',
      'PGDATABASE',
      'PGUSER',
      'PGPASSWORD',
      'AWS_REGION',
    ]);

    if (!hasAwsCredentialSource(appEnv)) {
      missing.push('AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY or AWS_PROFILE/AWS role');
    }

    if (missing.length > 0) {
      throw new Error(
        [
          'Production migration is missing required configuration.',
          `Loaded env file: ${envPath ?? 'none'}`,
          `Missing: ${missing.join(', ')}`,
          'Create .env or export the variables before running pnpm run migrate:prod.',
        ].join('\n'),
      );
    }
  }

  log(`environment=${appEnv}`);
  log(`env file=${envPath ?? 'none'}`);
  log(
    `postgres=${readEnvValue('PGUSER', appEnv) ?? '(default)'}@${readEnvValue('PGHOST', appEnv) ?? '(default)'}:${readEnvValue('PGPORT', appEnv) ?? '5432'}/${readEnvValue('PGDATABASE', appEnv) ?? '(default)'}`,
  );
  log(`aws region=${readEnvValue('AWS_REGION', appEnv) ?? '(default)'}`);
}

function run(command, args, options = {}) {
  log(`running: ${command} ${args.join(' ')}`);
  const result = spawnSync(command, args, {
    cwd: ROOT_DIR,
    stdio: 'inherit',
    env: process.env,
    timeout: options.timeout,
  });

  if (result.error?.code === 'ETIMEDOUT') {
    throw new Error(`Command timed out after ${options.timeout}ms: ${command} ${args.join(' ')}`);
  }

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`Command failed with exit code ${result.status}: ${command} ${args.join(' ')}`);
  }
}

function resetPublicSchemaSource() {
  return `async function resetPublicSchema(pool) {
    console.info('[bootstrapSchema] Additive migration mode — preserving existing public schema data');
}
`;
}

function upsertResetPublicSchema(source) {
  const functionStart = source.indexOf('async function resetPublicSchema(pool) {');
  const rebuildStart = source.indexOf('async function rebuildPostgresSchema(env, definitions, snapshotId) {');
  if (rebuildStart === -1) {
    throw new Error('Unable to find generated rebuildPostgresSchema function');
  }

  if (functionStart === -1) {
    return source.replace(
      `async function rebuildPostgresSchema(env, definitions, snapshotId) {`,
      `${resetPublicSchemaSource()}async function rebuildPostgresSchema(env, definitions, snapshotId) {`,
    );
  }

  if (functionStart > rebuildStart) {
    throw new Error('Generated schema bootstrap has unexpected function order');
  }

  return `${source.slice(0, functionStart)}${resetPublicSchemaSource()}${source.slice(rebuildStart)}`;
}

function applyViewDefinitionsSource() {
  return `async function applyViewDefinitions(pool, input) {
    const viewDefs = await loadViewDefinitions();
    for (const view of viewDefs) {
        for (const statement of view.statements) {
            if (!input.timescaleAvailable) {
                console.warn(\`[bootstrapSchema] Skipped TimescaleDB view statement for \${view.viewName}\`);
                continue;
            }
            try {
                await pool.query(statement);
            }
            catch (error) {
                if (['42P07', '42710', '42723'].includes(error?.code)) {
                    console.warn(\`[bootstrapSchema] Skipped existing view/policy statement for \${view.viewName}\`);
                    continue;
                }
                throw error;
            }
        }
    }
}
`;
}

function upsertApplyViewDefinitions(source) {
  const functionStart = source.indexOf('async function applyViewDefinitions(pool');
  const bootstrapStart = source.indexOf('export async function bootstrapSchema(');
  if (functionStart === -1 || bootstrapStart === -1 || functionStart > bootstrapStart) {
    throw new Error('Unable to find generated applyViewDefinitions function');
  }

  return `${source.slice(0, functionStart)}${applyViewDefinitionsSource()}${source.slice(bootstrapStart)}`;
}

function patchGeneratedSchemaBootstrap() {
  if (!existsSync(GENERATED_SCHEMA_BOOTSTRAP_PATH)) {
    throw new Error(`Generated schema bootstrap not found: ${GENERATED_SCHEMA_BOOTSTRAP_PATH}`);
  }

  let source = readFileSync(GENERATED_SCHEMA_BOOTSTRAP_PATH, 'utf8');
  const original = source;

  if (!source.includes('async function ensureTimescaleAvailable')) {
    source = source.replace(
    `function buildCreateIndexSql(definition) {
    return (definition.indexes ?? []).map((index) => \`CREATE \${index.unique ? 'UNIQUE ' : ''}INDEX \${quoteIdentifier(index.name)}
     ON \${quoteIdentifier(definition.tableName)} (\${index.columns.map((column) => renderIndexColumn(column)).join(', ')})\`);
}
async function rebuildPostgresSchema(env, definitions, snapshotId) {`,
      `function buildCreateIndexSql(definition) {
    return (definition.indexes ?? []).map((index) => \`CREATE \${index.unique ? 'UNIQUE ' : ''}INDEX \${quoteIdentifier(index.name)}
     ON \${quoteIdentifier(definition.tableName)} (\${index.columns.map((column) => renderIndexColumn(column)).join(', ')})\`);
}
async function ensureTimescaleAvailable(pool) {
    const existing = await pool.query("SELECT EXISTS(SELECT 1 FROM pg_extension WHERE extname = 'timescaledb') AS exists");
    if (existing.rows[0]?.exists) {
        return true;
    }
    try {
        await pool.query('CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE');
        return true;
    }
    catch {
        console.warn('[bootstrapSchema] TimescaleDB extension not available — hypertables will be created as regular tables');
        return false;
    }
}
async function rebuildPostgresSchema(env, definitions, snapshotId) {`,
    );
  }

  source = source.replace(
    `    const hasTimescale = definitions.some((d) => d.timescale?.hypertable);
    if (hasTimescale) {
        await pool.query('DROP EXTENSION IF EXISTS timescaledb CASCADE');
    }
    await pool.query('DROP SCHEMA IF EXISTS public CASCADE');
    await pool.query('CREATE SCHEMA public');
    let timescaleAvailable = false;
    if (hasTimescale) {
        try {
            await pool.query('CREATE EXTENSION timescaledb CASCADE');
            timescaleAvailable = true;
        }
        catch {
            console.warn('[bootstrapSchema] TimescaleDB extension not available — hypertables will be created as regular tables');
        }
    }`,
    `    const hasTimescale = definitions.some((d) => d.timescale?.hypertable);
    const timescaleAvailable = hasTimescale ? await ensureTimescaleAvailable(pool) : false;
    await resetPublicSchema(pool);`,
  );

  source = source.replace(
    `    const hasTimescale = definitions.some((d) => d.timescale?.hypertable);
    const timescaleAvailable = hasTimescale ? await ensureTimescaleAvailable(pool) : false;
    await pool.query('DROP SCHEMA IF EXISTS public CASCADE');
    await pool.query('CREATE SCHEMA public');`,
    `    const hasTimescale = definitions.some((d) => d.timescale?.hypertable);
    const timescaleAvailable = hasTimescale ? await ensureTimescaleAvailable(pool) : false;
    await resetPublicSchema(pool);`,
  );

  source = upsertResetPublicSchema(source);

  source = source.replace(
    'return `CREATE ${unloggedSql}TABLE ${quoteIdentifier(definition.tableName)} (${columnsSql.join(\', \')}${primaryKeySql})`;',
    'return `CREATE ${unloggedSql}TABLE IF NOT EXISTS ${quoteIdentifier(definition.tableName)} (${columnsSql.join(\', \')}${primaryKeySql})`;',
  );

  if (!source.includes('function buildAddColumnSql')) {
    source = source.replace(
      `function buildCreateIndexSql(definition) {`,
      `function buildAddColumnSql(definition, column) {
    const defaultSql = column.defaultSql ? \` DEFAULT \${column.defaultSql}\` : '';
    return \`ALTER TABLE \${quoteIdentifier(definition.tableName)} ADD COLUMN IF NOT EXISTS \${quoteIdentifier(column.name)} \${column.postgresType}\${defaultSql}\`;
}
function buildCreateIndexSql(definition) {`,
    );
  }

  source = source.replaceAll(
    "CREATE ${index.unique ? 'UNIQUE ' : ''}INDEX ${quoteIdentifier(index.name)}",
    "CREATE ${index.unique ? 'UNIQUE ' : ''}INDEX IF NOT EXISTS ${quoteIdentifier(index.name)}",
  );

  source = source.replace(
    `    for (const definition of orderedDefinitions) {
        await pool.query(buildCreateTableSql(definition));
    }`,
    `    for (const definition of orderedDefinitions) {
        await pool.query(buildCreateTableSql(definition));
        for (const column of definition.columns) {
            await pool.query(buildAddColumnSql(definition, column));
        }
    }`,
  );

  source = source.replace(
    `await pool.query('INSERT INTO "_schema_migrations" ("id") VALUES ($1)', [snapshotId]);`,
    `await pool.query('INSERT INTO "_schema_migrations" ("id") VALUES ($1) ON CONFLICT ("id") DO NOTHING', [snapshotId]);`,
  );

  source = upsertApplyViewDefinitions(source);

  if (source.includes("DROP EXTENSION IF EXISTS timescaledb CASCADE")) {
    throw new Error('Unable to patch generated schema bootstrap TimescaleDB extension handling');
  }
  if (source.includes("DROP SCHEMA IF EXISTS public CASCADE") || source.includes('CREATE SCHEMA public')) {
    throw new Error('Unable to patch generated schema bootstrap public schema handling');
  }

  if (source === original) {
    log('generated schema bootstrap already avoids dropping TimescaleDB extension and public schema');
    return;
  }

  writeFileSync(GENERATED_SCHEMA_BOOTSTRAP_PATH, source);
  log('patched generated schema bootstrap ownership handling');
}

async function main() {
  if (process.argv.includes('--patch-only')) {
    patchGeneratedSchemaBootstrap();
    return;
  }

  preflight();
  run('npm', ['run', 'build']);
  patchGeneratedSchemaBootstrap();
  run('node', ['dist/local/_102034_/l1/scripts/setupServer.js'], {
    timeout: SETUP_TIMEOUT_MS,
  });
  log('completed');
}

if (resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  try {
    await main();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
