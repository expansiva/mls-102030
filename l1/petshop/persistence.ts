/// <mls fileReference="_102030_/l1/petshop/persistence.ts" enhancement="_blank" />
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const tableDefinitions: TableDefinition[] = [
  {
    moduleId: 'petshop',
    repositoryName: 'petshopProduct',
    tableName: 'petshop_product',
    purpose: 'cadastro',
    description: 'Petshop product catalog used by the storefront BFF and replicated as hot backup.',
    backupHot: true,
    storageProfile: 'postgresHotBackup',
    writeMode: 'writeBehind',
    columns: [
      { name: 'productId', postgresType: 'TEXT' },
      { name: 'name', postgresType: 'TEXT' },
      { name: 'category', postgresType: 'TEXT' },
      { name: 'priceInCents', postgresType: 'INTEGER' },
      { name: 'currency', postgresType: 'TEXT' },
      { name: 'highlightScore', postgresType: 'INTEGER' },
      { name: 'stockStatus', postgresType: 'TEXT' },
      { name: 'description', postgresType: 'TEXT' },
      { name: 'updatedAt', postgresType: 'TIMESTAMPTZ' },
    ],
    primaryKey: ['productId'],
    indexes: [
      { name: 'idx_petshop_product_category', columns: ['category'] },
      { name: 'idx_petshop_product_highlight', columns: [{ name: 'highlightScore', direction: 'desc' }] },
      { name: 'idx_petshop_product_updated', columns: [{ name: 'updatedAt', direction: 'desc' }] },
    ],
    dynamo: {
      tableNameByEnv: {
        development: 'petshop_product_documents',
        staging: 'petshop_product_documents_test',
        production: 'petshop_product_documents',
      },
      partitionKey: 'productId',
    },
    version: 1,
  },
];
