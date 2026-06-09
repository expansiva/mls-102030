/// <mls fileReference="_102030_/l2/petShopStripe/web/desktop/page11/accountOrdersPage.ts" enhancement="_102027_/l2/enhancementLit.ts" />

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PetShopStripeAccountOrdersPageBase } from '/_102030_/l2/petShopStripe/web/shared/accountOrdersPage.js';

@customElement('pet-shop-stripe--web--desktop--page11--account-orders-page-102030')
export class PetShopStripeDesktopPage11AccountOrdersPagePage extends PetShopStripeAccountOrdersPageBase {
  render() {
    return html`
      <div class="min-h-screen bg-slate-50 text-slate-900">
        <div class="mx-auto max-w-6xl px-6 py-8">
          <header class="flex items-start justify-between gap-6">
            <div class="min-w-0">
              <div class="text-sm font-semibold tracking-wide text-slate-500">${this.msg.brand}</div>
              <h1 class="mt-1 text-2xl font-semibold leading-tight text-slate-900">${this.msg.pageTitle}</h1>
              <div class="mt-2 text-sm text-slate-600">
                <span class="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1">${this.status ?? ''}</span>
              </div>
            </div>
            <div class="hidden sm:flex items-center gap-2">
              <div class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
                ${this.msg.loadingGetOrderHistory}
              </div>
              <div class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
                ${this.msg.loadingGetCustomerServiceBookings}
              </div>
            </div>
          </header>

          <main class="mt-8 grid grid-cols-12 gap-6">
            <section class="col-span-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div class="flex items-start justify-between gap-6">
                <div class="min-w-0">
                  <h2 class="text-lg font-semibold text-slate-900">${this.msg.pageTitle}</h2>
                  <p class="mt-1 text-sm text-slate-600">${this.msg.loadingGetOrderHistory}</p>
                </div>
                <div class="flex shrink-0 items-center gap-2">
                  <button class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 active:bg-slate-100">
                    ${this.msg.loadingGetCustomerServiceBookings}
                  </button>
                  <button class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 active:bg-slate-950">
                    ${this.msg.loadingGetOrderHistory}
                  </button>
                </div>
              </div>
              <div class="mt-4 grid grid-cols-12 gap-4">
                <div class="col-span-3">
                  <div class="h-10 rounded-xl border border-slate-200 bg-slate-50"></div>
                </div>
                <div class="col-span-3">
                  <div class="h-10 rounded-xl border border-slate-200 bg-slate-50"></div>
                </div>
                <div class="col-span-3">
                  <div class="h-10 rounded-xl border border-slate-200 bg-slate-50"></div>
                </div>
                <div class="col-span-3">
                  <div class="h-10 rounded-xl border border-slate-200 bg-slate-50"></div>
                </div>
              </div>
            </section>

            <section class="col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div class="flex items-center justify-between gap-6">
                <div>
                  <h2 class="text-lg font-semibold text-slate-900">${this.msg.loadingGetOrderHistory}</h2>
                  <p class="mt-1 text-sm text-slate-600">${this.msg.loaded}</p>
                </div>
                <div class="text-xs text-slate-500">${this.msg.brand}</div>
              </div>

              <div class="mt-5 overflow-hidden rounded-xl border border-slate-200">
                <div class="grid grid-cols-12 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  <div class="col-span-3">${this.msg.pageTitle}</div>
                  <div class="col-span-3">${this.msg.loadingGetOrderHistory}</div>
                  <div class="col-span-2">${this.msg.loadingGetCustomerServiceBookings}</div>
                  <div class="col-span-2 text-right">${this.msg.loaded}</div>
                  <div class="col-span-2 text-right">${this.msg.brand}</div>
                </div>
                <div class="divide-y divide-slate-200 bg-white">
                  ${(this.orders ?? []).map((o: any) => html`
                    <div class="px-4 py-4">
                      <div class="grid grid-cols-12 items-start gap-3">
                        <div class="col-span-3 min-w-0">
                          <div class="truncate text-sm font-semibold text-slate-900">${o?.orderNumber ?? ''}</div>
                          <div class="mt-1 text-xs text-slate-500">${o?.createdAt ?? ''}</div>
                        </div>
                        <div class="col-span-3">
                          <div class="text-sm text-slate-700">${o?.status ?? ''}</div>
                          <div class="mt-1 text-xs text-slate-500">${o?.paymentStatus ?? ''}</div>
                        </div>
                        <div class="col-span-2">
                          <div class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700">${o?.paymentStatus ?? ''}</div>
                        </div>
                        <div class="col-span-2 text-right">
                          <div class="text-sm font-semibold text-slate-900">${o?.totalAmount ?? 0}</div>
                        </div>
                        <div class="col-span-2 flex justify-end gap-2">
                          <button class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 active:bg-slate-100">
                            ${this.msg.loaded}
                          </button>
                          <button class="rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-800 active:bg-slate-950">
                            ${this.msg.loadingGetOrderHistory}
                          </button>
                        </div>
                      </div>

                      <div class="mt-3 rounded-lg bg-slate-50 p-3">
                        <div class="space-y-2">
                          ${(o?.items ?? []).map((it: any) => html`
                            <div class="flex items-center justify-between gap-4">
                              <div class="min-w-0">
                                <div class="truncate text-sm text-slate-800">${it?.name ?? ''}</div>
                                <div class="mt-0.5 text-xs text-slate-500">${it?.itemType ?? ''}</div>
                              </div>
                              <div class="flex shrink-0 items-center gap-6">
                                <div class="text-xs text-slate-600">${it?.quantity ?? 0}</div>
                                <div class="text-xs font-semibold text-slate-800">${it?.unitPrice ?? 0}</div>
                              </div>
                            </div>
                          `)}
                        </div>
                      </div>
                    </div>
                  `)}
                </div>
              </div>
            </section>

            <section class="col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div class="flex items-center justify-between gap-6">
                <div>
                  <h2 class="text-lg font-semibold text-slate-900">${this.msg.loadingGetCustomerServiceBookings}</h2>
                  <p class="mt-1 text-sm text-slate-600">${this.msg.loaded}</p>
                </div>
                <div class="text-xs text-slate-500">${this.msg.brand}</div>
              </div>

              <div class="mt-5 space-y-3">
                ${(this.bookings ?? []).map((b: any) => html`
                  <div class="rounded-xl border border-slate-200 bg-white p-4">
                    <div class="flex items-start justify-between gap-4">
                      <div class="min-w-0">
                        <div class="truncate text-sm font-semibold text-slate-900">${b?.service?.name ?? ''}</div>
                        <div class="mt-1 text-xs text-slate-500">${b?.pet?.name ?? ''}</div>
                      </div>
                      <div class="shrink-0">
                        <div class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700">${b?.status ?? ''}</div>
                      </div>
                    </div>

                    <div class="mt-3 grid grid-cols-12 gap-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-700">
                      <div class="col-span-6">${b?.scheduledDate ?? ''}</div>
                      <div class="col-span-6 text-right">${b?.timezone ?? ''}</div>
                      <div class="col-span-6">${b?.scheduledStartTime ?? ''}</div>
                      <div class="col-span-6 text-right">${b?.scheduledEndTime ?? ''}</div>
                    </div>

                    <div class="mt-3 flex justify-end gap-2">
                      <button class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 active:bg-slate-100">
                        ${this.msg.loaded}
                      </button>
                      <button class="rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-800 active:bg-slate-950">
                        ${this.msg.loadingGetCustomerServiceBookings}
                      </button>
                    </div>
                  </div>
                `)}
              </div>
            </section>
          </main>
        </div>
      </div>
    `;
  }
}
