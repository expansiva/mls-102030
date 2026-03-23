/// <mls fileReference="_102030_/l1/petshop/layer_3_usecases/catalogUsecases.ts" enhancement="_blank" />
import type {
  PetshopCatalogProduct,
  PetshopHomeLoadParams,
  PetshopHomeLoadResult,
  PetshopSeedResult,
  PetshopUpdateProductParams,
} from '/_102030_/l1/petshop/module.js';
import { getPetshopMockProducts } from '/_102030_/l2/petshop/shared/mock/adminMock.js';
import { AuditLogService, StatusHistoryService } from '/_102021_/l1/mdm/layer_3_usecases/core/DataRecordService.js';
import { AppError, type RequestContext } from '/_102021_/l1/server/layer_2_controllers/contracts.js';

async function getPetshopProductRepository(ctx: RequestContext) {
  return ctx.data.moduleData.getTable<PetshopCatalogProduct>('petshopProduct');
}

export function resetPetshopCatalogForTests() {}

export async function seedPetshopMockData(
  ctx: RequestContext,
  force = false,
): Promise<PetshopSeedResult> {
  const repository = await getPetshopProductRepository(ctx);
  const mockProducts = getPetshopMockProducts();
  const nowIso = ctx.clock.nowIso();
  const existingRows = await repository.findMany();

  if (existingRows.length > 0 && !force) {
    return {
      insertedCount: 0,
      totalCount: existingRows.length,
      seededAt: nowIso,
    };
  }

  if (force) {
    for (const row of existingRows) {
      await repository.delete({
        where: { productId: row.productId },
      });
    }
  }

  for (const product of mockProducts) {
    await repository.upsert({
      record: {
        ...product,
        updatedAt: nowIso,
      },
    });
  }

  return {
    insertedCount: mockProducts.length,
    totalCount: mockProducts.length,
    seededAt: nowIso,
  };
}

export async function listPetshopCatalog(
  ctx: RequestContext,
  input?: {
  category?: string;
  query?: string;
}) {
  const repository = await getPetshopProductRepository(ctx);
  const rows = await repository.findMany({
    orderBy: {
      field: 'name',
      direction: 'asc',
    },
  });
  const category = input?.category?.trim().toLowerCase();
  const query = input?.query?.trim().toLowerCase();

  return rows.filter((product) => {
    if (category && product.category.toLowerCase() !== category) {
      return false;
    }
    if (!query) {
      return true;
    }
    return [
      product.name,
      product.category,
      product.description,
    ].some((value) => value.toLowerCase().includes(query));
  });
}

export async function getPetshopTopProducts(
  ctx: RequestContext,
  limit = 3,
) {
  const repository = await getPetshopProductRepository(ctx);
  const rows = await repository.findMany();
  return [...rows]
    .sort((left, right) => right.highlightScore - left.highlightScore)
    .slice(0, Math.max(1, Math.min(limit, 12)));
}

export async function loadPetshopHome(
  ctx: RequestContext,
  input?: PetshopHomeLoadParams,
): Promise<PetshopHomeLoadResult> {
  const seed = await seedPetshopMockData(ctx, input?.forceSeed === true);
  const [catalog, topProducts] = await Promise.all([
    listPetshopCatalog(ctx, {
      category: input?.category,
      query: input?.query,
    }),
    getPetshopTopProducts(ctx, input?.topLimit ?? 3),
  ]);

  return {
    seed,
    catalog,
    topProducts,
  };
}

export async function updatePetshopProduct(
  ctx: RequestContext,
  input: PetshopUpdateProductParams,
): Promise<PetshopCatalogProduct> {
  const productId = input.productId?.trim();
  if (!productId) {
    throw new AppError('VALIDATION_ERROR', 'productId is required', 400, { field: 'productId' });
  }

  const repository = await getPetshopProductRepository(ctx);
  const current = await repository.findOne({
    where: {
      productId,
    },
  });

  if (!current) {
    throw new AppError('NOT_FOUND', 'Petshop product not found', 404, { productId });
  }

  const next: PetshopCatalogProduct = {
    ...current,
    name: input.name ?? current.name,
    category: input.category ?? current.category,
    priceInCents: input.priceInCents ?? current.priceInCents,
    highlightScore: input.highlightScore ?? current.highlightScore,
    stockStatus: input.stockStatus ?? current.stockStatus,
    description: input.description ?? current.description,
    updatedAt: ctx.clock.nowIso(),
  };

  await repository.upsert({
    record: next,
  });

  await AuditLogService.record(ctx, ctx.data, {
    entityType: 'PetshopProduct',
    entityId: next.productId,
    action: 'update',
    module: 'petshop',
    routine: 'petshop.updateProduct',
    before: current as unknown as Record<string, unknown>,
    after: next as unknown as Record<string, unknown>,
    actor: input.author?.trim()
      ? {
          actorId: input.author.trim(),
          actorType: 'user',
        }
      : undefined,
  });

  if (current.stockStatus !== next.stockStatus) {
    await StatusHistoryService.record(ctx, ctx.data, {
      entityType: 'PetshopProduct',
      entityId: next.productId,
      fromStatus: current.stockStatus,
      toStatus: next.stockStatus,
      reason: 'Petshop catalog stock status changed',
      reasonCode: 'PETSHOP_STOCK_STATUS_UPDATED',
      module: 'petshop',
      routine: 'petshop.updateProduct',
      metadata: {
        name: next.name,
        category: next.category,
      },
      actor: input.author?.trim()
        ? {
            actorId: input.author.trim(),
            actorType: 'user',
          }
        : undefined,
    });
  }

  return next;
}
