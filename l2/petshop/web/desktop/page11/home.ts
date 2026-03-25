/// <mls fileReference="_102030_/l2/petshop/web/desktop/page11/home.ts" enhancement="_blank" />
import { LitElement, html } from 'lit';
import type { AuraInteractionMode, AuraNormalizedError } from '/_102029_/l2/contracts/bootstrap.js';
import {
  beginExpectedNavigationLoad,
  bindExpectedNavigationLoad,
  consumeExpectedNavigationLoad,
  runBlockingUiAction,
} from '/_102029_/l2/interactionRuntime.js';
import { loadPetshopHome } from '/_102030_/l2/petshop/web/shared/home.js';
import { formatPrice } from '/_102030_/l2/petshop/web/shared/homeFormatters.js';
import { updatePetshopProduct } from '/_102030_/l2/petshop/web/shared/updateProduct.js';
import type { PetshopCatalogProduct } from '/_102030_/l1/petshop/module.js';

function traceLazy(event: string, details?: Record<string, unknown>) {
  if (!window.isTraceLazy) {
    return;
  }
  console.log('[traceLazy][petshop]', event, details ?? {});
}

type PetshopSection = 'catalog' | 'edit-products';

function parseSection(locationValue: Location): PetshopSection {
  if (locationValue.pathname === '/petshop/edit-products') {
    return 'edit-products';
  }
  return 'catalog';
}

export class PetshopWebDesktopHomePage extends LitElement {
  static properties = {
    currentSection: { state: true },
    items: { state: true },
    topItems: { state: true },
    status: { state: true },
    editorAuthor: { state: true },
  };

