/// <mls fileReference="_102030_/l2/petshop/web/shared/updateProduct.ts" enhancement="_blank" />
import type { PetshopCatalogProduct, PetshopUpdateProductParams } from '/_102030_/l2/petshop/shared/contracts/update-product.js';
import { execBff } from '/_102020_/l2/core/bff-client.js';

export async function updatePetshopProduct(params: PetshopUpdateProductParams) {
  return execBff<PetshopCatalogProduct>('petshop.updateProduct', params);
}
