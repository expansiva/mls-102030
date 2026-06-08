/// <mls fileReference="_102030_/l1/petShopStripe/layer_3_usecases/usecaseUpdateMetricsOnOrderPaid.defs.ts" enhancement="_blank" />
export const usecaseUpdateMetricsOnOrderPaidUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "usecaseUpdateMetricsOnOrderPaid",
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
      "usecaseId": "usecaseUpdateMetricsOnOrderPaid",
      "title": "Atualizar métricas de vendas",
      "purpose": "Atualizar métricas operacionais quando pedidos são pagos ou cancelados.",
      "actor": "adminPetShop",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "orderAggregate",
        "salesOpsMetricsAggregate"
      ],
      "outputEntities": [
        "salesOpsMetricsAggregate"
      ],
      "readsTables": [
        "order"
      ],
      "writesTables": [
        "salesOpsMetrics"
      ],
      "commands": [],
      "rulesApplied": [
        "ruleMetricsUpdateOnOrderPaid"
      ]
    }
  }
} as const;

export default usecaseUpdateMetricsOnOrderPaidUsecasePlan;
