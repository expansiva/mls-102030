/// <mls fileReference="_102030_/l2/petShopStripe/web/desktop/page11/cartPage.ts" enhancement="_102027_/l2/enhancementLit.ts" />

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PetShopStripeCartPageBase } from '/_102030_/l2/petShopStripe/web/shared/cartPage.js';

@customElement('pet-shop-stripe--web--desktop--page11--cart-page-102030')
export class PetShopStripeDesktopPage11CartPagePage extends PetShopStripeCartPageBase {
  render() {
    const updateCartBusy = this.updateCartState === 'loading';
    const startCheckoutBusy = this.startCheckoutState === 'loading';

    const cartCurrency = this.cart?.currency ?? '';
    const items = this.cart?.items ?? [];

    return html`
      <div class="min-h-screen bg-slate-50 text-slate-900">
        <div class="mx-auto max-w-6xl px-6 py-8">
          <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div class="space-y-1">
              <div class="text-sm font-semibold tracking-wide text-slate-600">${this.msg.brand}</div>
              <h1 class="text-2xl font-semibold text-slate-900">${this.msg.pageTitle}</h1>
              <div class="text-sm text-slate-600">${this.status ?? ''}</div>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <button
                class="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                ?disabled=${updateCartBusy}
                @click=${this.handleUpdateCartClick}
              >
                ${updateCartBusy ? this.msg.updateCartLoading : this.msg.updateCartLoading}
              </button>
              <button
                class="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                ?disabled=${startCheckoutBusy || (this.cart?.itemsCount ?? 0) <= 0}
                @click=${this.handleStartCheckoutClick}
              >
                ${startCheckoutBusy ? this.msg.startCheckoutLoading : this.msg.startCheckoutLoading}
              </button>
            </div>
          </header>

          <main class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <section class="lg:col-span-8">
              <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                  <div class="text-base font-semibold text-slate-900">${this.msg.pageTitle}</div>
                  <div class="text-sm text-slate-600">${this.cart?.itemsCount ?? 0}</div>
                </div>

                <div class="divide-y divide-slate-100">
                  ${items.length
                    ? items.map(
                        (it: any) => html`
                          <div class="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                            <div class="min-w-0">
                              <div class="truncate text-sm font-semibold text-slate-900">${it?.name ?? ''}</div>
                              <div class="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                                <div class="inline-flex items-center gap-2">
                                  <span class="text-slate-500">${cartCurrency}</span>
                                  <span class="font-medium text-slate-700">${it?.unitPrice ?? 0}</span>
                                </div>
                                <div class="inline-flex items-center gap-2">
                                  <span class="text-slate-500">${cartCurrency}</span>
                                  <span class="font-medium text-slate-700">${it?.totalPrice ?? 0}</span>
                                </div>
                              </div>
                            </div>

                            <div class="flex items-center gap-3">
                              <div class="inline-flex items-center rounded-lg border border-slate-200 bg-white">
                                <button
                                  class="h-9 w-9 rounded-l-lg text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                                  ?disabled=${updateCartBusy || (it?.quantity ?? 0) <= 1}
                                  @click=${() => {
                                    const next = Math.max(1, (it?.quantity ?? 1) - 1);
                                    this.cart = {
                                      ...(this.cart as any),
                                      items: (items as any).map((x: any) => (x?.itemId === it?.itemId ? { ...x, quantity: next } : x)),
                                    } as any;
                                  }}
                                >
                                  -
                                </button>
                                <div class="min-w-12 px-3 text-center text-sm font-semibold text-slate-900">
                                  ${it?.quantity ?? 0}
                                </div>
                                <button
                                  class="h-9 w-9 rounded-r-lg text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                                  ?disabled=${updateCartBusy}
                                  @click=${() => {
                                    const next = (it?.quantity ?? 0) + 1;
                                    this.cart = {
                                      ...(this.cart as any),
                                      items: (items as any).map((x: any) => (x?.itemId === it?.itemId ? { ...x, quantity: next } : x)),
                                    } as any;
                                  }}
                                >
                                  +
                                </button>
                              </div>

                              <button
                                class="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                                ?disabled=${updateCartBusy}
                                @click=${() => {
                                  this.cart = {
                                    ...(this.cart as any),
                                    items: (items as any).filter((x: any) => x?.itemId !== it?.itemId),
                                    itemsCount: Math.max(0, (this.cart?.itemsCount ?? items.length) - 1),
                                  } as any;
                                }}
                              >
                                ${this.msg.couldNotUpdateCart}
                              </button>
                            </div>
                          </div>
                        `
                      )
                    : html`
                        <div class="px-6 py-10 text-center text-sm text-slate-600">${this.status ?? ''}</div>
                      `}
                </div>

                <div class="flex flex-col gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div class="text-xs text-slate-600">${this.msg.loaded}</div>
                  <div class="flex items-center gap-3">
                    <button
                      class="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                      ?disabled=${updateCartBusy}
                      @click=${this.handleUpdateCartClick}
                    >
                      ${updateCartBusy ? this.msg.updateCartLoading : this.msg.updateCartLoading}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <aside class="lg:col-span-4">
              <div class="sticky top-6 space-y-6">
                <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div class="flex items-center justify-between">
                    <div class="text-base font-semibold text-slate-900">${this.msg.pageTitle}</div>
                    <div class="text-xs text-slate-600">${this.cart?.status ?? ''}</div>
                  </div>

                  <div class="mt-5 space-y-3">
                    <div class="flex items-center justify-between text-sm">
                      <div class="text-slate-600">${this.msg.loadingGetCart}</div>
                      <div class="font-semibold text-slate-900">${cartCurrency} ${this.cart?.subtotalAmount ?? 0}</div>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <div class="text-slate-600">${this.msg.couldNotLoad}</div>
                      <div class="font-semibold text-slate-900">${cartCurrency} ${this.cart?.discountAmount ?? 0}</div>
                    </div>
                    <div class="h-px bg-slate-100"></div>
                    <div class="flex items-center justify-between">
                      <div class="text-sm font-semibold text-slate-900">${this.msg.loaded}</div>
                      <div class="text-lg font-semibold text-slate-900">${cartCurrency} ${this.cart?.totalAmount ?? 0}</div>
                    </div>
                  </div>

                  <div class="mt-6">
                    <button
                      class="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                      ?disabled=${startCheckoutBusy || (this.cart?.itemsCount ?? 0) <= 0}
                      @click=${this.handleStartCheckoutClick}
                    >
                      ${startCheckoutBusy ? this.msg.startCheckoutLoading : this.msg.startCheckoutLoading}
                    </button>
                    <div class="mt-2 text-xs text-slate-600">${this.status ?? ''}</div>
                  </div>
                </section>

                <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div class="text-sm font-semibold text-slate-900">${this.msg.loaded}</div>
                  <div class="mt-2 text-xs text-slate-600">${this.msg.brand}</div>
                </section>
              </div>
            </aside>
          </main>
        </div>
      </div>
    `;
  }
}
