/// <mls fileReference="_102030_/l2/petshop/shared/contracts/home.ts" enhancement="_blank" />
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