  currentSection: PetshopSection = 'catalog';
  declare items: PetshopCatalogProduct[];
  declare topItems: PetshopCatalogProduct[];
  declare status: string;
  editorAuthor = 'maria.petshop';

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', this.handlePopState);
    this.currentSection = parseSection(window.location);
    void this.handleRouteChange();
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this.handlePopState);
    super.disconnectedCallback();
  }

  private readonly handlePopState = () => {
    this.currentSection = parseSection(window.location);
    void this.handleRouteChange();
  };

  private async handleRouteChange() {
    this.currentSection = parseSection(window.location);
    traceLazy('handleRouteChange', {
      pathname: window.location.pathname,
    });
    const pendingLoad = consumeExpectedNavigationLoad();
    const task = this.loadHome(undefined, {
      mode: pendingLoad ? 'blocking' : 'silent',
      signal: pendingLoad?.signal,
    });
    bindExpectedNavigationLoad(pendingLoad, task);
    await task.catch(() => undefined);
  }

  private async navigateWithinModule(href: string, section: PetshopSection, signal?: AbortSignal) {
    const pendingLoad = beginExpectedNavigationLoad(signal);
    window.history.pushState({}, '', href);
    this.currentSection = section;
    window.dispatchEvent(new PopStateEvent('popstate'));
    await pendingLoad;
  }

  private async loadHome(category?: string, options: {
    mode?: AuraInteractionMode;
    signal?: AbortSignal;
  } = {}) {
    traceLazy('loadHome.start', {
      pathname: window.location.pathname,
      category: category ?? null,
      mode: options.mode ?? 'silent',
    });
    this.currentSection = parseSection(window.location);
    this.status = category ? `Filtering by ${category}...` : 'Loading catalog...';
    const response = await loadPetshopHome({
      category,
      topLimit: 3,
      forceSeed: false,
    }, {
      mode: options.mode,
      signal: options.signal,
    });

    if (!response.ok || !response.data) {
      if (options.mode === 'blocking') {
        throw (response.error ?? {
          code: 'UNEXPECTED_ERROR',
          message: 'Could not load petshop data.',
        }) satisfies AuraNormalizedError;
      }
      this.status = 'Could not load petshop data.';
      this.items = [];
      this.topItems = [];
      return;
    }

    this.items = response.data.catalog ?? [];
    this.topItems = response.data.topProducts ?? [];
    this.status = `${this.items.length} products available`;
    traceLazy('loadHome.success', {
      count: this.items.length,
    });
  }

  private handleSectionClick(event: Event, section: PetshopSection) {
    event.preventDefault();
    const href = section === 'catalog' ? '/petshop' : '/petshop/edit-products';
    const retry = () => this.navigateWithinModule(href, section);
    void runBlockingUiAction(
      async (signal) => {
        await this.navigateWithinModule(href, section, signal);
      },
      {
        clearContentWhileBusy: true,
        busyLabel: 'Carregando pagina...',
        errorTitle: 'Nao foi possivel carregar esta pagina',
        retry,
      },
    );
  }

  private async handleEditorSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const productId = String(formData.get('productId') ?? '');
    const payload = {
      productId,
      author: this.editorAuthor.trim(),
      name: String(formData.get('name') ?? ''),
      category: String(formData.get('category') ?? ''),
      priceInCents: Number(formData.get('priceInCents') ?? 0),
      highlightScore: Number(formData.get('highlightScore') ?? 0),
      stockStatus: String(formData.get('stockStatus') ?? 'in_stock') as PetshopCatalogProduct['stockStatus'],
      description: String(formData.get('description') ?? ''),
    };
    const retry = () => this.retryUpdateProduct(payload);
    void runBlockingUiAction(
      async (signal) => {
        await this.saveProduct(payload, signal);
      },
      {
        busyLabel: `Salvando ${productId}...`,
        errorTitle: 'Nao foi possivel salvar o produto',
        retry,
      },
    );
  }

  private async retryUpdateProduct(params: {
    productId: string;
    author: string;
    name: string;
    category: string;
    priceInCents: number;
    highlightScore: number;
    stockStatus: PetshopCatalogProduct['stockStatus'];
    description: string;
  }) {
    await this.saveProduct(params);
  }

  private async saveProduct(params: {
    productId: string;
    author: string;
    name: string;
    category: string;
    priceInCents: number;
    highlightScore: number;
    stockStatus: PetshopCatalogProduct['stockStatus'];
    description: string;
  }, signal?: AbortSignal) {
    this.status = `Saving ${params.productId}...`;
    const response = await updatePetshopProduct(params, {
      mode: 'blocking',
      signal,
    });

    if (!response.ok || !response.data) {
      throw (response.error ?? {
        code: 'UNEXPECTED_ERROR',
        message: 'Could not update product.',
      }) satisfies AuraNormalizedError;
    }

    this.status = `Updated ${response.data.name} by ${this.editorAuthor.trim() || 'system'}.`;
    await this.loadHome(undefined, {
      mode: 'blocking',
      signal,
    });
  }

  private renderCatalog() {
    return html`
      <div class="mb-6 grid gap-4 md:grid-cols-4">
        <button class="rounded-full bg-aura-navy px-4 py-3 text-sm font-medium text-white transition hover:bg-aura-blue" @click="${() => void runBlockingUiAction((signal) => this.loadHome(undefined, { mode: 'blocking', signal }), { busyLabel: 'Atualizando catalogo...', errorTitle: 'Nao foi possivel atualizar o catalogo', retry: () => this.loadHome(undefined, { mode: 'blocking' }) })}">Reload</button>
        <button class="rounded-full bg-aura-navy px-4 py-3 text-sm font-medium text-white transition hover:bg-aura-blue" @click="${() => void runBlockingUiAction((signal) => this.loadHome('Banho', { mode: 'blocking', signal }), { busyLabel: 'Filtrando catalogo...', errorTitle: 'Nao foi possivel aplicar o filtro', retry: () => this.loadHome('Banho', { mode: 'blocking' }) })}">Banho</button>
        <button class="rounded-full bg-aura-navy px-4 py-3 text-sm font-medium text-white transition hover:bg-aura-blue" @click="${() => void runBlockingUiAction((signal) => this.loadHome('Alimentacao', { mode: 'blocking', signal }), { busyLabel: 'Filtrando catalogo...', errorTitle: 'Nao foi possivel aplicar o filtro', retry: () => this.loadHome('Alimentacao', { mode: 'blocking' }) })}">Alimentacao</button>
        <button class="rounded-full bg-aura-navy px-4 py-3 text-sm font-medium text-white transition hover:bg-aura-blue" @click="${() => void runBlockingUiAction((signal) => this.loadHome('Higiene', { mode: 'blocking', signal }), { busyLabel: 'Filtrando catalogo...', errorTitle: 'Nao foi possivel aplicar o filtro', retry: () => this.loadHome('Higiene', { mode: 'blocking' }) })}">Higiene</button>
      </div>

      <div class="mb-10">
        <h2 class="mb-4 text-xl font-semibold text-aura-ink">Top products</h2>
        <div class="grid gap-4 md:grid-cols-3">
        ${(this.topItems ?? []).map((item) => html`
          <article class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <strong class="block text-base font-semibold text-aura-ink">${item.name}</strong>
            <div class="mt-1 text-sm text-slate-500">${item.category} · score ${item.highlightScore}</div>
            <div class="mt-3 text-lg font-semibold text-aura-blue">${formatPrice(item.priceInCents)}</div>
          </article>
        `)}
        </div>
      </div>

      <div>
        <h2 class="mb-4 text-xl font-semibold text-aura-ink">Catalog</h2>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        ${(this.items ?? []).map((item) => html`
          <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <strong class="block text-base font-semibold text-aura-ink">${item.name}</strong>
            <div class="mt-1 text-sm text-slate-500">${item.category} · ${item.stockStatus}</div>
            <p class="mt-3 text-sm leading-6 text-slate-700">${item.description}</p>
            <div class="mt-4 text-lg font-semibold text-aura-blue">${formatPrice(item.priceInCents)}</div>
          </article>
        `)}
        </div>
      </div>
    `;
  }

  private renderEditor() {
    return html`
      <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <label class="block">
            <span class="mb-2 block text-sm font-medium text-slate-700">Author</span>
            <input
              class="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              .value=${this.editorAuthor}
              @input=${(event: Event) => {
                this.editorAuthor = (event.currentTarget as HTMLInputElement).value;
              }}
              placeholder="maria.petshop"
            />
          </label>
          <p class="text-sm text-slate-500">This value is sent to the audit trail as the simulated user.</p>
        </div>
      </section>

      <section class="mt-6">
        <h2 class="mb-4 text-xl font-semibold text-aura-ink">Edit products</h2>
        <div class="grid gap-5 xl:grid-cols-2">
          ${(this.items ?? []).map((item) => html`
            <form class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm" @submit=${this.handleEditorSubmit}>
              <input type="hidden" name="productId" .value=${item.productId} />
              <div class="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 class="text-lg font-semibold text-aura-ink">${item.name}</h3>
                  <p class="text-sm text-slate-500">${item.productId}</p>
                </div>
                <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">${item.stockStatus}</span>
              </div>

              <div class="grid gap-3 md:grid-cols-2">
                <label class="block">
                  <span class="mb-1 block text-sm text-slate-600">Name</span>
                  <input class="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="name" .value=${item.name} />
                </label>
                <label class="block">
                  <span class="mb-1 block text-sm text-slate-600">Category</span>
                  <input class="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="category" .value=${item.category} />
                </label>
                <label class="block">
                  <span class="mb-1 block text-sm text-slate-600">Price in cents</span>
                  <input class="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="priceInCents" type="number" .value=${String(item.priceInCents)} />
                </label>
                <label class="block">
                  <span class="mb-1 block text-sm text-slate-600">Highlight score</span>
                  <input class="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="highlightScore" type="number" .value=${String(item.highlightScore)} />
                </label>
                <label class="block">
                  <span class="mb-1 block text-sm text-slate-600">Stock status</span>
                  <select class="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="stockStatus">
                    <option value="in_stock" ?selected=${item.stockStatus === 'in_stock'}>in_stock</option>
                    <option value="low_stock" ?selected=${item.stockStatus === 'low_stock'}>low_stock</option>
                    <option value="out_of_stock" ?selected=${item.stockStatus === 'out_of_stock'}>out_of_stock</option>
                  </select>
                </label>
              </div>

              <label class="mt-3 block">
                <span class="mb-1 block text-sm text-slate-600">Description</span>
                <textarea class="min-h-[120px] w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" name="description">${item.description}</textarea>
              </label>

              <div class="mt-4 flex items-center justify-between gap-4">
                <div class="text-sm text-slate-500">Last update: ${item.updatedAt}</div>
                <button class="rounded-full bg-aura-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-aura-blue" type="submit">Save</button>
              </div>
            </form>
          `)}
        </div>
      </section>
    `;
  }

  render() {
    return html`
      <section class="block">
        <header class="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-end md:justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Petshop</p>
            <h1 class="mt-2 text-3xl font-semibold text-aura-ink">${this.currentSection === 'catalog' ? 'Catalog' : 'Edit products'}</h1>
            <p class="mt-2 text-sm text-slate-600">${this.currentSection === 'catalog' ? 'Browse products and featured highlights.' : 'Simulate product changes and send an explicit author to the audit trail.'}</p>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <button class="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400" @click=${(event: Event) => this.handleSectionClick(event, 'catalog')}>Catalog</button>
            <button class="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400" @click=${(event: Event) => this.handleSectionClick(event, 'edit-products')}>Edit products</button>
          </div>
        </header>
        <div class="mb-4 text-sm text-slate-600">${this.status ?? 'Preparing catalog...'}</div>

        ${this.currentSection === 'catalog' ? this.renderCatalog() : this.renderEditor()}
      </section>
    `;
  }
}

customElements.define('petshop-web-desktop-home-page', PetshopWebDesktopHomePage);
