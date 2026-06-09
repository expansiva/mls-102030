/// <mls fileReference="_102030_/l2/petShopStripe/web/contracts/checkoutPage.ts" enhancement="_blank" />

export interface PetShopStripeGetCheckoutCartSummaryInput {
  cartId: string;
}

export interface PetShopStripeGetCheckoutCartSummaryOutput {
  cartId: string;
  items: Array<{ itemId: string; itemType: 'product' | 'service'; productId: string; serviceId: string; name: string; quantity: number; unitPrice: number; totalPrice: number }>;
  totals: { subtotal: number; discount: number; shipping: number; total: number };
  currency: string;
}

export interface PetShopStripeCreateOrderFromCheckoutInput {
  cartId: string;
  deliveryAddress: { street: string; number: string; complement: string; district: string; city: string; state: string; postalCode: string; country: string };
  contact: { name: string; email: string; phone: string };
}

export interface PetShopStripeCreateOrderFromCheckoutOutput {
  orderId: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  orderSummary: { items: Array<{ itemId: string; itemType: 'product' | 'service'; name: string; quantity: number; unitPrice: number; totalPrice: number }>; totals: { subtotal: number; discount: number; shipping: number; total: number }; currency: string };
}

export interface PetShopStripeConfirmStripePaymentInput {
  orderId: string;
  paymentIntentId: string;
  paymentMethod: string;
  confirmationData: { clientSecret: string; returnUrl: string };
}

export interface PetShopStripeConfirmStripePaymentOutput {
  paymentStatus: string;
  orderStatus: string;
  confirmation: { orderId: string; receiptUrl: string; paidAt: string };
}