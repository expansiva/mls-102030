/// <mls fileReference="_102030_/l4/workflows/carrinhoLifecycle.defs.ts" enhancement="_blank" />
export const carrinhoLifecycleDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "carrinhoLifecycle",
  "moduleName": "petShopBrasil",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 61,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "carrinhoLifecycle",
      "title": "Ciclo de vida do carrinho",
      "purpose": "Gerenciar estados do carrinho do cliente desde a criação até a conversão em pedido, abandono ou expiração automática.",
      "executionMode": "entityLifecycle",
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
          "description": "Carrinho ativo e editável pelo cliente."
        },
        {
          "stateId": "abandonado",
          "description": "Carrinho sem atividade por período relevante, aguardando expiração."
        },
        {
          "stateId": "expirado",
          "description": "Carrinho expirado por inatividade e não mais editável."
        },
        {
          "stateId": "convertido",
          "description": "Carrinho convertido em pedido no checkout."
        }
      ],
      "transitions": [
        {
          "from": "ativo",
          "to": "ativo",
          "trigger": "adicionarItem",
          "actor": "cliente",
          "conditions": [],
          "actions": [
            "carrinho.status=ativo",
            "carrinho.atualizado_em=now()"
          ],
          "rulesApplied": [
            "rule-brl-localidade"
          ]
        },
        {
          "from": "ativo",
          "to": "ativo",
          "trigger": "atualizarItem",
          "actor": "cliente",
          "conditions": [],
          "actions": [
            "carrinho.status=ativo",
            "carrinho.atualizado_em=now()"
          ],
          "rulesApplied": [
            "rule-brl-localidade"
          ]
        },
        {
          "from": "ativo",
          "to": "convertido",
          "trigger": "iniciarCheckout",
          "actor": "cliente",
          "conditions": [],
          "actions": [
            "carrinho.status=convertido",
            "carrinho.atualizado_em=now()"
          ],
          "rulesApplied": [
            "rule-brl-localidade"
          ]
        },
        {
          "from": "ativo",
          "to": "abandonado",
          "trigger": "marcarAbandono",
          "actor": "cliente",
          "conditions": [
            "inatividadeAtingida"
          ],
          "actions": [
            "carrinho.status=abandonado"
          ],
          "rulesApplied": [
            "rule-brl-localidade"
          ]
        },
        {
          "from": "abandonado",
          "to": "expirado",
          "trigger": "expirarCarrinho",
          "actor": "cliente",
          "conditions": [
            "prazoExpiracaoAtingido"
          ],
          "actions": [
            "carrinho.status=expirado",
            "carrinho.expira_em=now()"
          ],
          "rulesApplied": [
            "rule-brl-localidade"
          ]
        },
        {
          "from": "abandonado",
          "to": "convertido",
          "trigger": "retomarCheckout",
          "actor": "cliente",
          "conditions": [],
          "actions": [
            "carrinho.status=convertido",
            "carrinho.atualizado_em=now()"
          ],
          "rulesApplied": [
            "rule-brl-localidade"
          ]
        }
      ],
      "requiredEntities": [
        "Carrinho",
        "ItemPedido",
        "Cliente"
      ],
      "persistenceRefs": [
        "carrinho"
      ],
      "usecaseRefs": [
        "adicionarAoCarrinho",
        "atualizarCarrinho",
        "manterCarrinho"
      ],
      "metricRefs": [],
      "userActions": [
        "adicionarAoCarrinho",
        "atualizarCarrinho",
        "iniciarCheckout"
      ],
      "relatedPages": [
        "carrinho",
        "checkout"
      ],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "rule-brl-localidade"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "sug-carrinho-expiracao",
          "title": "Job de expiração de carrinhos abandonados",
          "priority": "soon",
          "description": "Implementar job periódico que marque carrinhos abandonados como expirados após o prazo configurável.",
          "tradeoff": "Requer agendamento em infraestrutura e pode adicionar carga periódica no banco."
        },
        {
          "suggestionId": "sug-carrinho-sem-tarefa",
          "title": "Sem tarefas para fluxo de carrinho",
          "priority": "now",
          "description": "Manter o ciclo de vida do carrinho automático e controlado por eventos do cliente e jobs, sem criar tarefas administrativas.",
          "tradeoff": "Sem visibilidade operacional via tarefas; exige métricas ou logs para monitorar abandono."
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/carrinhoLifecycle.defs.ts",
      "exportName": "carrinhoLifecycleDef",
      "saveAsDefs": true
    }
  }
} as const;

export default carrinhoLifecycleDef;
