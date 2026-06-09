/// <mls fileReference="_102030_/l2/petShopStripe/web/contracts/adminCatalogPage.ts" enhancement="_blank" />

export interface PetShopStripeGetCatalogAdminListInput {
    itemType: string;
    statusFilter: string;
    categoryId: string;
    searchText: string;
    page: number;
    pageSize: number;
}

export interface PetShopStripeGetCatalogAdminListOutput {
    items: Array<{ itemId: string; itemType: string; name: string; categoryId: string; categoryName: string; price: number; status: string; updatedAt: string }>;
    pagination: { page: number; pageSize: number; totalItems: number; totalPages: number };
}

export interface PetShopStripeManageCatalogInput {
    action: string;
    itemType: string;
    itemId: string;
    payload: { name: string; description: string; price: number; duration: number; status: string; categoryId: string };
}

export interface PetShopStripeManageCatalogOutput {
    itemId: string;
    itemType: string;
    status: string;
    updatedAt: string;
}