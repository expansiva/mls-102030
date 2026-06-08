export const usecaseUpdateOrderStatusUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "usecaseUpdateOrderStatus",
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
      "usecaseId": "usecaseUpdateOrderStatus",
      "title": "Atualizar status do pedido",
      "purpose": "Alterar status do pedido conforme ciclo de vida.",
      "actor": "adminPetShop",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "orderAggregate"
      ],
      "outputEntities": [
        "orderAggregate"
      ],
      "readsTables": [
        "order"
      ],
      "writesTables": [
        "order"
      ],
      "commands": [
        "updateOrderStatus"
      ],
      "rulesApplied": [
        "ruleOrderStatusLifecycle"
      ]
    }
  }
} as const;

export default usecaseUpdateOrderStatusUsecasePlan;
