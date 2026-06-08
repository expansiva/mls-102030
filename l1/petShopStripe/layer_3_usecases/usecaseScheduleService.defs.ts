/// <mls fileReference="_102030_/l1/petShopStripe/layer_3_usecases/usecaseScheduleService.defs.ts" enhancement="_blank" />
export const usecaseScheduleServiceUsecasePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "usecase",
  "artifactId": "usecaseScheduleService",
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
      "usecaseId": "usecaseScheduleService",
      "title": "Agendar serviço",
      "purpose": "Criar agendamento de serviço e vincular ao pedido quando aplicável.",
      "actor": "cliente",
      "layer": "layer_3_usecases",
      "inputEntities": [
        "serviceBookingAggregate",
        "orderAggregate"
      ],
      "outputEntities": [
        "serviceBookingAggregate",
        "orderAggregate"
      ],
      "readsTables": [
        "order"
      ],
      "writesTables": [
        "serviceBooking",
        "order"
      ],
      "commands": [
        "scheduleService"
      ],
      "rulesApplied": [
        "ruleServiceBookingRequiresSlot"
      ]
    }
  }
} as const;

export default usecaseScheduleServiceUsecasePlan;
