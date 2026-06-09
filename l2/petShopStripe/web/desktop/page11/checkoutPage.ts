/// <mls fileReference="_102030_/l2/petShopStripe/web/desktop/page11/checkoutPage.ts" enhancement="_102027_/l2/enhancementLit.ts" />

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PetShopStripeCheckoutPageBase } from '/_102030_/l2/petShopStripe/web/shared/checkoutPage.js';

@customElement('pet-shop-stripe--web--desktop--page11--checkout-page-102030')
export class PetShopStripeDesktopPage11CheckoutPagePage extends PetShopStripeCheckoutPageBase {
  render() {
    const createOrderBusy = this.createOrderFromCheckoutState === 'loading';
    const confirmPaymentBusy = this.confirmStripePaymentState === 'loading';

    return html`
      <div class="min-h-screen bg-slate-50">
        <div class="mx-auto max-w-6xl px-6 py-8">
          <header class="flex flex-col gap-4 border-b border-slate-200 pb-6">
            <div class="flex items-start justify-between gap-6">
              <div class="min-w-0">
                <div class="text-sm font-semibold tracking-wide text-slate-500">${this.msg.brand}</div>
                <h1 class="mt-1 text-2xl font-semibold text-slate-900">${this.msg.pageTitle}</h1>
              </div>
              <div class="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
                <div class="text-xs font-medium text-slate-500">${this.status ?? ''}</div>
              </div>
            </div>

            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12 sm:col-span-6">
                <div class="rounded-lg border border-slate-200 bg-white p-4">
                  <div class="text-xs font-medium text-slate-500">cartId</div>
                  <div class="mt-1 truncate text-sm font-semibold text-slate-900">${this.cartId ?? ''}</div>
                </div>
              </div>
              <div class="col-span-12 sm:col-span-6">
                <div class="rounded-lg border border-slate-200 bg-white p-4">
                  <div class="text-xs font-medium text-slate-500">currency</div>
                  <div class="mt-1 truncate text-sm font-semibold text-slate-900">${this.currency ?? ''}</div>
                </div>
              </div>
            </div>
          </header>

          <main class="mt-8 grid grid-cols-12 gap-6">
            <section class="col-span-12 lg:col-span-8">
              <div class="rounded-xl border border-slate-200 bg-white">
                <div class="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
                  <div>
                    <h2 class="text-base font-semibold text-slate-900">${this.msg.pageTitle}</h2>
                    <div class="mt-1 text-sm text-slate-600">${this.msg.loadingGetCheckoutCartSummary}</div>
                  </div>
                  <div class="text-sm font-semibold text-slate-900">
                    ${(this.totals?.total ?? 0).toFixed(2)} ${this.currency ?? ''}
                  </div>
                </div>

                <div class="px-6 py-4">
                  <div class="overflow-hidden rounded-lg border border-slate-200">
                    <div class="grid grid-cols-12 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600">
                      <div class="col-span-6">name</div>
                      <div class="col-span-2 text-right">quantity</div>
                      <div class="col-span-2 text-right">unitPrice</div>
                      <div class="col-span-2 text-right">totalPrice</div>
                    </div>
                    <div class="divide-y divide-slate-200">
                      ${(this.items ?? []).map((it: any) => html`
                        <div class="grid grid-cols-12 items-center px-4 py-3">
                          <div class="col-span-6 min-w-0">
                            <div class="truncate text-sm font-medium text-slate-900">${it?.name ?? ''}</div>
                            <div class="mt-0.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                              <span>${it?.itemType ?? ''}</span>
                              <span>productId: ${it?.productId ?? ''}</span>
                              <span>serviceId: ${it?.serviceId ?? ''}</span>
                            </div>
                          </div>
                          <div class="col-span-2 text-right text-sm text-slate-700">${it?.quantity ?? 0}</div>
                          <div class="col-span-2 text-right text-sm text-slate-700">${(it?.unitPrice ?? 0).toFixed(2)}</div>
                          <div class="col-span-2 text-right text-sm font-semibold text-slate-900">${(it?.totalPrice ?? 0).toFixed(2)}</div>
                        </div>
                      `)}
                    </div>
                  </div>

                  <div class="mt-5 grid grid-cols-12 gap-4">
                    <div class="col-span-12 md:col-span-6">
                      <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <div class="text-xs font-medium text-slate-500">subtotal</div>
                        <div class="mt-1 text-sm font-semibold text-slate-900">${(this.totals?.subtotal ?? 0).toFixed(2)} ${this.currency ?? ''}</div>
                      </div>
                    </div>
                    <div class="col-span-12 md:col-span-6">
                      <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <div class="text-xs font-medium text-slate-500">discount</div>
                        <div class="mt-1 text-sm font-semibold text-slate-900">${(this.totals?.discount ?? 0).toFixed(2)} ${this.currency ?? ''}</div>
                      </div>
                    </div>
                    <div class="col-span-12 md:col-span-6">
                      <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <div class="text-xs font-medium text-slate-500">shipping</div>
                        <div class="mt-1 text-sm font-semibold text-slate-900">${(this.totals?.shipping ?? 0).toFixed(2)} ${this.currency ?? ''}</div>
                      </div>
                    </div>
                    <div class="col-span-12 md:col-span-6">
                      <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <div class="text-xs font-medium text-slate-500">total</div>
                        <div class="mt-1 text-sm font-semibold text-slate-900">${(this.totals?.total ?? 0).toFixed(2)} ${this.currency ?? ''}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-6 rounded-xl border border-slate-200 bg-white p-6">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <h3 class="text-base font-semibold text-slate-900">${this.msg.pageTitle}</h3>
                    <div class="mt-1 text-sm text-slate-600">${this.msg.createOrderFromCheckoutLoading}</div>
                  </div>
                  <button
                    class="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                    ?disabled=${createOrderBusy}
                    @click=${this.handleCreateOrderFromCheckoutClick}
                  >
                    ${createOrderBusy ? this.msg.createOrderFromCheckoutLoading : this.msg.createOrderFromCheckoutLoading}
                  </button>
                </div>

                <div class="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div class="text-xs font-medium text-slate-500">createOrderFromCheckoutState</div>
                  <div class="mt-1 text-sm font-semibold text-slate-900">${this.createOrderFromCheckoutState}</div>
                </div>
              </div>
            </section>

            <aside class="col-span-12 lg:col-span-4">
              <div class="sticky top-6 space-y-6">
                <section class="rounded-xl border border-slate-200 bg-white p-6">
                  <div>
                    <h3 class="text-base font-semibold text-slate-900">${this.msg.pageTitle}</h3>
                    <div class="mt-1 text-sm text-slate-600">${this.msg.confirmStripePaymentLoading}</div>
                  </div>

                  <div class="mt-5 grid gap-3">
                    <button
                      class="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                      ?disabled=${confirmPaymentBusy}
                      @click=${this.handleConfirmStripePaymentClick}
                    >
                      ${confirmPaymentBusy ? this.msg.confirmStripePaymentLoading : this.msg.confirmStripePaymentLoading}
                    </button>

                    <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <div class="text-xs font-medium text-slate-500">confirmStripePaymentState</div>
                      <div class="mt-1 text-sm font-semibold text-slate-900">${this.confirmStripePaymentState}</div>
                    </div>
                  </div>
                </section>

                <section class="rounded-xl border border-slate-200 bg-white p-6">
                  <div class="text-sm font-semibold text-slate-900">${this.msg.pageTitle}</div>
                  <div class="mt-3 space-y-2 text-sm text-slate-700">
                    <div class="flex items-center justify-between gap-4">
                      <span class="text-slate-600">subtotal</span>
                      <span class="font-semibold text-slate-900">${(this.totals?.subtotal ?? 0).toFixed(2)} ${this.currency ?? ''}</span>
                    </div>
                    <div class="flex items-center justify-between gap-4">
                      <span class="text-slate-600">discount</span>
                      <span class="font-semibold text-slate-900">${(this.totals?.discount ?? 0).toFixed(2)} ${this.currency ?? ''}</span>
                    </div>
                    <div class="flex items-center justify-between gap-4">
                      <span class="text-slate-600">shipping</span>
                      <span class="font-semibold text-slate-900">${(this.totals?.shipping ?? 0).toFixed(2)} ${this.currency ?? ''}</span>
                    </div>
                    <div class="mt-3 border-t border-slate-200 pt-3 flex items-center justify-between gap-4">
                      <span class="text-slate-600">total</span>
                      <span class="text-base font-semibold text-slate-900">${(this.totals?.total ?? 0).toFixed(2)} ${this.currency ?? ''}</span>
                    </div>
                  </div>
                </section>
              </div>
            </aside>
          </main>
        </div>
      </div>
    `;
  }
}
