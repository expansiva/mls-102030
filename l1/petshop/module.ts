/// <mls fileReference="_102030_/l1/petshop/module.ts" enhancement="_blank" />
export interface PetshopCatalogProduct {
  productId: string;
  name: string;
  category: string;
  priceInCents: number;
  currency: 'BRL';
  highlightScore: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  description: string;
  updatedAt: string;
}

export interface PetshopSeedResult {
  insertedCount: number;
  totalCount: number;
  seededAt: string;
}

export interface PetshopHomeLoadParams {
  category?: string;
  query?: string;
  topLimit?: number;
  forceSeed?: boolean;
}

export interface PetshopHomeLoadResult {
  seed: PetshopSeedResult;
  catalog: PetshopCatalogProduct[];
  topProducts: PetshopCatalogProduct[];
}

export interface PetshopUpdateProductParams {
  productId: string;
  author?: string;
  name?: string;
  category?: string;
  priceInCents?: number;
  highlightScore?: number;
  stockStatus?: PetshopCatalogProduct['stockStatus'];
  description?: string;
}
