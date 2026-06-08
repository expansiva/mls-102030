/// <mls fileReference="_102030_/l1/petShopStripe/layer_3_usecases/usecaseGetMetricsDashboard.defs.ts" enhancement="_blank" />
export const usecaseGetMetricsDashboardUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "usecaseGetMetricsDashboard",
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
      "usecaseId": "usecaseGetMetricsDashboard",
      "title": "Consultar métricas de vendas",
      "purpose": "Obter séries temporais de métricas de vendas e pagamentos para dashboard.",
      "actor": "adminPetShop",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "salesOpsMetricsAggregate"
      ],
      "outputEntities": [
        "salesOpsMetricsAggregate"
      ],
      "readsTables": [
        "salesOpsMetrics"
      ],
      "writesTables": [],
      "rulesApplied": []
    }
  }
} as const;

export default usecaseGetMetricsDashboardUsecasePlan;
