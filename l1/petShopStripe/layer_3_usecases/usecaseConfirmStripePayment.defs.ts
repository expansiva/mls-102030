export const usecaseConfirmStripePaymentUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "usecaseConfirmStripePayment",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentPlanUsecaseEntities",
    "stepId": 61,
    "planId": "plan-index-critic:usecasePlan:2"
  },
  "data": {
    "backendArchitecture": {
      "pattern": "cleanArchitecture",
      "layer2Responsibility": "Orquestrar requisições dos BFF/controllers e chamar casos de uso sem acesso direto a tabelas.",
      "layer3Responsibility": "Executar regras de negócio, ler/escrever tabelas layer_1_external e atualizar métricas.",
      "layer1Responsibility": "Persistência de dados transacionais e métricas acessíveis apenas por casos de uso."
    },
    "controllerRules": {
      "bffMustCallUsecases": true,
      "bffDirectTableAccessForbidden": true
    },
    "usecase": {
      "usecaseId": "usecaseConfirmStripePayment",
      "title": "Confirmar pagamento Stripe",
      "purpose": "Atualizar status do pedido após confirmação de pagamento e registrar métricas.",
      "actor": "cliente",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "orderAggregate",
        "salesOpsMetricsAggregate"
      ],
      "outputEntities": [
        "orderAggregate",
        "salesOpsMetricsAggregate"
      ],
      "readsTables": [
        "order"
      ],
      "writesTables": [
        "order",
        "salesOpsMetrics"
      ],
      "commands": [
        "confirmStripePayment"
      ],
      "rulesApplied": [
        "rulePaymentRequiredToConfirmOrder",
        "ruleStripeTransactionLink",
        "ruleMetricsUpdateOnOrderPaid"
      ]
    }
  }
} as const;

export default usecaseConfirmStripePaymentUsecasePlan;
