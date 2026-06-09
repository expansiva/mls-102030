/// <mls fileReference="_102030_/l2/petShopStripe/web/desktop/page11/adminMetricsPage.ts" enhancement="_102027_/l2/enhancementLit.ts" />

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PetShopStripeAdminMetricsPageBase } from '/_102030_/l2/petShopStripe/web/shared/adminMetricsPage.js';

@customElement('pet-shop-stripe--web--desktop--page11--admin-metrics-page-102030')
export class PetShopStripeDesktopPage11AdminMetricsPagePage extends PetShopStripeAdminMetricsPageBase {
  render() {
    const series = this.series;
    const aggregations = this.aggregations;
    const dimensions = this.dimensions;

    const revenuePoints = (series as any)?.revenue ?? [];
    const ordersPoints = (series as any)?.orders ?? [];
    const avgTicketPoints = (series as any)?.averageTicket ?? [];
    const approvalRatePoints = (series as any)?.approvalRate ?? [];
    const canceledOrdersPoints = (series as any)?.canceledOrders ?? [];

    const totalRevenue = (aggregations as any)?.totalRevenue ?? 0;
    const orderCount = (aggregations as any)?.orderCount ?? 0;
    const averageTicket = (aggregations as any)?.averageTicket ?? 0;
    const approvedPayments = (aggregations as any)?.approvedPayments ?? 0;
    const canceledOrders = (aggregations as any)?.canceledOrders ?? 0;

    const orderStatus = (dimensions as any)?.orderStatus ?? [];
    const paymentStatus = (dimensions as any)?.paymentStatus ?? [];
    const itemType = (dimensions as any)?.itemType ?? [];

    return html`
      <div class="min-h-screen bg-slate-50 text-slate-900">
        <header class="border-b border-slate-200 bg-white">
          <div class="mx-auto max-w-7xl px-6 py-5">
            <div class="flex items-start justify-between gap-6">
              <div class="min-w-0">
                <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">${this.msg.brand}</div>
                <h1 class="mt-1 text-2xl font-semibold leading-tight text-slate-900">${this.msg.pageTitle}</h1>
                <div class="mt-2 flex items-center gap-3">
                  <div class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
                    <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                    <span class="truncate">${this.status ?? ''}</span>
                  </div>
                </div>
              </div>
              <div class="hidden min-w-[260px] justify-end sm:flex">
                <div class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div class="text-xs font-medium text-slate-500">${this.msg.loadingGetMetricsDashboard}</div>
                  <div class="mt-1 text-sm text-slate-700">
                    ${(revenuePoints?.length ?? 0) > 0 ? this.msg.loaded : this.msg.loadingGetMetricsDashboard}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main class="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-6">
          <section class="col-span-12 lg:col-span-4">
            <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div class="border-b border-slate-100 px-5 py-4">
                <div class="text-sm font-semibold text-slate-900">${this.msg.pageTitle}</div>
                <div class="mt-1 text-xs text-slate-500">${this.msg.loadingGetMetricsDashboard}</div>
              </div>

              <div class="space-y-5 px-5 py-5">
                <div>
                  <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">event_time</div>
                  <div class="mt-2 grid grid-cols-2 gap-3">
                    <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div class="text-[11px] text-slate-500">start</div>
                      <div class="mt-1 text-sm font-medium text-slate-800">—</div>
                    </div>
                    <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div class="text-[11px] text-slate-500">end</div>
                      <div class="mt-1 text-sm font-medium text-slate-800">—</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">order_status</div>
                  <div class="mt-2 flex flex-wrap gap-2">
                    ${(orderStatus ?? []).map((s: any) => html`<span class="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">${s ?? ''}</span>`)}
                  </div>
                </div>

                <div>
                  <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">payment_status</div>
                  <div class="mt-2 flex flex-wrap gap-2">
                    ${(paymentStatus ?? []).map((s: any) => html`<span class="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">${s ?? ''}</span>`)}
                  </div>
                </div>

                <div>
                  <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">item_type</div>
                  <div class="mt-2 flex flex-wrap gap-2">
                    ${(itemType ?? []).map((s: any) => html`<span class="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">${s ?? ''}</span>`)}
                  </div>
                </div>

                <div class="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <div class="text-xs font-semibold text-amber-900">${this.msg.couldNotLoad}</div>
                  <div class="mt-1 text-xs text-amber-800">${this.status ?? ''}</div>
                </div>
              </div>
            </div>
          </section>

          <section class="col-span-12 lg:col-span-8">
            <div class="grid grid-cols-12 gap-6">
              <div class="col-span-12">
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">order_total</div>
                    <div class="mt-2 text-2xl font-semibold text-slate-900">${totalRevenue ?? 0}</div>
                  </div>
                  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">order_count</div>
                    <div class="mt-2 text-2xl font-semibold text-slate-900">${orderCount ?? 0}</div>
                  </div>
                  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">average_ticket</div>
                    <div class="mt-2 text-2xl font-semibold text-slate-900">${averageTicket ?? 0}</div>
                  </div>
                  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">approved_count</div>
                    <div class="mt-2 text-2xl font-semibold text-slate-900">${approvedPayments ?? 0}</div>
                  </div>
                  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">canceled_count</div>
                    <div class="mt-2 text-2xl font-semibold text-slate-900">${canceledOrders ?? 0}</div>
                  </div>
                </div>
              </div>

              <div class="col-span-12">
                <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
                    <div>
                      <div class="text-sm font-semibold text-slate-900">${this.msg.pageTitle}</div>
                      <div class="mt-1 text-xs text-slate-500">${this.msg.loaded}</div>
                    </div>
                    <div class="text-xs text-slate-500">event_time</div>
                  </div>

                  <div class="grid grid-cols-1 gap-6 p-5 xl:grid-cols-2">
                    <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div class="flex items-baseline justify-between gap-3">
                        <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">revenue</div>
                        <div class="text-xs text-slate-500">order_total</div>
                      </div>
                      <div class="mt-3 space-y-2">
                        ${(revenuePoints ?? []).map((p: any) => html`
                          <div class="grid grid-cols-12 items-center gap-3">
                            <div class="col-span-5 truncate text-xs text-slate-600">${p?.timestamp ?? ''}</div>
                            <div class="col-span-7">
                              <div class="flex items-center gap-3">
                                <div class="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                                  <div class="h-2 rounded-full bg-indigo-600" style="width: ${Math.min(100, Math.max(0, (Number(p?.value ?? 0) / Math.max(1, Number(totalRevenue ?? 0))) * 100))}%"></div>
                                </div>
                                <div class="w-16 text-right text-xs font-medium text-slate-800">${p?.value ?? 0}</div>
                              </div>
                            </div>
                          </div>
                        `)}
                      </div>
                    </div>

                    <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div class="flex items-baseline justify-between gap-3">
                        <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">orders</div>
                        <div class="text-xs text-slate-500">order_count</div>
                      </div>
                      <div class="mt-3 space-y-2">
                        ${(ordersPoints ?? []).map((p: any) => html`
                          <div class="grid grid-cols-12 items-center gap-3">
                            <div class="col-span-5 truncate text-xs text-slate-600">${p?.timestamp ?? ''}</div>
                            <div class="col-span-7">
                              <div class="flex items-center gap-3">
                                <div class="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                                  <div class="h-2 rounded-full bg-emerald-600" style="width: ${Math.min(100, Math.max(0, (Number(p?.value ?? 0) / Math.max(1, Number(orderCount ?? 0))) * 100))}%"></div>
                                </div>
                                <div class="w-16 text-right text-xs font-medium text-slate-800">${p?.value ?? 0}</div>
                              </div>
                            </div>
                          </div>
                        `)}
                      </div>
                    </div>

                    <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div class="flex items-baseline justify-between gap-3">
                        <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">averageTicket</div>
                        <div class="text-xs text-slate-500">order_total / order_count</div>
                      </div>
                      <div class="mt-3 space-y-2">
                        ${(avgTicketPoints ?? []).map((p: any) => html`
                          <div class="grid grid-cols-12 items-center gap-3">
                            <div class="col-span-5 truncate text-xs text-slate-600">${p?.timestamp ?? ''}</div>
                            <div class="col-span-7">
                              <div class="flex items-center gap-3">
                                <div class="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                                  <div class="h-2 rounded-full bg-sky-600" style="width: ${Math.min(100, Math.max(0, (Number(p?.value ?? 0) / Math.max(1, Number(averageTicket ?? 0))) * 100))}%"></div>
                                </div>
                                <div class="w-16 text-right text-xs font-medium text-slate-800">${p?.value ?? 0}</div>
                              </div>
                            </div>
                          </div>
                        `)}
                      </div>
                    </div>

                    <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div class="flex items-baseline justify-between gap-3">
                        <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">approvalRate</div>
                        <div class="text-xs text-slate-500">approved_count / order_count</div>
                      </div>
                      <div class="mt-3 space-y-2">
                        ${(approvalRatePoints ?? []).map((p: any) => html`
                          <div class="grid grid-cols-12 items-center gap-3">
                            <div class="col-span-5 truncate text-xs text-slate-600">${p?.timestamp ?? ''}</div>
                            <div class="col-span-7">
                              <div class="flex items-center gap-3">
                                <div class="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                                  <div class="h-2 rounded-full bg-violet-600" style="width: ${Math.min(100, Math.max(0, Number(p?.value ?? 0) * 100))}%"></div>
                                </div>
                                <div class="w-16 text-right text-xs font-medium text-slate-800">${Math.round(Number(p?.value ?? 0) * 100)}%</div>
                              </div>
                            </div>
                          </div>
                        `)}
                      </div>
                    </div>

                    <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 xl:col-span-2">
                      <div class="flex items-baseline justify-between gap-3">
                        <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">canceledOrders</div>
                        <div class="text-xs text-slate-500">canceled_count</div>
                      </div>
                      <div class="mt-3 space-y-2">
                        ${(canceledOrdersPoints ?? []).map((p: any) => html`
                          <div class="grid grid-cols-12 items-center gap-3">
                            <div class="col-span-5 truncate text-xs text-slate-600">${p?.timestamp ?? ''}</div>
                            <div class="col-span-7">
                              <div class="flex items-center gap-3">
                                <div class="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                                  <div class="h-2 rounded-full bg-rose-600" style="width: ${Math.min(100, Math.max(0, (Number(p?.value ?? 0) / Math.max(1, Number(canceledOrders ?? 0))) * 100))}%"></div>
                                </div>
                                <div class="w-16 text-right text-xs font-medium text-slate-800">${p?.value ?? 0}</div>
                              </div>
                            </div>
                          </div>
                        `)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    `;
  }
}
