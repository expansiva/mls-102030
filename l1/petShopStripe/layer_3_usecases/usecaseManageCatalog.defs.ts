export const usecaseManageCatalogUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "usecaseManageCatalog",
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
      "usecaseId": "usecaseManageCatalog",
      "title": "Gerenciar catálogo",
      "purpose": "Cadastrar, editar ou desativar produtos e serviços, preços e disponibilidade.",
      "actor": "adminPetShop",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "catalogAggregate"
      ],
      "outputEntities": [
        "catalogAggregate"
      ],
      "readsTables": [
        "product",
        "service",
        "catalogCategory"
      ],
      "writesTables": [
        "product",
        "service",
        "catalogCategory"
      ],
      "commands": [
        "manageCatalog"
      ],
      "rulesApplied": []
    }
  }
} as const;

export default usecaseManageCatalogUsecasePlan;
