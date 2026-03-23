/// <mls fileReference="_102030_/l1/petshop/layer_2_controllers/catalogHandlers.ts" enhancement="_blank" />
import { AppError, ok, type BffHandler } from '/_102021_/l1/server/layer_2_controllers/contracts.js';
import {
  getPetshopTopProducts,
  listPetshopCatalog,
  loadPetshopHome,
  seedPetshopMockData,
  updatePetshopProduct,
} from '/_102030_/l1/petshop/layer_3_usecases/catalogUsecases.js';
import type { PetshopUpdateProductParams } from '/_102030_/l1/petshop/module.js';

function parseLimit(value: unknown) {
  if (value === undefined) {
    return 3;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError('VALIDATION_ERROR', 'limit must be a positive integer', 400);
  }

  return parsed;
}

export const petshopListCatalogHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  return ok(await listPetshopCatalog(ctx, {
    category: typeof params.category === 'string' ? params.category : undefined,
    query: typeof params.query === 'string' ? params.query : undefined,
  }));
};

export const petshopGetTopProductsHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  return ok(await getPetshopTopProducts(ctx, parseLimit(params.limit)));
};

export const petshopSeedMockDataHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  return ok(await seedPetshopMockData(ctx, params.force === true));
};

export const petshopHomeLoadHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  return ok(await loadPetshopHome(ctx, {
    category: typeof params.category === 'string' ? params.category : undefined,
    query: typeof params.query === 'string' ? params.query : undefined,
    topLimit: params.topLimit === undefined ? undefined : parseLimit(params.topLimit),
    forceSeed: params.forceSeed === true,
  }));
};

export const petshopUpdateProductHandler: BffHandler = async ({ request, ctx }) => {
  const params = (request.params ?? {}) as Record<string, unknown>;
  return ok(await updatePetshopProduct(ctx, {
    productId: typeof params.productId === 'string' ? params.productId : '',
    author: typeof params.author === 'string' ? params.author : undefined,
    name: typeof params.name === 'string' ? params.name : undefined,
    category: typeof params.category === 'string' ? params.category : undefined,
    priceInCents:
      params.priceInCents === undefined
        ? undefined
        : Number.isInteger(Number(params.priceInCents))
          ? Number(params.priceInCents)
          : undefined,
    highlightScore:
      params.highlightScore === undefined
        ? undefined
        : Number.isInteger(Number(params.highlightScore))
          ? Number(params.highlightScore)
          : undefined,
    stockStatus:
      params.stockStatus === 'in_stock' || params.stockStatus === 'low_stock' || params.stockStatus === 'out_of_stock'
        ? params.stockStatus
        : undefined,
    description: typeof params.description === 'string' ? params.description : undefined,
  } satisfies PetshopUpdateProductParams));
};
