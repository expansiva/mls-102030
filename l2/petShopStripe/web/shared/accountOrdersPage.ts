/// <mls fileReference="_102030_/l2/petShopStripe/web/shared/accountOrdersPage.ts" enhancement="_102027_/l2/enhancementLit.ts" />

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
  PetShopStripeGetOrderHistoryInput,
  PetShopStripeGetOrderHistoryOutput,
  PetShopStripeGetCustomerServiceBookingsInput,
  PetShopStripeGetCustomerServiceBookingsOutput,
} from '/_102030_/l2/petShopStripe/web/contracts/accountOrdersPage.js';

/// **collab_i18n_start**
const message_pt = {
  brand: 'Pet Shop Stripe',
  pageTitle: 'Pedidos da conta',
  loaded: 'Dados carregados',
  couldNotLoad: 'Nao foi possivel carregar',
  loadingGetOrderHistory: 'A carregar historico de pedidos',
  loadingGetCustomerServiceBookings: 'A carregar agendamentos de servicos',
};
const message_en = {
  brand: 'Pet Shop Stripe',
  pageTitle: 'Account orders',
  loaded: 'Data loaded',
  couldNotLoad: 'Could not load',
  loadingGetOrderHistory: 'Loading order history',
  loadingGetCustomerServiceBookings: 'Loading service bookings',
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en, pt: message_pt };
/// **collab_i18n_end**

export class PetShopStripeAccountOrdersPageBase extends CollabLitElement {
  private readonly _stateKeys = [
    'ui.accountOrdersPage.orders',
    'ui.accountOrdersPage.bookings',
  ] as const;

  @property() orders: PetShopStripeGetOrderHistoryOutput['orders'] = [];

  @property() bookings: PetShopStripeGetCustomerServiceBookingsOutput['bookings'] = [];

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
      case 'ui.accountOrdersPage.orders':
        this.orders = (value ?? []) as PetShopStripeGetOrderHistoryOutput['orders'];
        break;
      case 'ui.accountOrdersPage.bookings':
        this.bookings = (value ?? []) as PetShopStripeGetCustomerServiceBookingsOutput['bookings'];
        break;
      default:
        break;
    }
  }

  async loadInitialData(params?: unknown, options?: BffClientOptions): Promise<void> {
    await this.loadGetOrderHistory(params as any, options);
  }

  async loadGetOrderHistory(
    params?: PetShopStripeGetOrderHistoryInput,
    options?: BffClientOptions,
  ): Promise<void> {
    if ((window as any).mls) {
      this.orders = [
        {
          orderId: 'id-001' as any,
          orderNumber: 'ORD-1001',
          status: 'processing',
          paymentStatus: 'paid',
          totalAmount: 89,
          createdAt: '2026-06-01T10:20:00Z' as any,
          items: [
            {
              itemType: 'product',
              itemId: 'id-001' as any,
              name: 'Racao premium',
              quantity: 2,
              unitPrice: 25,
            },
            {
              itemType: 'service',
              itemId: 'id-001' as any,
              name: 'Banho',
              quantity: 1,
              unitPrice: 39,
            },
          ],
        },
        {
          orderId: 'id-001' as any,
          orderNumber: 'ORD-1002',
          status: 'delivered',
          paymentStatus: 'paid',
          totalAmount: 49,
          createdAt: '2026-05-20T15:05:00Z' as any,
          items: [
            {
              itemType: 'product',
              itemId: 'id-001' as any,
              name: 'Coleira',
              quantity: 1,
              unitPrice: 49,
            },
          ],
        },
      ];
      setState('ui.accountOrdersPage.orders', this.orders);
      this.status = this.msg.loaded;
      return;
    }

    const response = await execBff<PetShopStripeGetOrderHistoryOutput>(
      'petShopStripe.accountOrdersPage.getOrderHistory',
      params ?? ({} as any),
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

    this.orders = response.data.orders;
    setState('ui.accountOrdersPage.orders', this.orders);
    this.status = this.msg.loaded;
  }

  async loadGetCustomerServiceBookings(
    params?: PetShopStripeGetCustomerServiceBookingsInput,
    options?: BffClientOptions,
  ): Promise<void> {
    if ((window as any).mls) {
      this.bookings = [
        {
          serviceBookingId: 'id-001' as any,
          status: 'scheduled',
          scheduledDate: '2026-06-10' as any,
          scheduledStartTime: '10:00' as any,
          scheduledEndTime: '',
          timezone: 'America/Sao_Paulo',
          service: { serviceId: 'id-001' as any, name: 'Tosa' },
          pet: { petId: 'id-001' as any, name: 'Rex' },
        },
        {
          serviceBookingId: 'id-001' as any,
          status: 'completed',
          scheduledDate: '2026-05-28' as any,
          scheduledStartTime: '14:30' as any,
          scheduledEndTime: '15:30' as any,
          timezone: 'America/Sao_Paulo',
          service: { serviceId: 'id-001' as any, name: 'Banho' },
          pet: { petId: 'id-001' as any, name: 'Luna' },
        },
      ];
      setState('ui.accountOrdersPage.bookings', this.bookings);
      this.status = this.msg.loaded;
      return;
    }

    const response = await execBff<PetShopStripeGetCustomerServiceBookingsOutput>(
      'petShopStripe.accountOrdersPage.getCustomerServiceBookings',
      params ?? ({} as any),
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

    this.bookings = response.data.bookings;
    setState('ui.accountOrdersPage.bookings', this.bookings);
    this.status = this.msg.loaded;
  }
}
