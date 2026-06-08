/// <mls fileReference="_102030_/l4/workflows/expiracaoCarrinho.defs.ts" enhancement="_blank" />
export const expiracaoCarrinhoDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "expiracaoCarrinho",
  "moduleName": "petShopBrasil",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 68,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "expiracaoCarrinho",
      "title": "Expiração de carrinhos",
      "purpose": "Automatizar a marcação de carrinhos como expirados ou abandonados após período de inatividade, liberando recursos e alimentando métricas de abandono.",
      "executionMode": "automation",
      "createsTask": false,
      "taskConfig": {
        "taskTitleTemplate": "",
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false
      },
      "actors": [
        "cliente"
      ],
      "states": [
        {
          "stateId": "ativo",
          "description": "Carrinho em uso pelo cliente."
        },
        {
          "stateId": "abandonado",
          "description": "Carrinho sem atividade por período de inatividade."
        },
        {
          "stateId": "expirado",
          "description": "Carrinho expirado e indisponível para checkout."
        },
        {
          "stateId": "convertido",
          "description": "Carrinho convertido em pedido durante o checkout."
        }
      ],
      "transitions": [
        {
          "from": "ativo",
          "to": "abandonado",
          "trigger": "jobInatividadeDetectada",
          "actor": "cliente",
          "conditions": [],
          "actions": [
            "set status=abandonado",
            "set atualizado_em=now"
          ],
          "rulesApplied": [
            "rule-brl-localidade"
          ]
        },
        {
          "from": "abandonado",
          "to": "expirado",
          "trigger": "jobExpiracaoCarrinho",
          "actor": "cliente",
          "conditions": [],
          "actions": [
            "set status=expirado",
            "set atualizado_em=now"
          ],
          "rulesApplied": [
            "rule-brl-localidade"
          ]
        },
        {
          "from": "ativo",
          "to": "expirado",
          "trigger": "jobExpiracaoCarrinho",
          "actor": "cliente",
          "conditions": [],
          "actions": [
            "set status=expirado",
            "set atualizado_em=now"
          ],
          "rulesApplied": [
            "rule-brl-localidade"
          ]
        }
      ],
      "requiredEntities": [
        "Carrinho"
      ],
      "persistenceRefs": [
        "carrinho"
      ],
      "usecaseRefs": [],
      "metricRefs": [],
      "userActions": [],
      "relatedPages": [],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "rule-brl-localidade"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "carrinhoJobSchedule",
          "title": "Job periódico de expiração",
          "priority": "soon",
          "description": "Executar job de expiração a cada 1 hora para marcar carrinhos inativos além do prazo configurado.",
          "tradeoff": "Aumenta carga de processamento periódico, mas mantém carrinhos limpos e atualizados."
        },
        {
          "suggestionId": "noTaskForExpiration",
          "title": "Sem tarefas humanas para expiração",
          "priority": "now",
          "description": "Manter expiração totalmente automática, sem criação de tarefas, pois é rotina operacional de limpeza.",
          "tradeoff": "Não há revisão humana de casos limítrofes; exige monitoramento por logs."
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/expiracaoCarrinho.defs.ts",
      "exportName": "expiracaoCarrinhoDef",
      "saveAsDefs": true
    }
  }
} as const;

export default expiracaoCarrinhoDef;
