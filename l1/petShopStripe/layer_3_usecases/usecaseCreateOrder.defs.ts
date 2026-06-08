/// <mls fileReference="_102030_/l1/petShopStripe/layer_3_usecases/usecaseCreateOrder.defs.ts" enhancement="_blank" />
export const usecaseCreateOrderUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "usecaseCreateOrder",
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
      "usecaseId": "usecaseCreateOrder",
      "title": "Criar pedido",
      "purpose": "Gerar pedido a partir do carrinho confirmado e marcar carrinho como convertido.",
      "actor": "cliente",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "cartAggregate",
        "orderAggregate"
      ],
      "outputEntities": [
        "orderAggregate"
      ],
      "readsTables": [
        "cart"
      ],
      "writesTables": [
        "order",
        "cart"
      ],
      "commands": [
        "startCheckout"
      ],
      "rulesApplied": [
        "ruleOrderRequiresCustomer"
      ]
    }
  }
} as const;

export default usecaseCreateOrderUsecasePlan;
