/// <mls fileReference="_102030_/l2/petShopStripe/web/shared/adminOrdersPage.ts" enhancement="_102027_/l2/enhancementLit.ts" />
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
  PetShopStripeGetOrderAdminListInput,
  PetShopStripeGetOrderAdminListOutput,
  PetShopStripeGetServiceBookingsInput,
  PetShopStripeGetServiceBookingsOutput,
  PetShopStripeUpdateOrderStatusInput,
  PetShopStripeUpdateOrderStatusOutput,
} from '/_102030_/l2/petShopStripe/web/contracts/adminOrdersPage.js';

/// **collab_i18n_start**
const message_pt = {
  brand: 'Pet Shop Stripe',
  pageTitle: 'Admin Orders',
  loaded: 'Dados carregados',
  couldNotLoad: 'Nao foi possivel carregar',
  loadingGetOrderAdminList: 'Carregando pedidos',
  loadingGetServiceBookings: 'Carregando agendamentos',
  couldNotUpdateOrderStatus: 'Nao foi possivel atualizar status do pedido',
  updateOrderStatusLoading: 'Atualizando status do pedido',
};
const message_en = {
  brand: 'Pet Shop Stripe',
  pageTitle: 'Admin Orders',
  loaded: 'Data loaded',
  couldNotLoad: 'Could not load',
  loadingGetOrderAdminList: 'Loading orders',
  loadingGetServiceBookings: 'Loading bookings',
  couldNotUpdateOrderStatus: 'Could not update order status',
  updateOrderStatusLoading: 'Updating order status',
};
type MessageType = typeof message_en;
const messages: { [key: string]: MessageType } = { en: message_en, pt: message_pt };
/// **collab_i18n_end**

export class PetShopStripeAdminOrdersPageBase extends CollabLitElement {
  private readonly _stateKeys = [
    'ui.adminOrdersPage.orders',
    'ui.adminOrdersPage.page',
    'ui.adminOrdersPage.pageSize',
    'ui.adminOrdersPage.total',
    'ui.adminOrdersPage.serviceBookings',
    'ui.adminOrdersPage.updateOrderStatus',
  ] as const;

  @property() orders: PetShopStripeGetOrderAdminListOutput['orders'] = [];

  @property() page: PetShopStripeGetOrderAdminListOutput['page'] | undefined = undefined;

  @property() pageSize: PetShopStripeGetOrderAdminListOutput['pageSize'] | undefined = undefined;

  @property() total: PetShopStripeGetOrderAdminListOutput['total'] | undefined = undefined;

  @property() serviceBookings: PetShopStripeGetServiceBookingsOutput['serviceBookings'] = [];

