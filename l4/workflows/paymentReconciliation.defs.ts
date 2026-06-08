/// <mls fileReference="_102030_/l4/workflows/paymentReconciliation.defs.ts" enhancement="_blank" />
export const paymentReconciliationDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "paymentReconciliation",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 75,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "paymentReconciliation",
      "title": "Conciliação de recebíveis",
      "purpose": "Registrar recebíveis a partir de pagamentos aprovados e conciliar transações Stripe com lançamentos financeiros do pet shop.",
      "executionMode": "taskWorkflow",
      "createsTask": true,
      "taskConfig": {
        "taskTitleTemplate": "Conciliar recebível do pedido {{orderNumber}}",
        "assigneeRules": [
          "ruleAssignAdminPetShopFinance"
        ],
        "slaRules": [
          "ruleSlaReconcilePayments48h"
        ],
        "taskRoomRequired": false
      },
      "actors": [
        "adminPetShop"
      ],
      "states": [
        {
          "stateId": "taskOpen",
          "description": "Tarefa de conciliação criada e aguardando início."
        },
        {
          "stateId": "taskInReview",
          "description": "Administrador revisando pagamentos Stripe e lançamentos financeiros."
        },
        {
          "stateId": "taskReconciled",
          "description": "Conciliação concluída e recebíveis registrados."
        },
        {
          "stateId": "taskNeedsAttention",
          "description": "Conciliação pendente por divergência ou dados incompletos."
        },
        {
          "stateId": "taskCanceled",
          "description": "Tarefa cancelada sem conciliação."
        }
      ],
      "transitions": [
        {
          "from": "taskOpen",
          "to": "taskInReview",
          "trigger": "startReview",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "ruleStripeTransactionLink"
          ]
        },
        {
          "from": "taskInReview",
          "to": "taskReconciled",
          "trigger": "confirmReconciliation",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "ruleReceivableFromPayment",
            "ruleStripeTransactionLink"
          ]
        },
        {
          "from": "taskInReview",
          "to": "taskNeedsAttention",
          "trigger": "markMismatch",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "ruleStripeTransactionLink"
          ]
        },
        {
          "from": "taskNeedsAttention",
          "to": "taskInReview",
          "trigger": "resumeReview",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [],
          "rulesApplied": [
            "ruleStripeTransactionLink"
          ]
        },
        {
          "from": "taskOpen",
          "to": "taskCanceled",
          "trigger": "cancelTask",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [],
          "rulesApplied": []
        },
        {
          "from": "taskInReview",
          "to": "taskCanceled",
          "trigger": "cancelTask",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [],
          "rulesApplied": []
        },
        {
          "from": "taskNeedsAttention",
          "to": "taskCanceled",
          "trigger": "cancelTask",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [],
          "rulesApplied": []
        }
      ],
      "requiredEntities": [
        "Payment",
        "StripeTransaction",
        "Receivable",
        "FinancialEntry",
        "Order"
      ],
      "persistenceRefs": [
        "order",
        "receivable",
        "financialEntry"
      ],
      "usecaseRefs": [
        "usecaseReconcilePayments"
      ],
      "metricRefs": [
        "salesOpsMetrics"
      ],
      "userActions": [
        "reconcilePayments"
      ],
      "relatedPages": [
        "adminFinancialPage"
      ],
      "relatedAgents": [],
      "relatedPlugins": [
        "stripePaymentsPlugin"
      ],
      "rulesApplied": [
        "ruleReceivableFromPayment",
        "ruleStripeTransactionLink"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "suggestStripePayoutAutoSync",
          "title": "Sincronizar payouts e extratos Stripe automaticamente",
          "priority": "soon",
          "description": "Manter recebíveis atualizados sem intervenção manual.",
          "tradeoff": "Requer integração assíncrona adicional e monitoramento de falhas."
        },
        {
          "suggestionId": "suggestReconciliationPendingAlert",
          "title": "Alertar administrador sobre transações pendentes de conciliação",
          "priority": "soon",
          "description": "Evitar atraso no fechamento financeiro e garantir rastreabilidade.",
          "tradeoff": "Pode gerar ruído se alertas não forem bem calibrados."
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/paymentReconciliation.defs.ts",
      "exportName": "paymentReconciliationDef",
      "saveAsDefs": true
    }
  }
} as const;

export default paymentReconciliationDef;
