/// <mls fileReference="_102030_/l2/petShopStripe/web/shared/homePage.ts" enhancement="_102027_/l2/enhancementLit.ts" />

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
import type {
  PetShopStripeGetCatalogHighlightsInput,
  PetShopStripeGetCatalogHighlightsOutput,
} from '/_102030_/l2/petShopStripe/web/contracts/homePage.js';

/// **collab_i18n_start**
const message_pt = {
  brand: 'Pet Shop Stripe',
  pageTitle: 'Página Inicial',
  loaded: 'Dados carregados',
  couldNotLoad: 'Nao foi possivel carregar',
  loadingGetCatalogHighlights: 'Carregando destaques do catálogo',
};
const message_en = {
  brand: 'Pet Shop Stripe',
  pageTitle: 'Home Page',
  loaded: 'Data loaded',
  couldNotLoad: 'Could not load',
  loadingGetCatalogHighlights: 'Loading catalog highlights',
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en, pt: message_pt };
/// **collab_i18n_end**

export class PetShopStripeHomePageBase extends CollabLitElement {
  private readonly _stateKeys = [
    'ui.homePage.categories',
    'ui.homePage.items',
  ] as const;

  @property() categories: PetShopStripeGetCatalogHighlightsOutput['categories'] = [];

  @property() items: PetShopStripeGetCatalogHighlightsOutput['items'] = [];

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
    (this._stateKeys as unknown as string[]).forEach(key => {
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
      case 'ui.homePage.categories':
        this.categories = (value ?? []) as PetShopStripeGetCatalogHighlightsOutput['categories'];
        break;
      case 'ui.homePage.items':
        this.items = (value ?? []) as PetShopStripeGetCatalogHighlightsOutput['items'];
        break;
      default:
        break;
    }
  }

  async loadInitialData(params?: unknown, options?: BffClientOptions): Promise<void> {
    await this.loadGetCatalogHighlights(undefined, options);
  }

  async loadGetCatalogHighlights(
    params?: PetShopStripeGetCatalogHighlightsInput,
    options?: BffClientOptions,
  ): Promise<void> {
    if ((window as any).mls) {
      this.categories = [
        { categoryId: 'id-001', name: 'Rações', imageUrl: 'https://exemplo.com/img/cat-racoes.png' },
        { categoryId: 'id-002', name: 'Brinquedos', imageUrl: 'https://exemplo.com/img/cat-brinquedos.png' },
        { categoryId: 'id-003', name: 'Higiene', imageUrl: 'https://exemplo.com/img/cat-higiene.png' },
      ];
      setState('ui.homePage.categories', this.categories);

      this.items = [
        {
          itemType: 'product',
          itemId: 'id-001',
          name: 'Ração Premium 10kg',
          price: { amount: 199, currency: 'BRL' },
          availabilityStatus: 'in_stock',
          categoryIds: 'id-001',
          imageUrl: 'https://exemplo.com/img/prod-racao-10kg.png',
        },
        {
          itemType: 'service',
          itemId: 'id-002',
          name: 'Banho e Tosa',
          price: { amount: 79, currency: 'BRL' },
          availabilityStatus: 'available',
          categoryIds: 'id-003',
          imageUrl: 'https://exemplo.com/img/serv-banho-tosa.png',
        },
        {
          itemType: 'product',
          itemId: 'id-003',
          name: 'Bolinha Interativa',
          price: { amount: 29, currency: 'BRL' },
          availabilityStatus: 'in_stock',
          categoryIds: 'id-002',
          imageUrl: 'https://exemplo.com/img/prod-bolinha.png',
        },
      ];
      setState('ui.homePage.items', this.items);

      this.status = this.msg.loaded;
      return;
    }

    const response = await execBff<PetShopStripeGetCatalogHighlightsOutput>(
      'petShopStripe.homePage.getCatalogHighlights',
      params ?? ({} as PetShopStripeGetCatalogHighlightsInput),
      options,
    );

    if (!response.ok || !response.data) {
      if (options?.mode === 'blocking') {
        throw (response.error ?? {
          code: 'UNEXPECTED_ERROR',
          message: this.msg.couldNotLoad,
        }) satisfies AuraNormalizedError;
      }
      this.status = this.msg.couldNotLoad;
      return;
    }

    this.categories = response.data.categories;
    setState('ui.homePage.categories', this.categories);

    this.items = response.data.items;
    setState('ui.homePage.items', this.items);

    this.status = this.msg.loaded;
  }
}