  @property() updateOrderStatusState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

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
      case 'ui.adminOrdersPage.orders':
        this.orders = (value ?? []) as PetShopStripeGetOrderAdminListOutput['orders'];
        break;
      case 'ui.adminOrdersPage.page':
        this.page = (value ?? 0) as PetShopStripeGetOrderAdminListOutput['page'];
        break;
      case 'ui.adminOrdersPage.pageSize':
        this.pageSize = (value ?? 0) as PetShopStripeGetOrderAdminListOutput['pageSize'];
        break;
      case 'ui.adminOrdersPage.total':
        this.total = (value ?? 0) as PetShopStripeGetOrderAdminListOutput['total'];
        break;
      case 'ui.adminOrdersPage.serviceBookings':
        this.serviceBookings = (value ?? []) as PetShopStripeGetServiceBookingsOutput['serviceBookings'];
        break;
      case 'ui.adminOrdersPage.updateOrderStatus':
        this.updateOrderStatusState = (value ?? 'idle') as typeof this.updateOrderStatusState;
        break;
    }
  }

  async loadInitialData(params?: unknown, options?: BffClientOptions): Promise<void> {
    await this.loadGetOrderAdminList(undefined, options);
  }

  async loadGetOrderAdminList(
    params?: Partial<PetShopStripeGetOrderAdminListInput>,
    options?: BffClientOptions
  ): Promise<void> {
    if ((window as any).mls) {
      this.orders = [
        {
          orderId: 'id-001',
          orderNumber: 'ORD-1001',
          status: 'CREATED',
          paymentStatus: 'PAID',
          totalAmount: 120,
          createdAt: '2026-06-01T10:00:00.000Z',
          updatedAt: '2026-06-01T10:05:00.000Z',
        },
        {
          orderId: 'id-002',
          orderNumber: 'ORD-1002',
          status: 'SHIPPED',
          paymentStatus: 'PAID',
          totalAmount: 89,
          createdAt: '2026-06-02T11:00:00.000Z',
          updatedAt: '2026-06-02T12:00:00.000Z',
        },
      ];
      this.page = 1;
      this.pageSize = 10;
      this.total = 2;
      setState('ui.adminOrdersPage.orders', this.orders);
      setState('ui.adminOrdersPage.page', this.page);
      setState('ui.adminOrdersPage.pageSize', this.pageSize);
      setState('ui.adminOrdersPage.total', this.total);
      this.status = this.msg.loaded;
      return;
    }

    const response = await execBff<PetShopStripeGetOrderAdminListOutput>(
      'petShopStripe.adminOrdersPage.getOrderAdminList',
      (params ?? {}) as any,
      options
    );

    if (!response.ok || !response.data) {
      if (options?.mode === 'blocking') {
        throw (response.error ?? { code: 'UNEXPECTED_ERROR', message: this.msg.couldNotLoad }) satisfies AuraNormalizedError;
      }
      this.status = this.msg.couldNotLoad;
      return;
    }

    this.orders = response.data.orders;
    this.page = response.data.page;
    this.pageSize = response.data.pageSize;
    this.total = response.data.total;
    setState('ui.adminOrdersPage.orders', this.orders);
    setState('ui.adminOrdersPage.page', this.page);
    setState('ui.adminOrdersPage.pageSize', this.pageSize);
    setState('ui.adminOrdersPage.total', this.total);
    this.status = this.msg.loaded;
  }

  async loadGetServiceBookings(
    params?: Partial<PetShopStripeGetServiceBookingsInput>,
    options?: BffClientOptions
  ): Promise<void> {
    if ((window as any).mls) {
      this.serviceBookings = [
        {
          serviceBookingId: 'id-001',
          serviceId: 'id-001',
          serviceName: 'Banho',
          customerId: 'id-001',
          customerName: 'Ana Silva',
          petId: 'id-001',
          petName: 'Rex',
          status: 'SCHEDULED',
          scheduledDate: '2026-06-10',
          scheduledStartTime: '10:00:00',
          scheduledEndTime: '11:00:00',
          orderId: 'id-001',
        },
        {
          serviceBookingId: 'id-002',
          serviceId: 'id-002',
          serviceName: 'Tosa',
          customerId: 'id-002',
          customerName: 'Ana Silva',
          petId: 'id-002',
          petName: 'Luna',
          status: 'COMPLETED',
          scheduledDate: '2026-06-11',
          scheduledStartTime: '14:00:00',
          scheduledEndTime: '15:00:00',
          orderId: 'id-002',
        },
      ];
      setState('ui.adminOrdersPage.serviceBookings', this.serviceBookings);
      this.status = this.msg.loaded;
      return;
    }

    const response = await execBff<PetShopStripeGetServiceBookingsOutput>(
      'petShopStripe.adminOrdersPage.getServiceBookings',
      (params ?? {}) as any,
      options
    );

    if (!response.ok || !response.data) {
      if (options?.mode === 'blocking') {
        throw (response.error ?? { code: 'UNEXPECTED_ERROR', message: this.msg.couldNotLoad }) satisfies AuraNormalizedError;
      }
      this.status = this.msg.couldNotLoad;
      return;
    }

    this.serviceBookings = response.data.serviceBookings;
    setState('ui.adminOrdersPage.serviceBookings', this.serviceBookings);
    this.status = this.msg.loaded;
  }

  async updateOrderStatus(params: PetShopStripeUpdateOrderStatusInput, signal?: AbortSignal): Promise<void> {
    if ((window as any).mls) {
      console.log('[mls mock] petShopStripe.adminOrdersPage.updateOrderStatus', params);
      this.updateOrderStatusState = 'success';
      setState('ui.adminOrdersPage.updateOrderStatus', 'success');
      return;
    }
    this.updateOrderStatusState = 'loading';
    setState('ui.adminOrdersPage.updateOrderStatus', 'loading');
    try {
      const response = await execBff<PetShopStripeUpdateOrderStatusOutput>(
        'petShopStripe.adminOrdersPage.updateOrderStatus',
        params,
        signal ? { signal } : undefined
      );
      if (!response.ok) throw response.error;
      this.updateOrderStatusState = 'success';
      setState('ui.adminOrdersPage.updateOrderStatus', 'success');
      await this.loadGetOrderAdminList(undefined, { mode: 'silent' });
    } catch (e) {
      this.updateOrderStatusState = 'error';
      setState('ui.adminOrdersPage.updateOrderStatus', 'error');
      throw e;
    }
  }

  handleUpdateOrderStatusClick(): void {
    const params: PetShopStripeUpdateOrderStatusInput = {
      orderId: (this.orders?.[0]?.orderId ?? 'id-001') as string,
      newStatus: (this.orders?.[0]?.status ?? 'CREATED') as string,
      statusReason: '',
    };
    void runBlockingUiAction(
      async (signal: AbortSignal) => {
        await this.updateOrderStatus(params, signal);
      },
      {
        busyLabel: this.msg.updateOrderStatusLoading,
        errorTitle: this.msg.couldNotUpdateOrderStatus,
        retry: () => this.updateOrderStatus(params),
      }
    );
  }
}
