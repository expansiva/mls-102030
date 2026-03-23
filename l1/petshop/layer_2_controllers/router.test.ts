import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequestContext, execBff } from '/_102021_/l1/server/layer_2_controllers/execBff.js';
import { resetPetshopCatalogForTests } from '/_102030_/l1/petshop/layer_3_usecases/catalogUsecases.js';

test.beforeEach(() => {
  resetPetshopCatalogForTests();
});

test('petshop router serves catalog and top products through execBff', async () => {
  const ctx = createRequestContext();

  const seeded = await execBff({
    routine: 'petshop.seedMockData',
    params: {},
    meta: { source: 'test' },
  }, ctx);
  assert.equal(seeded.statusCode, 200);

  const listed = await execBff({
    routine: 'petshop.listCatalog',
    params: { category: 'Banho' },
    meta: { source: 'test' },
  }, ctx);
  assert.equal(listed.statusCode, 200);
  assert.equal(listed.response.ok, true);
  if (!listed.response.ok || !listed.response.data) {
    throw new Error('Expected catalog response');
  }
  const catalog = listed.response.data as Array<{ category: string }>;
  assert.equal(catalog.every((item) => item.category === 'Banho'), true);

  const top = await execBff({
    routine: 'petshop.getTopProducts',
    params: { limit: 2 },
    meta: { source: 'test' },
  }, ctx);
  assert.equal(top.statusCode, 200);
  assert.equal(top.response.ok, true);
  if (!top.response.ok || !top.response.data) {
    throw new Error('Expected top products response');
  }
  const topProducts = top.response.data as Array<{ highlightScore: number }>;
  assert.equal(topProducts.length, 2);
  assert.equal(topProducts[0].highlightScore >= topProducts[1].highlightScore, true);
});

test('petshop home load aggregates seed, catalog and top products in one BFF call', async () => {
  const ctx = createRequestContext();

  const home = await execBff({
    routine: 'petshop.home.load',
    params: {
      category: 'Banho',
      topLimit: 2,
    },
    meta: { source: 'test' },
  }, ctx);

  assert.equal(home.statusCode, 200);
  assert.equal(home.response.ok, true);
  if (!home.response.ok || !home.response.data) {
    throw new Error('Expected home response');
  }

  const data = home.response.data as {
    seed: { totalCount: number };
    catalog: Array<{ category: string }>;
    topProducts: Array<{ highlightScore: number }>;
  };

  assert.equal(data.seed.totalCount > 0, true);
  assert.equal(data.catalog.every((item) => item.category === 'Banho'), true);
  assert.equal(data.topProducts.length, 2);
});

test('petshop updateProduct records audit log and status history when stock status changes', async () => {
  const ctx = createRequestContext();

  const seeded = await execBff({
    routine: 'petshop.seedMockData',
    params: {},
    meta: { source: 'test', userId: 'user-petshop-admin' },
  }, ctx);
  assert.equal(seeded.statusCode, 200);

  const catalog = await execBff({
    routine: 'petshop.listCatalog',
    params: {},
    meta: { source: 'test', userId: 'user-petshop-admin' },
  }, ctx);
  assert.equal(catalog.statusCode, 200);
  assert.equal(catalog.response.ok, true);
  if (!catalog.response.ok || !catalog.response.data) {
    throw new Error('Expected catalog response');
  }

  const firstProduct = (catalog.response.data as Array<{ productId: string; stockStatus: string; priceInCents: number }>)[0];
  assert.ok(firstProduct);

  const nextStockStatus = firstProduct.stockStatus === 'in_stock' ? 'low_stock' : 'in_stock';
  const updated = await execBff({
    routine: 'petshop.updateProduct',
    params: {
      productId: firstProduct.productId,
      author: 'maria.petshop',
      stockStatus: nextStockStatus,
      priceInCents: firstProduct.priceInCents + 500,
      description: 'Atualizado para teste de auditoria',
    },
    meta: { source: 'test', userId: 'user-petshop-admin' },
  }, ctx);

  assert.equal(updated.statusCode, 200);
  assert.equal(updated.response.ok, true);

  const auditRows = await ctx.data.mdmAuditLog.findMany({
    where: {
      entityType: 'PetshopProduct',
      entityId: firstProduct.productId,
      module: 'petshop',
    },
  });
  assert.equal(auditRows.length, 1);
  assert.equal(auditRows[0]?.action, 'update');
  assert.equal(auditRows[0]?.routine, 'petshop.updateProduct');
  assert.equal(auditRows[0]?.actorId, 'maria.petshop');

  const statusRows = await ctx.data.mdmStatusHistory.findMany({
    where: {
      entityType: 'PetshopProduct',
      entityId: firstProduct.productId,
      module: 'petshop',
    },
  });
  assert.equal(statusRows.length, 1);
  assert.equal(statusRows[0]?.fromStatus, firstProduct.stockStatus);
  assert.equal(statusRows[0]?.toStatus, nextStockStatus);
  assert.equal(statusRows[0]?.reasonCode, 'PETSHOP_STOCK_STATUS_UPDATED');
  assert.equal(statusRows[0]?.actorId, 'maria.petshop');
});
