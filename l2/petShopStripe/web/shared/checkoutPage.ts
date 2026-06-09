/// <mls fileReference="_102030_/l2/petShopStripe/web/shared/checkoutPage.ts" enhancement="_102027_/l2/enhancementLit.ts" />

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
  PetShopStripeGetCheckoutCartSummaryInput,
  PetShopStripeGetCheckoutCartSummaryOutput,
  PetShopStripeCreateOrderFromCheckoutInput,
  PetShopStripeCreateOrderFromCheckoutOutput,
  PetShopStripeConfirmStripePaymentInput,
  PetShopStripeConfirmStripePaymentOutput,
} from '/_102030_/l2/petShopStripe/web/contracts/checkoutPage.js';

/// **collab_i18n_start**
const message_pt = {
  brand: 'Pet Shop Stripe',
  pageTitle: 'Checkout',
  loaded: 'Dados carregados',
  couldNotLoad: 'Nao foi possivel carregar',
  loadingGetCheckoutCartSummary: 'Carregando resumo do carrinho',
  couldNotCreateOrderFromCheckout: 'Nao foi possivel criar o pedido',
  createOrderFromCheckoutLoading: 'Criando pedido',
  couldNotConfirmStripePayment: 'Nao foi possivel confirmar o pagamento',
  confirmStripePaymentLoading: 'Confirmando pagamento',
};
const message_en = {
  brand: 'Pet Shop Stripe',
  pageTitle: 'Checkout',
  loaded: 'Data loaded',
  couldNotLoad: 'Could not load',
  loadingGetCheckoutCartSummary: 'Loading cart summary',
  couldNotCreateOrderFromCheckout: 'Could not create order',
  createOrderFromCheckoutLoading: 'Creating order',
  couldNotConfirmStripePayment: 'Could not confirm payment',
  confirmStripePaymentLoading: 'Confirming payment',
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en, pt: message_pt };
/// **collab_i18n_end**

export class PetShopStripeCheckoutPageBase extends CollabLitElement {
  private readonly _stateKeys = [
    'ui.checkoutPage.cartId',
    'ui.checkoutPage.items',
    'ui.checkoutPage.totals',
    'ui.checkoutPage.currency',
    'ui.checkoutPage.createOrderFromCheckout',
    'ui.checkoutPage.confirmStripePayment',
  ] as const;

  @property() cartId: PetShopStripeGetCheckoutCartSummaryOutput['cartId'] | undefined = undefined;

  @property() items: PetShopStripeGetCheckoutCartSummaryOutput['items'] = [];

  @property() totals: PetShopStripeGetCheckoutCartSummaryOutput['totals'] | undefined = undefined;

  @property() currency: PetShopStripeGetCheckoutCartSummaryOutput['currency'] | undefined = undefined;

