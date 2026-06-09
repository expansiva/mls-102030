/// <mls fileReference="_102030_/l2/petShopStripe/web/desktop/page11/adminCatalogPage.ts" enhancement="_102027_/l2/enhancementLit.ts" />

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PetShopStripeAdminCatalogPageBase } from '/_102030_/l2/petShopStripe/web/shared/adminCatalogPage.js';

@customElement('pet-shop-stripe--web--desktop--page11--admin-catalog-page-102030')
export class PetShopStripeDesktopPage11AdminCatalogPagePage extends PetShopStripeAdminCatalogPageBase {
  render() {
    const manageCatalogStateBusy = this.manageCatalogState === 'loading';

    const totalItems = this.pagination?.totalItems ?? 0;
    const page = this.pagination?.page ?? 1;
    const totalPages = this.pagination?.totalPages ?? 1;

    return html`
      <div class="min-h-screen bg-slate-50 text-slate-900">
        <header class="border-b border-slate-200 bg-white">
          <div class="mx-auto w-full max-w-6xl px-6 py-5">
            <div class="flex items-start justify-between gap-6">
              <div class="min-w-0">
                <div class="text-xs font-semibold tracking-wide text-slate-500">${this.msg.brand}</div>
                <h1 class="mt-1 text-2xl font-semibold leading-tight text-slate-900">${this.msg.pageTitle}</h1>
                <div class="mt-2 flex flex-wrap items-center gap-2 text-sm">
                  <span class="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-slate-700">
                    ${this.status ?? ''}
                  </span>
                  <span class="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-1 text-slate-700">
                    ${totalItems}
                  </span>
                  <span class="text-slate-500">${page}/${totalPages}</span>
                </div>
              </div>

              <div class="flex shrink-0 items-center gap-3">
                <button
                  class="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  ?disabled=${manageCatalogStateBusy}
                  @click=${this.handleManageCatalogClick}
                >
                  ${manageCatalogStateBusy ? this.msg.manageCatalogLoading : this.msg.manageCatalogLoading}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main class="mx-auto w-full max-w-6xl px-6 py-6">
          <div class="grid grid-cols-12 gap-6">
            <section class="col-span-5">
              <div class="rounded-xl border border-slate-200 bg-white shadow-sm">
                <div class="border-b border-slate-200 px-5 py-4">
                  <div class="flex items-center justify-between gap-4">
                    <div class="min-w-0">
                      <div class="text-sm font-semibold text-slate-900">${this.msg.loadingGetCatalogAdminList}</div>
                      <div class="mt-1 text-xs text-slate-500">${this.status ?? ''}</div>
                    </div>
                    <div class="shrink-0 text-xs text-slate-500">
                      ${totalItems}
                    </div>
                  </div>
                </div>

                <div class="p-5">
                  <div class="grid grid-cols-2 gap-3">
                    <button
                      class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                      ?disabled=${manageCatalogStateBusy}
                    >
                      ${this.msg.loaded}
                    </button>
                    <button
                      class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                      ?disabled=${manageCatalogStateBusy}
                    >
                      ${this.msg.couldNotLoad}
                    </button>
                  </div>

                  <div class="mt-5 overflow-hidden rounded-xl border border-slate-200">
                    <div class="grid grid-cols-12 gap-2 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
                      <div class="col-span-6">${this.msg.pageTitle}</div>
                      <div class="col-span-3 text-right">${this.msg.loaded}</div>
                      <div class="col-span-3 text-right">${this.msg.brand}</div>
                    </div>
                    <div class="divide-y divide-slate-200 bg-white">
                      ${(this.items ?? []).map((it: any) => html`
                        <div class="grid grid-cols-12 items-center gap-2 px-3 py-3">
                          <div class="col-span-6 min-w-0">
                            <div class="truncate text-sm font-medium text-slate-900">${it?.name ?? ''}</div>
                            <div class="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                              <span class="truncate">${it?.itemId ?? ''}</span>
                              <span class="h-1 w-1 rounded-full bg-slate-300"></span>
                              <span class="truncate">${it?.categoryName ?? ''}</span>
                            </div>
                          </div>
                          <div class="col-span-3 text-right">
                            <div class="text-sm font-semibold text-slate-900">${it?.price ?? 0}</div>
                            <div class="mt-0.5 text-xs text-slate-500">${it?.itemType ?? ''}</div>
                          </div>
                          <div class="col-span-3 flex items-center justify-end gap-2">
                            <span class=${`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${it?.status === 'active' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200' : 'bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200'}`}>
                              ${it?.status ?? ''}
                            </span>
                            <button
                              class="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                              ?disabled=${manageCatalogStateBusy}
                            >
                              ${this.msg.loaded}
                            </button>
                          </div>
                        </div>
                      `)}
                    </div>
                  </div>

                  <div class="mt-4 flex items-center justify-between text-xs text-slate-500">
                    <div>${this.pagination?.pageSize ?? 0}</div>
                    <div>${this.pagination?.totalPages ?? 0}</div>
                  </div>
                </div>
              </div>
            </section>

            <section class="col-span-7">
              <div class="rounded-xl border border-slate-200 bg-white shadow-sm">
                <div class="border-b border-slate-200 px-5 py-4">
                  <div class="flex items-start justify-between gap-4">
                    <div class="min-w-0">
                      <div class="text-sm font-semibold text-slate-900">${this.msg.manageCatalogLoading}</div>
                      <div class="mt-1 text-xs text-slate-500">${this.msg.couldNotManageCatalog}</div>
                    </div>
                    <div class="shrink-0">
                      <span class=${`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${this.manageCatalogState === 'success' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200' : this.manageCatalogState === 'error' ? 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200' : this.manageCatalogState === 'loading' ? 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200' : 'bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200'}`}
                      >
                        ${this.manageCatalogState}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="p-5">
                  <div class="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
                    <div class="text-sm font-semibold text-slate-900">${this.msg.pageTitle}</div>
                    <div class="mt-1 text-xs text-slate-600">${this.status ?? ''}</div>
                    <div class="mt-3 grid grid-cols-2 gap-3">
                      <button
                        class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                        ?disabled=${manageCatalogStateBusy}
                        @click=${this.handleManageCatalogClick}
                      >
                        ${manageCatalogStateBusy ? this.msg.manageCatalogLoading : this.msg.manageCatalogLoading}
                      </button>
                      <button
                        class="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                        ?disabled=${manageCatalogStateBusy}
                      >
                        ${this.msg.couldNotManageCatalog}
                      </button>
                    </div>
                  </div>

                  <div class="mt-5 grid grid-cols-12 gap-4">
                    <div class="col-span-6 rounded-xl border border-slate-200 bg-white p-4">
                      <div class="text-xs font-semibold text-slate-500">${this.msg.brand}</div>
                      <div class="mt-1 text-sm font-semibold text-slate-900">${this.items?.[0]?.name ?? ''}</div>
                      <div class="mt-2 text-xs text-slate-500">${this.items?.[0]?.categoryName ?? ''}</div>
                      <div class="mt-3 text-sm font-semibold text-slate-900">${this.items?.[0]?.price ?? 0}</div>
                    </div>
                    <div class="col-span-6 rounded-xl border border-slate-200 bg-white p-4">
                      <div class="text-xs font-semibold text-slate-500">${this.msg.brand}</div>
                      <div class="mt-1 text-sm font-semibold text-slate-900">${this.items?.[1]?.name ?? ''}</div>
                      <div class="mt-2 text-xs text-slate-500">${this.items?.[1]?.categoryName ?? ''}</div>
                      <div class="mt-3 text-sm font-semibold text-slate-900">${this.items?.[1]?.price ?? 0}</div>
                    </div>
                  </div>

                  <div class="mt-5 rounded-xl border border-slate-200 bg-white p-4">
                    <div class="flex items-center justify-between gap-4">
                      <div class="min-w-0">
                        <div class="text-sm font-semibold text-slate-900">${this.msg.loaded}</div>
                        <div class="mt-1 text-xs text-slate-500">${this.msg.loadingGetCatalogAdminList}</div>
                      </div>
                      <button
                        class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                        ?disabled=${manageCatalogStateBusy}
                        @click=${this.handleManageCatalogClick}
                      >
                        ${this.msg.manageCatalogLoading}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    `;
  }
}
