/// <mls fileReference="_102030_/l2/petShopStripe/web/contracts/adminOrdersPage.ts" enhancement="_blank" />
export interface PetShopStripeGetOrderAdminListInput {
  statusFilter: string;
  periodStart: string;
  periodEnd: string;
  orderNumber: string;
  page: number;
  pageSize: number;
}

export interface PetShopStripeGetOrderAdminListOutput {
  orders: Array<{ orderId: string; orderNumber: string; status: string; paymentStatus: string; totalAmount: number; createdAt: string; updatedAt: string; }>;
  page: number;
  pageSize: number;
  total: number;
}

export interface PetShopStripeUpdateOrderStatusInput {
  orderId: string;
  newStatus: string;
  statusReason: string;
}

export interface PetShopStripeUpdateOrderStatusOutput {
  orderId: string;
  status: string;
  statusHistory: Array<{ fromStatus: string; toStatus: string; changedAt: string; changedBy: string; }>;
  updatedAt: string;
}

export interface PetShopStripeGetServiceBookingsInput {
  serviceDate: string;
  serviceId: string;
  status: string;
  page: number;
  pageSize: number;
}

export interface PetShopStripeGetServiceBookingsOutput {
  serviceBookings: Array<{ serviceBookingId: string; serviceId: string; serviceName: string; customerId: string; customerName: string; petId: string; petName: string; status: string; scheduledDate: string; scheduledStartTime: string; scheduledEndTime: string; orderId: string; }>;
  page: number;
  pageSize: number;
  total: number;
}