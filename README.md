# 102030 · Client Project Example

Part of **collab.codes**.

`102030` is a client-facing project built on top of the collab.codes opinionated model. In this workspace it currently represents the sample client application and shows how a customer project plugs into the shared runtime, master frontend, and master backend.

## What this project is for

This project is the customization surface for client-specific product work:

- client modules
- client UI
- client use cases
- client persistence integrations
- client-specific routing and behavior

In the current example, that role is represented by the `petshop` module.

## Why this model is useful

With this structure, a client project can focus on its own product logic while reusing strong platform layers from the rest of the workspace.

## Key advantages

- **Faster client delivery**: new customer projects start from an already-working runtime model.
- **Shared foundations**: frontend and backend platform behavior can be reused instead of copied.
- **Clear customization boundary**: business-specific logic stays in the client project.
- **Safer evolution**: platform improvements can benefit clients without rewriting each app from scratch.

## Current capabilities

- client module registration through workspace configuration
- integration with the master frontend shell model
- integration with the master backend BFF/router flow
- SPA support
- lazy-loaded route chunks through the shared frontend runtime
- shared blocking/error UX inherited from the master frontend
- publication-ready build outputs for local server and CDN-oriented delivery

## Production database migration

Use the single migration entrypoint for production setup:

```sh
pnpm run migrate:prod
```

`migrate` first validates the production configuration, then builds the workspace, ensures the configured PostgreSQL database exists, applies the generated PostgreSQL schema additively, validates AWS credentials, creates the registered DynamoDB tables, and records the schema snapshot log. It creates missing PostgreSQL tables, adds missing columns, and creates missing indexes without deleting existing rows.

This migration mode is intentionally conservative. It does not rename columns, drop columns, drop tables, change existing column types, or backfill business data automatically. Those changes need explicit migration scripts.

Runtime configuration is read from environment variables or `.env`:

- `APP_ENV=production` selects the production table names.
- `AWS_REGION` selects the DynamoDB region.
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and optionally `AWS_SESSION_TOKEN` are used when the process is not already running with an AWS role/profile.
- `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, and `PGPASSWORD` select the PostgreSQL target.

For `APP_ENV=production`, these values must be explicit. If no `.env` is present and the required variables are not exported in the shell, `pnpm run migrate:prod` fails before build instead of falling back to local defaults.

Use `.env.example` as the template for the required production variables.

Production DynamoDB table names are declared by the generated persistence manifests, including MDM tables such as `mdm_documents`, `mdm_relationship`, `mdm_prospect_relationship`, `mdm_audit_log`, `mdm_tag`, `mdm_comment`, `mdm_attachment`, and `mdm_number_sequence`, plus module tables such as `platform_schema_snapshot_log` and `petshop_product_documents`.

## Role inside the collab.codes model

This project is one piece of the four-project setup:

- `102029`: common runtime
- `102033`: master frontend
- `102034`: master backend
- `102030`: client project

That separation keeps client code easier to reason about while still benefiting from opinionated shared layers.

## Features inherited from the current platform

- route-level lazy loading
- chunk caching after first load
- shared shell navigation model
- global busy/timeout/error handling for user-triggered actions
- BFF-based frontend communication
- local and CDN-oriented publication targets

## Support

If you need help, please open a **GitHub Issue** in the repository that contains this project.

Please include:

- which client flow or module is affected
- exact steps to reproduce
- expected result
- actual result
- screenshots or screen recording when useful
- browser logs and server logs when available

## Notes for adopters

If you want to create another client project based on this model, this project should be treated as an example of where customer-specific code belongs, not as the place for common runtime or master platform logic.
