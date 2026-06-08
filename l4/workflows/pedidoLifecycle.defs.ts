export const pedidoLifecycleDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "pedidoLifecycle",
  "moduleName": "petShopBrasil",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 62,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "pedidoLifecycle",
      "title": "Ciclo de vida do pedido",
      "purpose": "Controlar transições de status do pedido desde a criação até pagamento, cancelamento ou reembolso, garantindo consistência com transações Stripe.",
      "executionMode": "entityLifecycle",
      "createsTask": false,
      "taskConfig": {
        "taskTitleTemplate": "",
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false
      },
      "actors": [
        "cliente",
        "administrador"
      ],
      "states": [
        {
          "stateId": "inicio",
          "description": "Estado inicial antes da criação do pedido."
        },
        {
          "stateId": "criado",
          "description": "Pedido registrado e pronto para iniciar pagamento."
        },
        {
          "stateId": "aguardandoPagamento",
          "description": "Pedido com pagamento iniciado e aguardando confirmação da Stripe."
        },
        {
          "stateId": "pago",
          "description": "Pagamento confirmado pela Stripe."
        },
        {
          "stateId": "cancelado",
          "description": "Pedido cancelado antes do pagamento."
        },
        {
          "stateId": "reembolsado",
          "description": "Pedido pago com reembolso confirmado."
        }
      ],
      "transitions": [
        {
          "from": "inicio",
          "to": "criado",
          "trigger": "criarPedido",
          "actor": "cliente",
          "conditions": [],
          "actions": [
            "pedido.status = \"criado\"",
            "pedido.createdAt = now()",
            "pedido.updatedAt = now()"
          ],
          "rulesApplied": [
            "rule-status-pedido",
            "rule-brl-localidade"
          ]
        },
        {
          "from": "criado",
          "to": "aguardandoPagamento",
          "trigger": "selecionarMetodoPagamento",
          "actor": "cliente",
          "conditions": [],
          "actions": [
            "pedido.status = \"aguardandoPagamento\"",
            "pedido.updatedAt = now()"
          ],
          "rulesApplied": [
            "rule-status-pedido",
            "rule-brl-localidade",
            "rule-confirmacao-stripe"
          ]
        },
        {
          "from": "aguardandoPagamento",
          "to": "pago",
          "trigger": "confirmarPagamentoStripe",
          "actor": "administrador",
          "conditions": [],
          "actions": [
            "pedido.status = \"pago\"",
            "pedido.paidAt = now()",
            "pedido.updatedAt = now()"
          ],
          "rulesApplied": [
            "rule-status-pedido",
            "rule-confirmacao-stripe",
            "rule-brl-localidade"
          ]
        },
        {
          "from": "criado",
          "to": "cancelado",
          "trigger": "atualizarStatusPedido",
          "actor": "administrador",
          "conditions": [
            "pedido.status = \"criado\""
          ],
          "actions": [
            "pedido.status = \"cancelado\"",
            "pedido.canceledAt = now()",
            "pedido.updatedAt = now()"
          ],
          "rulesApplied": [
            "rule-status-pedido",
            "rule-acesso-admin",
            "rule-brl-localidade"
          ]
        },
        {
          "from": "aguardandoPagamento",
          "to": "cancelado",
          "trigger": "atualizarStatusPedido",
          "actor": "administrador",
          "conditions": [
            "pedido.status = \"aguardandoPagamento\""
          ],
          "actions": [
            "pedido.status = \"cancelado\"",
            "pedido.canceledAt = now()",
            "pedido.updatedAt = now()"
          ],
          "rulesApplied": [
            "rule-status-pedido",
            "rule-acesso-admin",
            "rule-brl-localidade"
          ]
        },
        {
          "from": "pago",
          "to": "reembolsado",
          "trigger": "reembolsarPagamento",
          "actor": "administrador",
          "conditions": [
            "pedido.status = \"pago\""
          ],
          "actions": [
            "pedido.status = \"reembolsado\"",
            "pedido.refundedAt = now()",
            "pedido.updatedAt = now()"
          ],
          "rulesApplied": [
            "rule-status-pedido",
            "rule-confirmacao-stripe",
            "rule-acesso-admin",
            "rule-brl-localidade"
          ]
        }
      ],
      "requiredEntities": [
        "Pedido",
        "Pagamento",
        "TransacaoFinanceira",
        "ItemPedido"
      ],
      "persistenceRefs": [
        "pedido"
      ],
      "usecaseRefs": [
        "criarPedido",
        "confirmarPagamentoStripe",
        "atualizarStatusPedido",
        "reembolsarPagamento"
      ],
      "metricRefs": [
        "dailySalesMetrics"
      ],
      "userActions": [
        "iniciarCheckout",
        "selecionarMetodoPagamento",
        "confirmarPagamentoStripe",
        "atualizarStatusPedido",
        "reembolsarPagamento",
        "consultarMeusPedidos"
      ],
      "relatedPages": [
        "checkout",
        "meusPedidos",
        "adminPedidos",
        "adminFinanceiro"
      ],
      "relatedAgents": [],
      "relatedPlugins": [
        "stripePagamentos"
      ],
      "rulesApplied": [
        "rule-status-pedido",
        "rule-brl-localidade",
        "rule-confirmacao-stripe"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "sugPedidoWebhook",
          "title": "Transições automáticas via webhook Stripe",
          "priority": "now",
          "description": "Disparar a transição aguardandoPagamento → pago somente pelo webhook de confirmação Stripe para evitar inconsistências manuais.",
          "tradeoff": "A confirmação depende da disponibilidade do webhook e exige tratamento de idempotência."
        },
        {
          "suggestionId": "sugPedidoSemTarefas",
          "title": "Sem criação de tarefas no ciclo de vida do pedido",
          "priority": "now",
          "description": "Este workflow é de lifecycle e todas as transições são automatizadas ou operacionais; tarefas administrativas ficam nos workflows de confirmação, cancelamento ou conciliação.",
          "tradeoff": "Incidentes fora do fluxo exigirão workflows auxiliares para abrir tarefas manuais."
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/pedidoLifecycle.defs.ts",
      "exportName": "pedidoLifecycleDef",
      "saveAsDefs": true
    }
  }
} as const;

export default pedidoLifecycleDef;