  @property() createOrderFromCheckoutState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property() confirmStripePaymentState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

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
      case 'ui.checkoutPage.cartId':
        this.cartId = (value ?? undefined) as PetShopStripeGetCheckoutCartSummaryOutput['cartId'] | undefined;
        break;
      case 'ui.checkoutPage.items':
        this.items = (value ?? []) as PetShopStripeGetCheckoutCartSummaryOutput['items'];
        break;
      case 'ui.checkoutPage.totals':
        this.totals = (value ?? undefined) as PetShopStripeGetCheckoutCartSummaryOutput['totals'] | undefined;
        break;
      case 'ui.checkoutPage.currency':
        this.currency = (value ?? undefined) as PetShopStripeGetCheckoutCartSummaryOutput['currency'] | undefined;
        break;
      case 'ui.checkoutPage.createOrderFromCheckout':
        this.createOrderFromCheckoutState = (value ?? 'idle') as typeof this.createOrderFromCheckoutState;
        break;
      case 'ui.checkoutPage.confirmStripePayment':
        this.confirmStripePaymentState = (value ?? 'idle') as typeof this.confirmStripePaymentState;
        break;
    }
  }

  async loadInitialData(params?: unknown, options?: BffClientOptions): Promise<void> {
    void params;
    await this.loadGetCheckoutCartSummary({ cartId: this.cartId ?? 'id-001' }, options);
  }

  async loadGetCheckoutCartSummary(
    params?: PetShopStripeGetCheckoutCartSummaryInput,
    options?: BffClientOptions,
  ): Promise<void> {
    if ((window as any).mls) {
      this.cartId = params?.cartId ?? 'id-001';
      this.items = [
        {
          itemId: 'id-001',
          itemType: 'product',
          productId: 'id-001',
          serviceId: 'id-001',
          name: 'Racao Premium',
          quantity: 2,
          unitPrice: 25,
          totalPrice: 50,
        },
        {
          itemId: 'id-002',
          itemType: 'service',
          productId: 'id-001',
          serviceId: 'id-002',
          name: 'Banho e Tosa',
          quantity: 1,
          unitPrice: 60,
          totalPrice: 60,
        },
      ];
      this.totals = { subtotal: 110, discount: 10, shipping: 15, total: 115 };
      this.currency = 'BRL';
      setState('ui.checkoutPage.cartId', this.cartId);
      setState('ui.checkoutPage.items', this.items);
      setState('ui.checkoutPage.totals', this.totals);
      setState('ui.checkoutPage.currency', this.currency);
      this.status = this.msg.loaded;
      return;
    }

    const response = await execBff<PetShopStripeGetCheckoutCartSummaryOutput>(
      'petShopStripe.checkoutPage.getCheckoutCartSummary',
      params ?? ({ cartId: this.cartId ?? '' } satisfies PetShopStripeGetCheckoutCartSummaryInput),
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

    this.cartId = response.data.cartId;
    this.items = response.data.items;
    this.totals = response.data.totals;
    this.currency = response.data.currency;

    setState('ui.checkoutPage.cartId', this.cartId);
    setState('ui.checkoutPage.items', this.items);
    setState('ui.checkoutPage.totals', this.totals);
    setState('ui.checkoutPage.currency', this.currency);

    this.status = this.msg.loaded;
  }

  async createOrderFromCheckout(params: PetShopStripeCreateOrderFromCheckoutInput, signal?: AbortSignal): Promise<void> {
    if ((window as any).mls) {
      console.log('[mls mock] petShopStripe.checkoutPage.createOrderFromCheckout', params);
      this.createOrderFromCheckoutState = 'success';
      setState('ui.checkoutPage.createOrderFromCheckout', 'success');
      return;
    }
    this.createOrderFromCheckoutState = 'loading';
    setState('ui.checkoutPage.createOrderFromCheckout', 'loading');
    try {
      const response = await execBff<PetShopStripeCreateOrderFromCheckoutOutput>(
        'petShopStripe.checkoutPage.createOrderFromCheckout',
        params,
        signal ? { signal } : undefined,
      );
      if (!response.ok) throw response.error;
      this.createOrderFromCheckoutState = 'success';
      setState('ui.checkoutPage.createOrderFromCheckout', 'success');
      await this.loadGetCheckoutCartSummary({ cartId: params.cartId }, { mode: 'silent', signal });
    } catch (e) {
      this.createOrderFromCheckoutState = 'error';
      setState('ui.checkoutPage.createOrderFromCheckout', 'error');
      throw e;
    }
  }

  handleCreateOrderFromCheckoutClick(): void {
    const params: PetShopStripeCreateOrderFromCheckoutInput = {
      cartId: this.cartId ?? 'id-001',
      deliveryAddress: {
        street: 'Rua das Flores',
        number: '100',
        complement: 'Apto 12',
        district: 'Centro',
        city: 'Sao Paulo',
        state: 'SP',
        postalCode: '01000-000',
        country: 'BR',
      },
      contact: {
        name: 'Ana Silva',
        email: 'ana@exemplo.com',
        phone: '11999999999',
      },
    };

    void runBlockingUiAction(
      async (signal: AbortSignal) => {
        await this.createOrderFromCheckout(params, signal);
      },
      {
        busyLabel: this.msg.createOrderFromCheckoutLoading,
        errorTitle: this.msg.couldNotCreateOrderFromCheckout,
        retry: () => this.createOrderFromCheckout(params),
      },
    );
  }

  async confirmStripePayment(params: PetShopStripeConfirmStripePaymentInput, signal?: AbortSignal): Promise<void> {
    if ((window as any).mls) {
      console.log('[mls mock] petShopStripe.checkoutPage.confirmStripePayment', params);
      this.confirmStripePaymentState = 'success';
      setState('ui.checkoutPage.confirmStripePayment', 'success');
      return;
    }
    this.confirmStripePaymentState = 'loading';
    setState('ui.checkoutPage.confirmStripePayment', 'loading');
    try {
      const response = await execBff<PetShopStripeConfirmStripePaymentOutput>(
        'petShopStripe.checkoutPage.confirmStripePayment',
        params,
        signal ? { signal } : undefined,
      );
      if (!response.ok) throw response.error;
      this.confirmStripePaymentState = 'success';
      setState('ui.checkoutPage.confirmStripePayment', 'success');
    } catch (e) {
      this.confirmStripePaymentState = 'error';
      setState('ui.checkoutPage.confirmStripePayment', 'error');
      throw e;
    }
  }

  handleConfirmStripePaymentClick(): void {
    const params: PetShopStripeConfirmStripePaymentInput = {
      orderId: 'id-001',
      paymentIntentId: 'id-001',
      paymentMethod: 'card',
      confirmationData: {
        clientSecret: 'id-001',
        returnUrl: 'https://exemplo.com/retorno',
      },
    };

    void runBlockingUiAction(
      async (signal: AbortSignal) => {
        await this.confirmStripePayment(params, signal);
      },
      {
        busyLabel: this.msg.confirmStripePaymentLoading,
        errorTitle: this.msg.couldNotConfirmStripePayment,
        retry: () => this.confirmStripePayment(params),
      },
    );
  }
}
