/// <mls fileReference="_102030_/l2/petShopStripe/web/desktop/page11/catalogPage.ts" enhancement="_102027_/l2/enhancementLit.ts" />

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PetShopStripeCatalogPageBase } from '/_102030_/l2/petShopStripe/web/shared/catalogPage.js';

@customElement('pet-shop-stripe--web--desktop--page11--catalog-page-102030')
export class PetShopStripeDesktopPageCatalogPagePage extends PetShopStripeCatalogPageBase {
  render() {
    return html`
      <div class="min-h-screen bg-slate-50">
        <div class="mx-auto max-w-7xl px-6 py-8">
          <header class="flex items-start justify-between gap-6">
            <div class="min-w-0">
              <div class="text-sm font-semibold tracking-wide text-slate-600">${this.msg.brand}</div>
              <h1 class="mt-1 truncate text-2xl font-semibold text-slate-900">${this.msg.pageTitle}</h1>
              <div class="mt-2">
                <div class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700">
                  ${this.status ?? ''}
                </div>
              </div>
            </div>
          </header>

          <div class="mt-8 grid grid-cols-12 gap-6">
            <aside class="col-span-12 lg:col-span-4">
              <section class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div class="flex items-center justify-between gap-4">
                  <h2 class="text-base font-semibold text-slate-900">${this.msg.pageTitle}</h2>
                  <div class="text-xs font-medium text-slate-500">${this.msg.loadingGetCatalogList}</div>
                </div>

                <div class="mt-4 space-y-4">
                  <div>
                    <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">${this.msg.pageTitle}</div>
                    <div class="mt-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                      ${(this.items?.[0]?.categoryTitle ?? '')}
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">${this.msg.pageTitle}</div>
                      <div class="mt-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                        ${(this.items?.[0]?.itemType ?? '')}
                      </div>
                    </div>
                    <div>
                      <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">${this.msg.pageTitle}</div>
                      <div class="mt-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                        ${(this.items?.[0]?.status ?? '')}
                      </div>
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">${this.msg.pageTitle}</div>
                      <div class="mt-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                        ${(this.items?.[0]?.price ?? 0)}
                      </div>
                    </div>
                    <div>
                      <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">${this.msg.pageTitle}</div>
                      <div class="mt-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                        ${(this.pagination?.page ?? 0)}
                      </div>
                    </div>
                  </div>

                  <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">${this.msg.pageTitle}</div>
                    <div class="mt-2 grid grid-cols-3 gap-3">
                      <div>
                        <div class="text-xs text-slate-500">${this.msg.pageTitle}</div>
                        <div class="text-sm font-medium text-slate-900">${this.pagination?.page ?? 0}</div>
                      </div>
                      <div>
                        <div class="text-xs text-slate-500">${this.msg.pageTitle}</div>
                        <div class="text-sm font-medium text-slate-900">${this.pagination?.pageSize ?? 0}</div>
                      </div>
                      <div>
                        <div class="text-xs text-slate-500">${this.msg.pageTitle}</div>
                        <div class="text-sm font-medium text-slate-900">${this.pagination?.totalItems ?? 0}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </aside>

            <main class="col-span-12 lg:col-span-8">
              <section class="rounded-xl border border-slate-200 bg-white shadow-sm">
                <div class="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
                  <h2 class="text-base font-semibold text-slate-900">${this.msg.pageTitle}</h2>
                  <div class="text-sm text-slate-600">${this.pagination?.totalItems ?? 0}</div>
                </div>

                <div class="divide-y divide-slate-200">
                  ${(this.items ?? []).map((it: any) => html`
                    <div class="flex items-start justify-between gap-6 px-5 py-4">
                      <div class="min-w-0">
                        <div class="flex flex-wrap items-center gap-2">
                          <div class="truncate text-sm font-semibold text-slate-900">${it?.title ?? ''}</div>
                          <div class="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-700">${it?.itemType ?? ''}</div>
                          <div class="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-700">${it?.status ?? ''}</div>
                        </div>
                        <div class="mt-1 line-clamp-2 text-sm text-slate-600">${it?.summary ?? ''}</div>
                        <div class="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <div class="rounded-md bg-slate-50 px-2 py-1">${it?.categoryTitle ?? ''}</div>
                          <div class="rounded-md bg-slate-50 px-2 py-1">${it?.itemId ?? ''}</div>
                        </div>
                      </div>

                      <div class="flex shrink-0 flex-col items-end gap-2">
                        <div class="text-sm font-semibold text-slate-900">${it?.price ?? 0}</div>
                        <a class="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300" href="#">${this.msg.pageTitle}</a>
                      </div>
                    </div>
                  `)}
                </div>

                <div class="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 px-5 py-4">
                  <div class="text-sm text-slate-600">
                    ${this.msg.pageTitle}
                    <span class="font-medium text-slate-900">${this.pagination?.page ?? 0}</span>
                    <span class="text-slate-400">/</span>
                    <span class="font-medium text-slate-900">${this.pagination?.pageSize ?? 0}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <button class="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300" type="button">
                      ${this.msg.pageTitle}
                    </button>
                    <button class="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300" type="button">
                      ${this.msg.pageTitle}
                    </button>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    `;
  }
}
