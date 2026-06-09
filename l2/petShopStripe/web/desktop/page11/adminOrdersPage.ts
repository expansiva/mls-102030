/// <mls fileReference="_102030_/l2/petShopStripe/web/desktop/page11/adminOrdersPage.ts" enhancement="_102027_/l2/enhancementLit.ts" />
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PetShopStripeAdminOrdersPageBase } from '/_102030_/l2/petShopStripe/web/shared/adminOrdersPage.js';

@customElement('pet-shop-stripe--web--desktop--page11--admin-orders-page-102030')
export class PetShopStripeDesktopPage11AdminOrdersPagePage extends PetShopStripeAdminOrdersPageBase {
  render() {
    const updateOrderStatusBusy = this.updateOrderStatusState === 'loading';

    return html`
      <div class="min-h-screen bg-slate-50">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <header class="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div class="min-w-0">
                <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">${this.msg.brand}</div>
                <h1 class="mt-1 truncate text-2xl font-semibold text-slate-900">${this.msg.pageTitle}</h1>
              </div>
              <div class="flex items-center gap-2">
                <span
                  class=${[
                    'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
                    this.status ? 'bg-slate-100 text-slate-700' : 'bg-transparent text-slate-400',
                  ].join(' ')}
                  >${this.status ?? ''}</span
                >
                <button
                  class=${[
                    'inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold',
                    updateOrderStatusBusy
                      ? 'cursor-not-allowed bg-indigo-200 text-indigo-900'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700',
                  ].join(' ')}
                  ?disabled=${updateOrderStatusBusy}
                  @click=${this.handleUpdateOrderStatusClick}
                >
                  ${updateOrderStatusBusy ? this.msg.updateOrderStatusLoading : this.msg.updateOrderStatusLoading}
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div class="text-xs font-semibold text-slate-500">${this.msg.loadingGetOrderAdminList}</div>
                <div class="mt-1 text-sm text-slate-700">
                  <span class="font-medium text-slate-900">${this.page ?? 0}</span>
                  <span class="text-slate-400">/</span>
                  <span>${this.pageSize ?? 0}</span>
                </div>
              </div>
              <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div class="text-xs font-semibold text-slate-500">${this.msg.loadingGetServiceBookings}</div>
                <div class="mt-1 text-sm text-slate-700">
                  <span class="font-medium text-slate-900">${(this.serviceBookings ?? []).length}</span>
                </div>
              </div>
              <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div class="text-xs font-semibold text-slate-500">${this.msg.loaded}</div>
                <div class="mt-1 text-sm text-slate-700">
                  <span class="font-medium text-slate-900">${this.total ?? 0}</span>
                </div>
              </div>
            </div>
          </header>

          <main class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <section class="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div class="flex items-center justify-between gap-3 border-b border-slate-200 p-5">
                <div>
                  <h2 class="text-lg font-semibold text-slate-900">${this.msg.loadingGetOrderAdminList}</h2>
                  <div class="mt-1 text-sm text-slate-600">${this.msg.pageTitle}</div>
                </div>
                <div class="text-sm text-slate-600">
                  <span class="font-semibold text-slate-900">${(this.orders ?? []).length}</span>
                  <span class="text-slate-400">/</span>
                  <span>${this.total ?? 0}</span>
                </div>
              </div>

              <div class="p-5">
                <div class="overflow-hidden rounded-xl border border-slate-200">
                  <div class="grid grid-cols-12 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    <div class="col-span-4">${this.msg.pageTitle}</div>
                    <div class="col-span-3">${this.msg.loaded}</div>
                    <div class="col-span-2">${this.msg.loadingGetOrderAdminList}</div>
                    <div class="col-span-3 text-right">${this.msg.loadingGetOrderAdminList}</div>
                  </div>
                  <div class="divide-y divide-slate-200">
                    ${(this.orders ?? []).map(
                      (o: any) => html`
                        <div class="grid grid-cols-12 items-center gap-2 px-3 py-3">
                          <div class="col-span-4 min-w-0">
                            <div class="truncate text-sm font-semibold text-slate-900">${o?.orderNumber ?? ''}</div>
                            <div class="mt-0.5 truncate text-xs text-slate-500">${o?.orderId ?? ''}</div>
                          </div>
                          <div class="col-span-3">
                            <div class="text-sm text-slate-800">${o?.status ?? ''}</div>
                            <div class="mt-0.5 text-xs text-slate-500">${o?.paymentStatus ?? ''}</div>
                          </div>
                          <div class="col-span-2">
                            <div class="text-xs text-slate-500">${o?.createdAt ?? ''}</div>
                            <div class="text-xs text-slate-400">${o?.updatedAt ?? ''}</div>
                          </div>
                          <div class="col-span-3 text-right">
                            <div class="text-sm font-semibold text-slate-900">${o?.totalAmount ?? 0}</div>
                            <button
                              class=${[
                                'mt-1 inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold',
                                updateOrderStatusBusy
                                  ? 'cursor-not-allowed bg-slate-200 text-slate-600'
                                  : 'bg-slate-900 text-white hover:bg-slate-800',
                              ].join(' ')}
                              ?disabled=${updateOrderStatusBusy}
                              @click=${this.handleUpdateOrderStatusClick}
                            >
                              ${this.msg.updateOrderStatusLoading}
                            </button>
                          </div>
                        </div>
                      `
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section class="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div class="flex items-center justify-between gap-3 border-b border-slate-200 p-5">
                <div>
                  <h2 class="text-lg font-semibold text-slate-900">${this.msg.loadingGetServiceBookings}</h2>
                  <div class="mt-1 text-sm text-slate-600">${this.msg.pageTitle}</div>
                </div>
                <div class="text-sm text-slate-600">
                  <span class="font-semibold text-slate-900">${(this.serviceBookings ?? []).length}</span>
                </div>
              </div>

              <div class="p-5">
                <div class="space-y-3">
                  ${(this.serviceBookings ?? []).map(
                    (b: any) => html`
                      <div class="rounded-xl border border-slate-200 p-4">
                        <div class="flex items-start justify-between gap-3">
                          <div class="min-w-0">
                            <div class="truncate text-sm font-semibold text-slate-900">${b?.serviceName ?? ''}</div>
                            <div class="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600">
                              <span class="inline-flex items-center rounded-md bg-slate-50 px-2 py-0.5">${b?.status ?? ''}</span>
                              <span class="inline-flex items-center rounded-md bg-slate-50 px-2 py-0.5">${b?.scheduledDate ?? ''}</span>
                              <span class="inline-flex items-center rounded-md bg-slate-50 px-2 py-0.5">${b?.scheduledStartTime ?? ''} - ${b?.scheduledEndTime ?? ''}</span>
                            </div>
                          </div>
                          <div class="text-right">
                            <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">${this.msg.loaded}</div>
                            <div class="mt-1 text-xs text-slate-700">${b?.orderId ?? ''}</div>
                          </div>
                        </div>

                        <div class="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                          <div class="rounded-lg bg-slate-50 p-2">
                            <div class="text-xs font-semibold text-slate-500">${this.msg.loadingGetServiceBookings}</div>
                            <div class="mt-0.5 text-sm text-slate-800">${b?.customerName ?? ''}</div>
                            <div class="mt-0.5 text-xs text-slate-500">${b?.customerId ?? ''}</div>
                          </div>
                          <div class="rounded-lg bg-slate-50 p-2">
                            <div class="text-xs font-semibold text-slate-500">${this.msg.loadingGetServiceBookings}</div>
                            <div class="mt-0.5 text-sm text-slate-800">${b?.petName ?? ''}</div>
                            <div class="mt-0.5 text-xs text-slate-500">${b?.petId ?? ''}</div>
                          </div>
                        </div>
                      </div>
                    `
                  )}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    `;
  }
}
