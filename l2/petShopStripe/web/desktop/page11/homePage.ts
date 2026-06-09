/// <mls fileReference="_102030_/l2/petShopStripe/web/desktop/page11/homePage.ts" enhancement="_102027_/l2/enhancementLit.ts" />

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PetShopStripeHomePageBase } from '/_102030_/l2/petShopStripe/web/shared/homePage.js';

@customElement('pet-shop-stripe--web--desktop--page11--home-page-102030')
export class PetShopStripeDesktopPage11HomePagePage extends PetShopStripeHomePageBase {
  render() {
    return html`
      <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
        <header class="border-b border-slate-200/70 bg-white/80 backdrop-blur">
          <div class="mx-auto max-w-6xl px-4 py-6">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div class="min-w-0">
                <div class="text-sm font-semibold tracking-wide text-slate-500">${this.msg.brand}</div>
                <h1 class="mt-1 truncate text-2xl font-semibold text-slate-900">${this.msg.pageTitle}</h1>
              </div>
              <div class="w-full sm:w-auto">
                <div class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  ${this.status ?? ''}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main class="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-12">
          <section class="lg:col-span-8">
            <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div class="border-b border-slate-200 px-5 py-4">
                <div class="text-xs font-semibold uppercase tracking-wider text-slate-500">${this.msg.loadingGetCatalogHighlights}</div>
                <div class="mt-1 text-lg font-semibold text-slate-900">${this.msg.pageTitle}</div>
              </div>

              <div class="px-5 py-5">
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  ${(this.categories ?? []).map((c: any) => html`
                    <article class="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow">
                      <div class="h-14 w-14 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                        ${c?.imageUrl
                          ? html`<img class="h-full w-full object-cover" src=${c.imageUrl} alt=${c?.name ?? ''} />`
                          : html`<div class="h-full w-full"></div>`}
                      </div>
                      <div class="min-w-0 flex-1">
                        <div class="truncate text-base font-semibold text-slate-900">${c?.name ?? ''}</div>
                      </div>
                      <div class="text-slate-400 transition group-hover:text-slate-600">→</div>
                    </article>
                  `)}
                </div>

                <div class="mt-6">
                  <div class="mb-3 flex items-center justify-between">
                    <div class="text-sm font-semibold text-slate-700">${this.msg.loaded}</div>
                  </div>
                  <div class="overflow-hidden rounded-xl border border-slate-200">
                    <div class="grid grid-cols-12 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <div class="col-span-7">${this.msg.pageTitle}</div>
                      <div class="col-span-3 text-right">${this.msg.brand}</div>
                      <div class="col-span-2 text-right">${this.msg.loaded}</div>
                    </div>
                    <div class="divide-y divide-slate-200">
                      ${(this.items ?? []).map((it: any) => html`
                        <div class="grid grid-cols-12 items-center gap-3 px-4 py-3">
                          <div class="col-span-7 flex items-center gap-3 min-w-0">
                            <div class="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                              ${it?.imageUrl
                                ? html`<img class="h-full w-full object-cover" src=${it.imageUrl} alt=${it?.name ?? ''} />`
                                : html`<div class="h-full w-full"></div>`}
                            </div>
                            <div class="min-w-0">
                              <div class="truncate text-sm font-semibold text-slate-900">${it?.name ?? ''}</div>
                              <div class="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                <span class="rounded-md bg-slate-100 px-2 py-0.5">${it?.itemType ?? ''}</span>
                                <span class="truncate">${it?.availabilityStatus ?? ''}</span>
                              </div>
                            </div>
                          </div>
                          <div class="col-span-3 text-right">
                            <div class="text-sm font-semibold text-slate-900">${it?.price?.amount ?? 0}</div>
                            <div class="text-xs text-slate-500">${it?.price?.currency ?? ''}</div>
                          </div>
                          <div class="col-span-2 text-right">
                            <span class="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700">${it?.availabilityStatus ?? ''}</span>
                          </div>
                        </div>
                      `)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside class="lg:col-span-4">
            <div class="sticky top-6 space-y-6">
              <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div class="text-sm font-semibold text-slate-900">${this.msg.pageTitle}</div>
                <div class="mt-2 text-sm leading-relaxed text-slate-600">${this.msg.brand}</div>
                <div class="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div class="text-xs font-semibold uppercase tracking-wider text-slate-500">${this.msg.loadingGetCatalogHighlights}</div>
                  <div class="mt-2 text-sm text-slate-700">${this.status ?? ''}</div>
                </div>
              </section>

              <section class="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-sm">
                <div class="text-sm font-semibold">${this.msg.pageTitle}</div>
                <div class="mt-2 text-sm text-white/80">${this.msg.loaded}</div>
                <div class="mt-4">
                  <a class="inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-white/95" href="#">
                    ${this.msg.pageTitle}
                  </a>
                </div>
                <div class="mt-3 text-xs text-white/70">${this.msg.brand}</div>
              </section>
            </div>
          </aside>
        </main>
      </div>
    `;
  }
}
