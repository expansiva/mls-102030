/// <mls fileReference="_102030_/l4/workflows/checkoutStripe.defs.ts" enhancement="_blank" />
export const checkoutStripeDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "checkoutStripe",
  "moduleName": "petShopBrasil",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 63,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "checkoutStripe",
      "title": "Checkout com Stripe",
      "purpose": "Fluxo de compra multi-etapa onde o cliente revisa o carrinho, informa dados, seleciona método de pagamento (cartão ou PIX) e gera o pedido com intenção de pagamento Stripe.",
      "executionMode": "taskWorkflow",
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
          "stateId": "cartReview",
          "description": "Cliente revisa itens do carrinho antes de avançar."
        },
        {
          "stateId": "buyerDetails",
          "description": "Cliente informa dados básicos do comprador para o pedido."
        },
        {
          "stateId": "paymentMethod",
          "description": "Cliente escolhe método de pagamento (cartão ou PIX)."
        },
        {
          "stateId": "orderCreated",
          "description": "Pedido criado a partir do carrinho com status inicial."
        },
        {
          "stateId": "paymentIntentCreated",
          "description": "Intenção de pagamento Stripe associada ao pedido."
        },
        {
          "stateId": "checkoutComplete",
          "description": "Checkout concluído com instruções de pagamento exibidas."
        },
        {
          "stateId": "checkoutCancelled",
          "description": "Checkout cancelado pelo cliente."
        }
      ],
      "transitions": [
        {
          "from": "cartReview",
          "to": "buyerDetails",
          "trigger": "proceedToCheckout",
          "actor": "cliente",
          "conditions": [
            "rule-brl-localidade"
          ],
          "actions": [],
          "rulesApplied": [
            "rule-brl-localidade"
          ]
        },
        {
          "from": "buyerDetails",
          "to": "orderCreated",
          "trigger": "iniciarCheckout",
          "actor": "cliente",
          "conditions": [
            "rule-status-pedido",
            "rule-brl-localidade"
          ],
          "actions": [
            "pedido.status=criado",
            "carrinho.status=convertido",
            "pedido.createdAt=now()"
          ],
          "rulesApplied": [
            "rule-status-pedido",
            "rule-brl-localidade"
          ]
        },
        {
          "from": "orderCreated",
          "to": "paymentMethod",
          "trigger": "openPaymentSelection",
          "actor": "cliente",
          "conditions": [
            "rule-metodos-stripe"
          ],
          "actions": [],
          "rulesApplied": [
            "rule-metodos-stripe"
          ]
        },
        {
          "from": "paymentMethod",
          "to": "paymentIntentCreated",
          "trigger": "selecionarMetodoPagamento",
          "actor": "cliente",
          "conditions": [
            "rule-metodos-stripe",
            "rule-brl-localidade"
          ],
          "actions": [
            "pedido.status=aguardandoPagamento",
            "pedido.stripePaymentIntentId=set"
          ],
          "rulesApplied": [
            "rule-metodos-stripe",
            "rule-brl-localidade",
            "rule-status-pedido"
          ]
        },
        {
          "from": "paymentIntentCreated",
          "to": "checkoutComplete",
          "trigger": "displayStripeInstructions",
          "actor": "cliente",
          "conditions": [],
          "actions": [],
          "rulesApplied": []
        },
        {
          "from": "cartReview",
          "to": "checkoutCancelled",
          "trigger": "cancelCheckout",
          "actor": "cliente",
          "conditions": [],
          "actions": [
            "carrinho.status=abandonado"
          ],
          "rulesApplied": []
        },
        {
          "from": "buyerDetails",
          "to": "checkoutCancelled",
          "trigger": "cancelCheckout",
          "actor": "cliente",
          "conditions": [],
          "actions": [
            "carrinho.status=abandonado"
          ],
          "rulesApplied": []
        },
        {
          "from": "paymentMethod",
          "to": "checkoutCancelled",
          "trigger": "cancelCheckout",
          "actor": "cliente",
          "conditions": [],
          "actions": [
            "pedido.status=cancelado",
            "pedido.canceledAt=now()"
          ],
          "rulesApplied": [
            "rule-status-pedido"
          ]
        },
        {
          "from": "orderCreated",
          "to": "checkoutCancelled",
          "trigger": "cancelCheckout",
          "actor": "cliente",
          "conditions": [],
          "actions": [
            "pedido.status=cancelado",
            "pedido.canceledAt=now()"
          ],
          "rulesApplied": [
            "rule-status-pedido"
          ]
        },
        {
          "from": "paymentIntentCreated",
          "to": "checkoutCancelled",
          "trigger": "cancelCheckout",
          "actor": "cliente",
          "conditions": [],
          "actions": [
            "pedido.status=cancelado",
            "pedido.canceledAt=now()"
          ],
          "rulesApplied": [
            "rule-status-pedido"
          ]
        }
      ],
      "requiredEntities": [
        "Carrinho",
        "Pedido",
        "Pagamento",
        "ItemPedido"
      ],
      "persistenceRefs": [
        "carrinho",
        "pedido"
      ],
      "usecaseRefs": [
        "iniciarCheckout",
        "selecionarMetodoPagamento"
      ],
      "metricRefs": [],
      "userActions": [
        "iniciarCheckout",
        "selecionarMetodoPagamento"
      ],
      "relatedPages": [
        "carrinho",
        "checkout"
      ],
      "relatedAgents": [],
      "relatedPlugins": [
        "stripePagamentos"
      ],
      "rulesApplied": [
        "rule-metodos-stripe",
        "rule-status-pedido",
        "rule-brl-localidade"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "sugCheckoutIdempotencia",
          "title": "Chave de idempotência no checkout",
          "priority": "now",
          "description": "Gerar e enviar chave de idempotência ao criar pedido e intenção de pagamento para evitar duplicações em recargas ou cliques repetidos.",
          "tradeoff": "Exige armazenamento temporário da chave e validação adicional no backend."
        },
        {
          "suggestionId": "sugCheckoutSemTarefa",
          "title": "Sem criação de tarefa no checkout",
          "priority": "now",
          "description": "Manter o checkout como fluxo do cliente sem tarefas administrativas; qualquer falha deve ser tratada por mensagens no checkout e re-tentativa do pagamento.",
          "tradeoff": "Menor rastreabilidade operacional no admin para problemas de checkout em tempo real."
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/checkoutStripe.defs.ts",
      "exportName": "checkoutStripeDef",
      "saveAsDefs": true
    }
  }
} as const;

export default checkoutStripeDef;
