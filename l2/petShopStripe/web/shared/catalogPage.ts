/// <mls fileReference="_102030_/l2/petShopStripe/web/shared/catalogPage.ts" enhancement="_102027_/l2/enhancementLit.ts" />
 
import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import type { AuraNormalizedError } from '/_102029_/l2/contracts/bootstrap.js';
import type { BffClientOptions } from '/_102029_/l2/bffClient.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import {
  bindExpectedNavigationLoad,
  consumeExpectedNavigationLoad,
  runBlockingUiAction,
} from '/_102029_/l2/interactionRuntime.js';
import { subscribe, unsubscribe, getState, setState } from '/_102029_/l2/collabState.js';
import type { PetShopStripeGetCatalogListOutput } from '/_102030_/l2/petShopStripe/web/contracts/catalogPage.js';

/// **collab_i18n_start**
const message_pt = {
  brand: 'Pet Shop Stripe',
  pageTitle: 'Catálogo',
  loaded: 'Dados carregados',
  couldNotLoad: 'Nao foi possivel carregar',
  loadingGetCatalogList: 'Carregando catálogo...',
};
const message_en = {
  brand: 'Pet Shop Stripe',
  pageTitle: 'Catalog',
  loaded: 'Data loaded',
  couldNotLoad: 'Could not load',
  loadingGetCatalogList: 'Loading catalog...',
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en, pt: message_pt };
/// **collab_i18n_end**

export class PetShopStripeCatalogPageBase extends CollabLitElement {
  private readonly _stateKeys = [
    'ui.catalogPage.items',
    'ui.catalogPage.pagination',
  ] as const;

  @property() items: Array<{ itemId: string; itemType: 'Product' | 'Service'; title: string; summary: string; price: number; status: string; categoryTitle: string }> = [];
  @property() pagination: { page: number; pageSize: number; totalItems: number } | undefined = undefined;

  @property() status: string = '';

  protected msg: MessageType = messages['en'];

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    const pendingLoad = consumeExpectedNavigationLoad();
    const task = this.loadInitialData(undefined, { mode: 'silent', signal: pendingLoad?.signal });
    bindExpectedNavigationLoad(pendingLoad, task);
    void task.catch(() => undefined);
    const lang: string = this.getMessageKey(messages);
    this.msg = messages[lang] || messages['en'];
    subscribe(this._stateKeys as unknown as string[], this);
    (this._stateKeys as unknown as string[]).forEach((key) => {
      const v = getState(key);
      if (v !== undefined) this.handleIcaStateChange(key, v);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    unsubscribe(this._stateKeys as unknown as string[], this);
  }

  handleIcaStateChange(key: string, value: any): void {
    switch (key) {
      case 'ui.catalogPage.items':
        this.items = Array.isArray(value) ? value : [];
        break;
      case 'ui.catalogPage.pagination':
        this.pagination = value ?? undefined;
        break;
      default:
        break;
    }
  }

  async loadInitialData(params?: unknown, options?: BffClientOptions): Promise<void> {
    await this.loadGetCatalogList(params as any, options);
  }

  async loadGetCatalogList(
    params?: {
      categoria?: string;
      tipo?: string;
      precoMin?: number;
      precoMax?: number;
      page?: number;
      pageSize?: number;
    },
    options?: BffClientOptions
  ): Promise<void> {
    if ((window as any).mls) {
      this.items = [
        {
          itemId: 'id-001',
          itemType: 'Product',
          title: 'Ração Premium 10kg',
          summary: 'Ração completa para cães adultos',
          price: 120,
          status: 'Active',
          categoryTitle: 'Alimentação',
        },
        {
          itemId: 'id-002',
          itemType: 'Service',
          title: 'Banho e Tosa',
          summary: 'Serviço completo para higiene e estética',
          price: 80,
          status: 'Active',
          categoryTitle: 'Serviços',
        },
        {
          itemId: 'id-003',
          itemType: 'Product',
          title: 'Brinquedo Mordedor',
          summary: 'Brinquedo resistente para cães',
          price: 25,
          status: 'Active',
          categoryTitle: 'Brinquedos',
        },
      ];
      setState('ui.catalogPage.items', this.items);

      this.pagination = {
        page: params?.page ?? 1,
        pageSize: params?.pageSize ?? 10,
        totalItems: 42,
      };
      setState('ui.catalogPage.pagination', this.pagination);

      this.status = this.msg.loaded;
      return;
    }

    const response = await execBff<PetShopStripeGetCatalogListOutput>(
      'petShopStripe.catalogPage.getCatalogList',
      params ?? {},
      options
    );

    if (!response.ok || !response.data) {
      if (options?.mode === 'blocking') {
        throw (response.error ?? { code: 'UNEXPECTED_ERROR', message: this.msg.couldNotLoad }) satisfies AuraNormalizedError;
      }
      this.status = this.msg.couldNotLoad;
      return;
    }

    this.items = response.data.items;
    setState('ui.catalogPage.items', this.items);

    this.pagination = response.data.pagination;
    setState('ui.catalogPage.pagination', this.pagination);

    this.status = this.msg.loaded;
  }
}
