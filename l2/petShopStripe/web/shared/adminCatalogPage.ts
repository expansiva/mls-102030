/// <mls fileReference="_102030_/l2/petShopStripe/web/shared/adminCatalogPage.ts" enhancement="_102027_/l2/enhancementLit.ts" />

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
  PetShopStripeGetCatalogAdminListInput,
  PetShopStripeGetCatalogAdminListOutput,
  PetShopStripeManageCatalogInput,
  PetShopStripeManageCatalogOutput,
} from '/_102030_/l2/petShopStripe/web/contracts/adminCatalogPage.js';

/// **collab_i18n_start**
const message_pt = {
  brand: 'Pet Shop Stripe',
  pageTitle: 'Admin Catalog Page',
  loaded: 'Dados carregados',
  couldNotLoad: 'Nao foi possivel carregar',
  loadingGetCatalogAdminList: 'Carregando catálogo',
  couldNotManageCatalog: 'Nao foi possivel gerenciar o catálogo',
  manageCatalogLoading: 'Salvando alterações no catálogo',
};
const message_en = {
  brand: 'Pet Shop Stripe',
  pageTitle: 'Admin Catalog Page',
  loaded: 'Data loaded',
  couldNotLoad: 'Could not load',
  loadingGetCatalogAdminList: 'Loading catalog',
  couldNotManageCatalog: 'Could not manage catalog',
  manageCatalogLoading: 'Saving catalog changes',
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en, pt: message_pt };
/// **collab_i18n_end**

export class PetShopStripeAdminCatalogPageBase extends CollabLitElement {
  private readonly _stateKeys = [
    'ui.adminCatalogPage.items',
    'ui.adminCatalogPage.pagination',
    'ui.adminCatalogPage.manageCatalog',
  ] as const;

  @property() items: PetShopStripeGetCatalogAdminListOutput['items'] = [];
  @property() pagination: PetShopStripeGetCatalogAdminListOutput['pagination'] | undefined = undefined;

  @property() manageCatalogState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

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
      case 'ui.adminCatalogPage.items':
        this.items = (value ?? []) as PetShopStripeGetCatalogAdminListOutput['items'];
        break;
      case 'ui.adminCatalogPage.pagination':
        this.pagination = (value ?? undefined) as PetShopStripeGetCatalogAdminListOutput['pagination'] | undefined;
        break;
      case 'ui.adminCatalogPage.manageCatalog':
        this.manageCatalogState = (value ?? 'idle') as typeof this.manageCatalogState;
        break;
    }
  }

  async loadInitialData(params?: unknown, options?: BffClientOptions): Promise<void> {
    await this.loadGetCatalogAdminList(undefined, options);
  }

  async loadGetCatalogAdminList(
    params?: Partial<PetShopStripeGetCatalogAdminListInput>,
    options?: BffClientOptions,
  ): Promise<void> {
    if ((window as any).mls) {
      this.items = [
        {
          itemId: 'id-001',
          itemType: 'product',
          name: 'Banho Premium',
          categoryId: 'id-001',
          categoryName: 'Higiene',
          price: 79,
          status: 'active',
          updatedAt: '2026-06-01T10:00:00Z',
        },
        {
          itemId: 'id-002',
          itemType: 'service',
          name: 'Tosa Completa',
          categoryId: 'id-002',
          categoryName: 'Serviços',
          price: 120,
          status: 'inactive',
          updatedAt: '2026-06-02T11:00:00Z',
        },
        {
          itemId: 'id-003',
          itemType: 'product',
          name: 'Ração Premium 10kg',
          categoryId: 'id-003',
          categoryName: 'Alimentação',
          price: 199,
          status: 'active',
          updatedAt: '2026-06-03T12:00:00Z',
        },
      ];
      this.pagination = { page: 1, pageSize: 10, totalItems: 3, totalPages: 1 };
      setState('ui.adminCatalogPage.items', this.items);
      setState('ui.adminCatalogPage.pagination', this.pagination);
      this.status = this.msg.loaded;
      return;
    }

    const response = await execBff<PetShopStripeGetCatalogAdminListOutput>(
      'petShopStripe.adminCatalogPage.getCatalogAdminList',
      (params ?? {}) as any,
      options,
    );

    if (!response.ok || !response.data) {
      if (options?.mode === 'blocking') {
        throw (response.error ?? { code: 'UNEXPECTED_ERROR', message: this.msg.couldNotLoad }) satisfies AuraNormalizedError;
      }
      this.status = this.msg.couldNotLoad;
      return;
    }

    this.items = response.data.items;
    this.pagination = response.data.pagination;
    setState('ui.adminCatalogPage.items', this.items);
    setState('ui.adminCatalogPage.pagination', this.pagination);
    this.status = this.msg.loaded;
  }

  async manageCatalog(params: PetShopStripeManageCatalogInput, signal?: AbortSignal): Promise<void> {
    if ((window as any).mls) {
      console.log('[mls mock] petShopStripe.adminCatalogPage.manageCatalog', params);
      this.manageCatalogState = 'success';
      setState('ui.adminCatalogPage.manageCatalog', 'success');
      return;
    }

    this.manageCatalogState = 'loading';
    setState('ui.adminCatalogPage.manageCatalog', 'loading');

    try {
      const response = await execBff<PetShopStripeManageCatalogOutput>(
        'petShopStripe.adminCatalogPage.manageCatalog',
        params,
        signal ? { signal } : undefined,
      );
      if (!response.ok) throw response.error;
      this.manageCatalogState = 'success';
      setState('ui.adminCatalogPage.manageCatalog', 'success');
      await this.loadGetCatalogAdminList(undefined, { mode: 'silent' });
    } catch (e) {
      this.manageCatalogState = 'error';
      setState('ui.adminCatalogPage.manageCatalog', 'error');
      throw e;
    }
  }

  handleManageCatalogClick(): void {
    const params: PetShopStripeManageCatalogInput = {
      action: 'update',
      itemType: 'product',
      itemId: 'id-001',
      payload: {
        name: 'Ração Premium 10kg',
        description: 'Ração premium para cães adultos',
        price: 199,
        duration: 0,
        status: 'active',
        categoryId: 'id-003',
      },
    };

    void runBlockingUiAction(
      async (signal: AbortSignal) => {
        await this.manageCatalog(params, signal);
      },
      {
        busyLabel: this.msg.manageCatalogLoading,
        errorTitle: this.msg.couldNotManageCatalog,
        retry: () => this.manageCatalog(params),
      },
    );
  }
}
