/// <mls fileReference="_102030_/l2/petShopStripe/web/contracts/homePage.ts" enhancement="_blank" />
export interface PetShopStripeGetCatalogHighlightsInput {
  highlightLimits: { categories: number; products: number; services: number };
  filters: { categoryIds: string; availabilityStatus: string; priceRange: { min: number; max: number } };
}

export interface PetShopStripeGetCatalogHighlightsOutput {
  categories: Array<{ categoryId: string; name: string; imageUrl: string }>;
  items: Array<{ itemType: string; itemId: string; name: string; price: { amount: number; currency: string }; availabilityStatus: string; categoryIds: string; imageUrl: string }>;
}