/// <mls fileReference="_102030_/l5/petShopStripe/rules.defs.ts" enhancement="_blank" />
export const rulesPlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "rules",
  "artifactId": "petShopStripeRules",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentFinalizeSolutionPlan",
    "stepId": 11,
    "planId": "plan-finalize-solution-plan"
  },
  "data": {
    "moduleName": "petShopStripe",
    "rules": [
      {
        "ruleId": "ruleOrderRequiresCustomer",
        "title": "Pedido requer cliente",
        "description": "Todo pedido deve estar associado a um cliente válido.",
        "appliesTo": [
          "Order"
        ],
        "layer": "layer_1"
      },
      {
        "ruleId": "ruleOrderStatusLifecycle",
        "title": "Ciclo de vida do pedido",
        "description": "O pedido deve seguir estados padrão: criado, aguardandoPagamento, pago, emSeparacao, concluido, cancelado.",
        "appliesTo": [
          "Order"
        ],
        "layer": "layer_1"
      },
      {
        "ruleId": "rulePaymentRequiredToConfirmOrder",
        "title": "Pagamento confirma pedido",
        "description": "Pedido só pode ser confirmado como pago após transação Stripe aprovada.",
        "appliesTo": [
          "Order",
          "Payment",
          "StripeTransaction"
        ],
        "layer": "layer_2"
      },
      {
        "ruleId": "ruleStripeTransactionLink",
        "title": "Transação Stripe vinculada",
        "description": "Toda transação Stripe deve estar vinculada a um pagamento e pedido.",
        "appliesTo": [
          "StripeTransaction",
          "Payment",
          "Order"
        ],
        "layer": "layer_1"
      },
      {
        "ruleId": "ruleServiceBookingRequiresSlot",
        "title": "Agendamento requer horário",
        "description": "Agendamento de serviço exige data e horário disponíveis.",
        "appliesTo": [
          "ServiceBooking"
        ],
        "layer": "layer_2"
      },
      {
        "ruleId": "ruleReceivableFromPayment",
        "title": "Recebível a partir do pagamento",
        "description": "Recebível é criado quando pagamento aprovado e conciliação registrada.",
        "appliesTo": [
          "Receivable",
          "Payment",
          "FinancialEntry"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "ruleMetricsUpdateOnOrderPaid",
        "title": "Atualização de métricas",
        "description": "Métricas de vendas e pagamentos são atualizadas quando pedido é pago.",
        "appliesTo": [
          "Order",
          "Payment"
        ],
        "layer": "layer_3"
      }
    ]
  }
} as const;

export default rulesPlan;
