/// <mls fileReference="_102030_/l2/petShopStripe/web/contracts/cartPage.ts" enhancement="_blank" />

export interface PetShopStripeGetCartInput {
  cartContext: { cartId?: string };
  include: { items: boolean; totals: boolean };
}

export interface PetShopStripeGetCartOutput {
  cart: {
    cartId: string;
    status: string;
    currency: string;
    itemsCount: number;
    subtotalAmount: number;
    discountAmount: number;
    totalAmount: number;
    items: Array<{ itemId: string; productId?: string; serviceId?: string; name: string; quantity: number; unitPrice: number; totalPrice: number }>;
  };
}

export interface PetShopStripeUpdateCartInput {
  cartContext: { cartId?: string };
  changes: { items: Array<{ itemId?: string; productId?: string; serviceId?: string; quantity?: number; action: 'updateQuantity' | 'remove' }> };
}

export interface PetShopStripeUpdateCartOutput {
  cart: {
    cartId: string;
    status: string;
    itemsCount: number;
    subtotalAmount: number;
    discountAmount: number;
    totalAmount: number;
    items: Array<{ itemId: string; productId?: string; serviceId?: string; name: string; quantity: number; unitPrice: number; totalPrice: number }>;
  };
}

export interface PetShopStripeStartCheckoutInput {
  cartContext: { cartId?: string };
  deliveryContact?: { phone?: string; email?: string };
  deliveryAddress?: { addressId?: string; street?: string; number?: string; city?: string; state?: string; postalCode?: string };
}

export interface PetShopStripeStartCheckoutOutput {
  order: { orderId: string; status: string; paymentStatus: string; totalAmount: number };
  cart: { cartId: string; status: string };
}
