import type { PetshopHomeRequest, PetshopHomeResponse } from '/_102030_/l2/petshop/shared/contracts/home.js';
import { execBff } from '/_102020_/l2/core/bff-client.js';

export async function loadPetshopHome(params: PetshopHomeRequest = {}) {
  return execBff<PetshopHomeResponse>('petshop.home.load', params);
}
