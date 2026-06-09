/// <mls fileReference="_102030_/l2/petShopStripe/web/contracts/adminMetricsPage.ts" enhancement="_blank" />

export interface PetShopStripeGetMetricsDashboardInput {
  dateRange: { from: string; to: string };
  filters: { orderStatus: Array<string>; paymentStatus: Array<string>; itemType: Array<string> };
  granularity: 'hour' | 'day' | 'week' | 'month';
}

export interface PetShopStripeGetMetricsDashboardOutput {
  series: { revenue: Array<{ timestamp: string; value: number }>; orders: Array<{ timestamp: string; value: number }>; averageTicket: Array<{ timestamp: string; value: number }>; approvalRate: Array<{ timestamp: string; value: number }>; canceledOrders: Array<{ timestamp: string; value: number }> };
  aggregations: { totalRevenue: number; orderCount: number; averageTicket: number; approvedPayments: number; canceledOrders: number };
  dimensions: { orderStatus: Array<string>; paymentStatus: Array<string>; itemType: Array<string> };
}