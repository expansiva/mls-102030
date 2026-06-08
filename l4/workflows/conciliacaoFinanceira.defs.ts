/// <mls fileReference="_102030_/l4/workflows/conciliacaoFinanceira.defs.ts" enhancement="_blank" />
export const conciliacaoFinanceiraDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "conciliacaoFinanceira",
  "moduleName": "petShopBrasil",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 67,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "conciliacaoFinanceira",
      "title": "Conciliação financeira",
      "purpose": "Comparar periodicamente pedidos pagos com transações recebidas na Stripe, identificar divergências e gerar tarefas administrativas para correção.",
      "executionMode": "automation",
      "createsTask": true,
      "taskConfig": {
        "taskTitleTemplate": "Investigar divergência de conciliação {dataReferencia}",
        "assigneeRules": [
          "administrador"
        ],
        "slaRules": [
          "resolverEm:2d"
        ],
        "taskRoomRequired": false
      },
      "actors": [
        "administrador"
      ],
      "states": [
        {
          "stateId": "idle",
          "description": "Aguardando execução da conciliação."
        },
        {
          "stateId": "executing",
          "description": "Conciliando pedidos pagos com transações Stripe."
        },
        {
          "stateId": "conciliado",
          "description": "Conciliação concluída sem divergências pendentes."
        },
        {
          "stateId": "divergenciasEncontradas",
          "description": "Divergências identificadas e aguardando análise administrativa."
        },
        {
          "stateId": "falha",
          "description": "Falha na execução da conciliação."
        }
      ],
      "transitions": [
        {
          "from": "idle",
          "to": "executing",
          "trigger": "scheduledRun",
          "actor": "administrador",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "rule-confirmacao-stripe",
            "rule-acesso-admin"
          ]
        },
        {
          "from": "idle",
          "to": "executing",
          "trigger": "manualRun",
          "actor": "administrador",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "rule-confirmacao-stripe",
            "rule-acesso-admin"
          ]
        },
        {
          "from": "executing",
          "to": "conciliado",
          "trigger": "reconciliationCompleted",
          "actor": "administrador",
          "conditions": [
            "semDivergencias"
          ],
          "actions": [
            "Pedido.updatedAt=now"
          ],
          "rulesApplied": [
            "rule-confirmacao-stripe",
            "rule-acesso-admin"
          ]
        },
        {
          "from": "executing",
          "to": "divergenciasEncontradas",
          "trigger": "divergenceDetected",
          "actor": "administrador",
          "conditions": [
            "comDivergencias"
          ],
          "actions": [
            "Pedido.updatedAt=now"
          ],
          "rulesApplied": [
            "rule-confirmacao-stripe",
            "rule-acesso-admin"
          ]
        },
        {
          "from": "divergenciasEncontradas",
          "to": "conciliado",
          "trigger": "divergenceResolved",
          "actor": "administrador",
          "conditions": [
            "divergenciasCorrigidas"
          ],
          "actions": [
            "Pedido.updatedAt=now"
          ],
          "rulesApplied": [
            "rule-confirmacao-stripe",
            "rule-acesso-admin"
          ]
        },
        {
          "from": "executing",
          "to": "falha",
          "trigger": "reconciliationFailed",
          "actor": "administrador",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "rule-confirmacao-stripe",
            "rule-acesso-admin"
          ]
        },
        {
          "from": "falha",
          "to": "executing",
          "trigger": "retryRun",
          "actor": "administrador",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "rule-confirmacao-stripe",
            "rule-acesso-admin"
          ]
        }
      ],
      "requiredEntities": [
        "Pedido",
        "Pagamento",
        "TransacaoFinanceira"
      ],
      "persistenceRefs": [
        "pedido"
      ],
      "usecaseRefs": [
        "conciliarTransacoes",
        "conciliarTransacoesStripe"
      ],
      "metricRefs": [],
      "userActions": [
        "conciliarTransacoes"
      ],
      "relatedPages": [
        "adminFinanceiro"
      ],
      "relatedAgents": [],
      "relatedPlugins": [
        "stripePagamentos"
      ],
      "rulesApplied": [
        "rule-confirmacao-stripe",
        "rule-acesso-admin"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "sugConciliacaoAgendada",
          "title": "Execução agendada da conciliação",
          "priority": "soon",
          "description": "Executar a conciliação automaticamente diariamente (ex: 03h) para identificar divergências sem intervenção manual.",
          "tradeoff": "Requer infraestrutura de agendamento e monitoramento de falhas."
        },
        {
          "suggestionId": "sugConciliacaoDivergencia",
          "title": "Tarefa administrativa para divergências",
          "priority": "soon",
          "description": "Criar tarefa administrativa ao detectar divergências para investigação e correção pelo administrador.",
          "tradeoff": "Pode aumentar volume de tarefas em períodos de instabilidade da Stripe."
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/conciliacaoFinanceira.defs.ts",
      "exportName": "conciliacaoFinanceiraDef",
      "saveAsDefs": true
    }
  }
} as const;

export default conciliacaoFinanceiraDef;
