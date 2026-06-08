export const usecaseGetOrderHistoryUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "usecaseGetOrderHistory",
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
      "usecaseId": "usecaseGetOrderHistory",
      "title": "Listar pedidos do cliente",
      "purpose": "Listar pedidos do cliente para acompanhamento de histórico.",
      "actor": "cliente",
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
      "writesTables": [],
      "rulesApplied": []
    }
  }
} as const;

export default usecaseGetOrderHistoryUsecasePlan;
