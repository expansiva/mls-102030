/// <mls fileReference="_102030_/l2/petShopStripe/web/contracts/accountOrdersPage.ts" enhancement="_blank" />
export interface PetShopStripeGetOrderHistoryInput {
  customerId: string;
  filters: { orderStatus: string; startDate: string; endDate: string; };
}

export interface PetShopStripeGetOrderHistoryOutput {
  orders: Array<{ orderId: string; orderNumber: string; status: string; paymentStatus: string; totalAmount: number; createdAt: string; items: Array<{ itemType: 'product' | 'service'; itemId: string; name: string; quantity: number; unitPrice: number; }>; }>;
}

export interface PetShopStripeGetCustomerServiceBookingsInput {
  customerId: string;
  filters: { bookingStatus: string; startDate: string; endDate: string; };
}

export interface PetShopStripeGetCustomerServiceBookingsOutput {
  bookings: Array<{ serviceBookingId: string; status: string; scheduledDate: string; scheduledStartTime: string; scheduledEndTime: string; timezone: string; service: { serviceId: string; name: string; }; pet: { petId: string; name: string; }; }>;
}
