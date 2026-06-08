export const usecaseReconcilePaymentsUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "usecaseReconcilePayments",
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
      "usecaseId": "usecaseReconcilePayments",
      "title": "Conciliar recebíveis",
      "purpose": "Registrar conciliação de pagamentos aprovados e lançar recebíveis.",
      "actor": "adminPetShop",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "receivableAggregate",
        "orderAggregate"
      ],
      "outputEntities": [
        "receivableAggregate"
      ],
      "readsTables": [
        "order",
        "payment",
        "stripeTransaction"
      ],
      "writesTables": [
        "receivable",
        "financialEntry"
      ],
      "commands": [
        "reconcilePayments"
      ],
      "rulesApplied": [
        "ruleReceivableFromPayment"
      ]
    }
  }
} as const;

export default usecaseReconcilePaymentsUsecasePlan;
