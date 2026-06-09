/// <mls fileReference="_102030_/l2/petShopStripe/web/shared/cartPage.ts" enhancement="_102027_/l2/enhancementLit.ts" />

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
  PetShopStripeGetCartInput,
  PetShopStripeGetCartOutput,
  PetShopStripeStartCheckoutInput,
  PetShopStripeStartCheckoutOutput,
  PetShopStripeUpdateCartInput,
  PetShopStripeUpdateCartOutput,
} from '/_102030_/l2/petShopStripe/web/contracts/cartPage.js';

/// **collab_i18n_start**
const message_pt = {
  brand: 'Pet Shop Stripe',
  pageTitle: 'Carrinho',
  loaded: 'Dados carregados',
  couldNotLoad: 'Nao foi possivel carregar',
  loadingGetCart: 'Carregando carrinho',
  couldNotUpdateCart: 'Nao foi possivel atualizar carrinho',
  updateCartLoading: 'Atualizando carrinho',
  couldNotStartCheckout: 'Nao foi possivel iniciar checkout',
  startCheckoutLoading: 'Iniciando checkout',
};
const message_en = {
  brand: 'Pet Shop Stripe',
  pageTitle: 'Cart',
  loaded: 'Data loaded',
  couldNotLoad: 'Could not load',
  loadingGetCart: 'Loading cart',
  couldNotUpdateCart: 'Could not update cart',
  updateCartLoading: 'Updating cart',
  couldNotStartCheckout: 'Could not start checkout',
  startCheckoutLoading: 'Starting checkout',
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en, pt: message_pt };
/// **collab_i18n_end**

export class PetShopStripeCartPageBase extends CollabLitElement {
  private readonly _stateKeys = [
    'ui.cartPage.cart',
    'ui.cartPage.updateCart',
    'ui.cartPage.startCheckout',
  ] as const;

  @property() cart: PetShopStripeGetCartOutput['cart'] | undefined = undefined;

  @property() updateCartState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  @property() startCheckoutState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

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
      case 'ui.cartPage.cart': {
        this.cart = (value ?? undefined) as PetShopStripeGetCartOutput['cart'] | undefined;
        break;
      }
      case 'ui.cartPage.updateCart': {
        this.updateCartState = (value ?? 'idle') as typeof this.updateCartState;
        break;
      }
      case 'ui.cartPage.startCheckout': {
        this.startCheckoutState = (value ?? 'idle') as typeof this.startCheckoutState;
        break;
      }
    }
  }

  async loadInitialData(params?: unknown, options?: BffClientOptions): Promise<void> {
    await this.loadGetCart(params as any, options);
  }

  async loadGetCart(params?: PetShopStripeGetCartInput, options?: BffClientOptions): Promise<void> {
    if ((window as any).mls) {
      this.cart = {
        cartId: 'id-001',
        status: 'active',
        currency: 'BRL',
        itemsCount: 2,
        subtotalAmount: 120,
        discountAmount: 10,
        totalAmount: 110,
        items: [
          {
            itemId: 'id-001',
            productId: 'id-001',
            name: 'Racao Premium 10kg',
            quantity: 1,
            unitPrice: 90,
            totalPrice: 90,
          },
          {
            itemId: 'id-002',
            serviceId: 'id-001',
            name: 'Banho e Tosa',
            quantity: 1,
            unitPrice: 30,
            totalPrice: 30,
          },
        ],
      };
      setState('ui.cartPage.cart', this.cart);
      this.status = this.msg.loaded;
      return;
    }

    const response = await execBff<PetShopStripeGetCartOutput>(
      'petShopStripe.cartPage.getCart',
      params ?? ({
        cartContext: {},
        include: { items: true, totals: true },
      } satisfies PetShopStripeGetCartInput),
      options
    );
    if (!response.ok || !response.data) {
      if (options?.mode === 'blocking') {
        throw (response.error ?? { code: 'UNEXPECTED_ERROR', message: this.msg.couldNotLoad }) satisfies AuraNormalizedError;
      }
      this.status = this.msg.couldNotLoad;
      return;
    }

    this.cart = response.data.cart;
    setState('ui.cartPage.cart', this.cart);
    this.status = this.msg.loaded;
  }

  async updateCart(params: PetShopStripeUpdateCartInput, signal?: AbortSignal): Promise<void> {
    if ((window as any).mls) {
      console.log('[mls mock] petShopStripe.cartPage.updateCart', params);
      this.updateCartState = 'success';
      setState('ui.cartPage.updateCart', 'success');
      return;
    }
    this.updateCartState = 'loading';
    setState('ui.cartPage.updateCart', 'loading');
    try {
      const response = await execBff<PetShopStripeUpdateCartOutput>(
        'petShopStripe.cartPage.updateCart',
        params,
        signal ? { signal } : undefined
      );
      if (!response.ok) throw response.error;
      this.updateCartState = 'success';
      setState('ui.cartPage.updateCart', 'success');
      await this.loadGetCart(
        {
          cartContext: { cartId: params.cartContext?.cartId },
          include: { items: true, totals: true },
        },
        { mode: 'silent', signal }
      );
    } catch (e) {
      this.updateCartState = 'error';
      setState('ui.cartPage.updateCart', 'error');
      throw e;
    }
  }

  handleUpdateCartClick(): void {
    const params: PetShopStripeUpdateCartInput = {
      cartContext: { cartId: this.cart?.cartId },
      changes: { items: [] },
    };
    void runBlockingUiAction(
      async (signal: AbortSignal) => {
        await this.updateCart(params, signal);
      },
      {
        busyLabel: this.msg.updateCartLoading,
        errorTitle: this.msg.couldNotUpdateCart,
        retry: () => this.updateCart(params),
      }
    );
  }

  async startCheckout(params: PetShopStripeStartCheckoutInput, signal?: AbortSignal): Promise<void> {
    if ((window as any).mls) {
      console.log('[mls mock] petShopStripe.cartPage.startCheckout', params);
      this.startCheckoutState = 'success';
      setState('ui.cartPage.startCheckout', 'success');
      return;
    }
    this.startCheckoutState = 'loading';
    setState('ui.cartPage.startCheckout', 'loading');
    try {
      const response = await execBff<PetShopStripeStartCheckoutOutput>(
        'petShopStripe.cartPage.startCheckout',
        params,
        signal ? { signal } : undefined
      );
      if (!response.ok) throw response.error;
      this.startCheckoutState = 'success';
      setState('ui.cartPage.startCheckout', 'success');
      await this.loadGetCart(
        {
          cartContext: { cartId: response.data?.cart?.cartId ?? params.cartContext?.cartId },
          include: { items: true, totals: true },
        },
        { mode: 'silent', signal }
      );
    } catch (e) {
      this.startCheckoutState = 'error';
      setState('ui.cartPage.startCheckout', 'error');
      throw e;
    }
  }

  handleStartCheckoutClick(): void {
    const params: PetShopStripeStartCheckoutInput = {
      cartContext: { cartId: this.cart?.cartId },
    };
    void runBlockingUiAction(
      async (signal: AbortSignal) => {
        await this.startCheckout(params, signal);
      },
      {
        busyLabel: this.msg.startCheckoutLoading,
        errorTitle: this.msg.couldNotStartCheckout,
        retry: () => this.startCheckout(params),
      }
    );
  }
}
