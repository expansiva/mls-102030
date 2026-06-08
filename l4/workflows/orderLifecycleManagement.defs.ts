export const orderLifecycleManagementDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "orderLifecycleManagement",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 74,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "orderLifecycleManagement",
      "title": "Gestão do ciclo de vida do pedido",
      "purpose": "Acompanhar e atualizar os status dos pedidos e serviços agendados, da criação até a separação, conclusão ou cancelamento, com atualização de métricas.",
      "executionMode": "entityLifecycle",
      "createsTask": false,
      "taskConfig": {
        "taskTitleTemplate": "",
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false
      },
      "actors": [
        "adminPetShop"
      ],
      "states": [
        {
          "stateId": "created",
          "description": "Pedido criado e aguardando confirmação administrativa inicial."
        },
        {
          "stateId": "awaitingPayment",
          "description": "Pedido aguardando confirmação de pagamento."
        },
        {
          "stateId": "paid",
          "description": "Pedido pago e pronto para separação."
        },
        {
          "stateId": "inSeparation",
          "description": "Pedido em separação/preparação."
        },
        {
          "stateId": "completed",
          "description": "Pedido concluído e entregue/serviço finalizado."
        },
        {
          "stateId": "canceled",
          "description": "Pedido cancelado."
        }
      ],
      "transitions": [
        {
          "from": "created",
          "to": "awaitingPayment",
          "trigger": "markAwaitingPayment",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [
            "order.status=aguardandoPagamento",
            "order.updated_at=now"
          ],
          "rulesApplied": [
            "ruleOrderStatusLifecycle"
          ]
        },
        {
          "from": "awaitingPayment",
          "to": "paid",
          "trigger": "markPaid",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [
            "order.status=pago",
            "order.payment_status=pago",
            "order.paid_at=now",
            "order.updated_at=now"
          ],
          "rulesApplied": [
            "ruleOrderStatusLifecycle",
            "ruleMetricsUpdateOnOrderPaid"
          ]
        },
        {
          "from": "paid",
          "to": "inSeparation",
          "trigger": "startSeparation",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [
            "order.status=emSeparacao",
            "order.updated_at=now"
          ],
          "rulesApplied": [
            "ruleOrderStatusLifecycle"
          ]
        },
        {
          "from": "inSeparation",
          "to": "completed",
          "trigger": "completeOrder",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [
            "order.status=concluido",
            "order.updated_at=now"
          ],
          "rulesApplied": [
            "ruleOrderStatusLifecycle"
          ]
        },
        {
          "from": "awaitingPayment",
          "to": "canceled",
          "trigger": "cancelOrder",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [
            "order.status=cancelado",
            "order.canceled_at=now",
            "order.updated_at=now"
          ],
          "rulesApplied": [
            "ruleOrderStatusLifecycle"
          ]
        },
        {
          "from": "paid",
          "to": "canceled",
          "trigger": "cancelPaidOrder",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [
            "order.status=cancelado",
            "order.canceled_at=now",
            "order.updated_at=now"
          ],
          "rulesApplied": [
            "ruleOrderStatusLifecycle"
          ]
        }
      ],
      "requiredEntities": [
        "Order",
        "OrderItem",
        "ServiceBooking"
      ],
      "persistenceRefs": [
        "order",
        "serviceBooking"
      ],
      "usecaseRefs": [
        "usecaseUpdateOrderStatus"
      ],
      "metricRefs": [
        "salesOpsMetrics"
      ],
      "userActions": [
        "updateOrderStatus"
      ],
      "relatedPages": [
        "adminOrdersPage",
        "adminDashboardPage",
        "adminMetricsPage"
      ],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "ruleOrderStatusLifecycle",
        "ruleMetricsUpdateOnOrderPaid"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "suggestStatusTransitionValidation",
          "title": "Validar transições de status do pedido exclusivamente no backend",
          "priority": "now",
          "description": "Centralizar a validação no caso de uso de atualização de status para impedir mudanças inválidas no ciclo de vida.",
          "tradeoff": "Pode reduzir flexibilidade em ajustes manuais fora do fluxo padrão."
        },
        {
          "suggestionId": "suggestServiceFulfillmentTask",
          "title": "Criar tarefa de cumprimento para serviços agendados na agenda da equipe",
          "priority": "soon",
          "description": "Adicionar workflow de tarefas para execução de banho/tosa quando o pedido tiver agendamento.",
          "tradeoff": "Exige modelagem de tarefas e integrações adicionais com a agenda da equipe."
        },
        {
          "suggestionId": "suggestNoTasksInLifecycle",
          "title": "Manter o fluxo sem criação automática de tarefas",
          "priority": "now",
          "description": "Como o workflow é de entityLifecycle, concentrar a operação na atualização de status via casos de uso, sem gerar tarefas dedicadas.",
          "tradeoff": "A equipe pode precisar de controles adicionais fora do sistema para lembrar etapas operacionais."
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/orderLifecycleManagement.defs.ts",
      "exportName": "orderLifecycleManagementDef",
      "saveAsDefs": true
    }
  }
} as const;

export default orderLifecycleManagementDef;
