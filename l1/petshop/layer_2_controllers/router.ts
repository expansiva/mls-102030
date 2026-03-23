/// <mls fileReference="_102030_/l1/petshop/layer_2_controllers/router.ts" enhancement="_blank" />
import type { BffHandler } from '/_102021_/l1/server/layer_2_controllers/contracts.js';
import {
  petshopGetTopProductsHandler,
  petshopHomeLoadHandler,
  petshopListCatalogHandler,
  petshopSeedMockDataHandler,
  petshopUpdateProductHandler,
} from '/_102030_/l1/petshop/layer_2_controllers/catalogHandlers.js';

export function createPetshopRouter(): Map<string, BffHandler> {
  return new Map<string, BffHandler>([
    ['petshop.home.load', petshopHomeLoadHandler],
    ['petshop.listCatalog', petshopListCatalogHandler],
    ['petshop.getTopProducts', petshopGetTopProductsHandler],
    ['petshop.seedMockData', petshopSeedMockDataHandler],
    ['petshop.updateProduct', petshopUpdateProductHandler],
  ]);
}
