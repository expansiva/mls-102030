/// <mls fileReference="_102030_/l2/petshop/web/shared/updateProduct.ts" enhancement="_blank" />
import type { BffClientOptions } from '/_102029_/l2/bffClient.js';
import type { PetshopCatalogProduct, PetshopUpdateProductParams } from '/_102030_/l2/petshop/shared/contracts/update-product.js';
import { execBff } from '/_102029_/l2/bffClient.js';

export async function updatePetshopProduct(params: PetshopUpdateProductParams, options?: BffClientOptions) {
  return execBff<PetshopCatalogProduct>('petshop.updateProduct', params, options);
}
