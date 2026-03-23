import type {
  PetshopCatalogProduct,
  PetshopHomeLoadParams,
  PetshopHomeLoadResult,
} from '/_102030_/l1/petshop/module.js';

export type PetshopHomeRequest = PetshopHomeLoadParams;

export interface PetshopHomeResponse extends PetshopHomeLoadResult {
  catalog: PetshopCatalogProduct[];
  topProducts: PetshopCatalogProduct[];
}
