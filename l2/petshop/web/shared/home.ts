/// <mls fileReference="_102030_/l2/petshop/web/shared/home.ts" enhancement="_blank" />
import type { BffClientOptions } from '/_102029_/l2/bffClient.js';
import type { PetshopHomeRequest, PetshopHomeResponse } from '/_102030_/l2/petshop/shared/contracts/home.js';
import { execBff } from '/_102029_/l2/bffClient.js';

export async function loadPetshopHome(params: PetshopHomeRequest = {}, options?: BffClientOptions) {
  return execBff<PetshopHomeResponse>('petshop.home.load', params, options);
}
