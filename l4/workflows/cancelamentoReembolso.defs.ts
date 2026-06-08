/// <mls fileReference="_102030_/l4/workflows/cancelamentoReembolso.defs.ts" enhancement="_blank" />
export const cancelamentoReembolsoDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "cancelamentoReembolso",
  "moduleName": "petShopBrasil",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 65,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "cancelamentoReembolso",
      "title": "Cancelamento e reembolso",
      "purpose": "Processar solicitações de cancelamento e reembolso de pedidos pagos, integrando com Stripe para devolução e atualizando status do pedido e métricas financeiras.",
      "executionMode": "taskWorkflow",
      "createsTask": true,
      "taskConfig": {
        "taskTitleTemplate": "Processar cancelamento e reembolso do pedido {{pedidoId}}",
        "assigneeRules": [
          "rule-acesso-admin"
        ],
        "slaRules": [],
        "taskRoomRequired": false
      },
      "actors": [
        "administrador"
      ],
      "states": [
        {
          "stateId": "requestLogged",
          "description": "Solicitação de cancelamento registrada e aguardando análise administrativa."
        },
        {
          "stateId": "refundInitiated",
          "description": "Cancelamento aprovado e reembolso iniciado na Stripe."
        },
        {
          "stateId": "refundCompleted",
          "description": "Reembolso confirmado e pedido marcado como reembolsado."
        },
        {
          "stateId": "refundFailed",
          "description": "Falha no reembolso; precisa de intervenção administrativa."
        }
      ],
      "transitions": [
        {
          "from": "requestLogged",
          "to": "refundInitiated",
          "trigger": "approveCancellation",
          "actor": "administrador",
          "conditions": [
            "rule-acesso-admin",
            "rule-status-pedido"
          ],
          "actions": [
            "pedido.status=cancelado",
            "pedido.canceledAt=now",
            "pedido.updatedAt=now"
          ],
          "rulesApplied": [
            "rule-acesso-admin",
            "rule-status-pedido"
          ]
        },
        {
          "from": "refundInitiated",
          "to": "refundCompleted",
          "trigger": "confirmStripeRefund",
          "actor": "administrador",
          "conditions": [
            "rule-confirmacao-stripe",
            "rule-status-pedido"
          ],
          "actions": [
            "pedido.status=reembolsado",
            "pedido.refundedAt=now",
            "pedido.updatedAt=now"
          ],
          "rulesApplied": [
            "rule-confirmacao-stripe",
            "rule-status-pedido",
            "rule-acesso-admin"
          ]
        },
        {
          "from": "refundInitiated",
          "to": "refundFailed",
          "trigger": "stripeRefundFailed",
          "actor": "administrador",
          "conditions": [
            "rule-confirmacao-stripe"
          ],
          "actions": [
            "pedido.updatedAt=now"
          ],
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
        "reembolsarPagamento",
        "atualizarStatusPedido"
      ],
      "metricRefs": [
        "dailySalesMetrics"
      ],
      "userActions": [
        "atualizarStatusPedido"
      ],
      "relatedPages": [
        "adminPedidos",
        "adminFinanceiro"
      ],
      "relatedAgents": [],
      "relatedPlugins": [
        "stripePagamentos"
      ],
      "rulesApplied": [
        "rule-status-pedido",
        "rule-confirmacao-stripe",
        "rule-acesso-admin"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "sugReembolsoParcial",
          "title": "Suporte a reembolso parcial futuro",
          "priority": "later",
          "description": "Começar com reembolso total, mas estruturar dados e UI para permitir reembolso parcial de itens no futuro.",
          "tradeoff": "Aumenta a complexidade de cálculo e validações quando for implementado."
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/cancelamentoReembolso.defs.ts",
      "exportName": "cancelamentoReembolsoDef",
      "saveAsDefs": true
    }
  }
} as const;

export default cancelamentoReembolsoDef;
