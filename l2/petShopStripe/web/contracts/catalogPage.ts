/// <mls fileReference="_102030_/l2/petShopStripe/web/contracts/catalogPage.ts" enhancement="_blank" />
export interface PetShopStripeGetCatalogListInput {
  categoria?: string;
  tipo?: string;
  precoMin?: number;
  precoMax?: number;
  page?: number;
  pageSize?: number;
}

export interface PetShopStripeGetCatalogListOutput {
  items: Array<{ itemId: string; itemType: 'Product' | 'Service'; title: string; summary: string; price: number; status: string; categoryTitle: string; }>;
  pagination: { page: number; pageSize: number; totalItems: number; };
}