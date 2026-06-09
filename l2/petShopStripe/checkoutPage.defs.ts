/// <mls fileReference="_102030_/l2/petShopStripe/checkoutPage.defs.ts" enhancement="_blank" />
export const checkoutPagePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "checkoutPage",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 87,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "checkoutPage",
      "pageName": "Checkout",
      "actor": "cliente",
      "purpose": "Coletar dados finais e confirmar pagamento via Stripe.",
      "capabilities": [
        "manageCartCheckout",
        "payWithStripe"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "checkoutAndPayment"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [
        "stripePaymentsPlugin"
      ],
      "mdmRefs": [
        "customer"
      ],
      "pageInputs": [
        {
          "name": "cartId",
          "type": "string",
          "required": true,
          "sources": [
            "previousStepResult",
            "routeParam"
          ],
          "description": "Identificador do carrinho confirmado para iniciar o checkout.",
          "entityRef": "Cart",
          "fieldRef": "cartId"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "cartPage",
          "trigger": "Iniciar checkout"
        },
        {
          "direction": "outbound",
          "pageId": "accountOrdersPage",
          "trigger": "Pagamento confirmado",
          "description": "Acompanhar pedido após confirmação do pagamento."
        }
      ],
      "sections": [
        {
          "sectionName": "Resumo do pedido",
          "mode": "view",
          "organisms": [
            {
              "organismName": "checkoutCartSummary",
              "purpose": "Exibir itens confirmados do carrinho e totais do pedido.",
              "userActions": [],
              "requiredEntities": [
                "Cart",
                "CartItem",
                "Product",
                "Service"
              ],
              "readsFields": [
                "cart.items",
                "cart.items.itemType",
                "cart.items.productId",
                "cart.items.serviceId",
                "cart.items.name",
                "cart.items.quantity",
                "cart.items.unitPrice",
                "cart.items.totalPrice",
                "cart.totals.subtotal",
                "cart.totals.discount",
                "cart.totals.shipping",
                "cart.totals.total",
                "cart.currency"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Dados de entrega e contato",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "deliveryContactForm",
              "purpose": "Coletar endereço de entrega e dados de contato do cliente.",
              "userActions": [
                "Informar endereço de entrega",
                "Informar dados de contato"
              ],
              "requiredEntities": [
                "Address",
                "Customer"
              ],
              "readsFields": [],
              "writesFields": [
                "order.deliveryAddress",
                "order.contact"
              ],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Pagamento Stripe",
          "mode": "action",
          "organisms": [
            {
              "organismName": "stripePaymentConfirmation",
              "purpose": "Confirmar criação do pedido e executar pagamento via Stripe.",
              "userActions": [
                "Confirmar dados do pedido",
                "Confirmar pagamento Stripe"
              ],
              "requiredEntities": [
                "Order",
                "Payment",
                "StripeTransaction"
              ],
              "readsFields": [
                "order.orderId",
                "order.orderNumber",
                "order.status",
                "order.paymentStatus",
                "order.totalAmount",
                "order.currency"
              ],
              "writesFields": [
                "order.status",
                "order.paymentStatus",
                "payment.status",
                "stripeTransaction.status"
              ],
              "rulesApplied": [
                "ruleOrderRequiresCustomer",
                "rulePaymentRequiredToConfirmOrder",
                "ruleStripeTransactionLink",
                "ruleMetricsUpdateOnOrderPaid"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getCheckoutCartSummary",
        "purpose": "Carregar resumo do carrinho confirmado para exibição no checkout.",
        "kind": "query",
        "input": {
          "cartId": "string"
        },
        "output": {
          "cartId": "string",
          "items": [
            {
              "itemId": "string",
              "itemType": "product|service",
              "productId": "string?",
              "serviceId": "string?",
              "name": "string",
              "quantity": "number",
              "unitPrice": "number",
              "totalPrice": "number"
            }
          ],
          "totals": {
            "subtotal": "number",
            "discount": "number",
            "shipping": "number",
            "total": "number"
          },
          "currency": "string"
        },
        "readsEntities": [
          "Cart",
          "CartItem",
          "Product",
          "Service"
        ],
        "writesEntities": [],
        "readsTables": [
          "cart"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "usecaseGetCart"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": []
      },
      {
        "commandName": "createOrderFromCheckout",
        "purpose": "Criar pedido com base no carrinho e dados de entrega/contato do cliente.",
        "kind": "command",
        "input": {
          "cartId": "string",
          "deliveryAddress": {
            "street": "string",
            "number": "string",
            "complement": "string?",
            "district": "string",
            "city": "string",
            "state": "string",
            "postalCode": "string",
            "country": "string"
          },
          "contact": {
            "name": "string",
            "email": "string",
            "phone": "string"
          }
        },
        "output": {
          "orderId": "string",
          "orderNumber": "string",
          "status": "string",
          "paymentStatus": "string",
          "orderSummary": {
            "items": [
              {
                "itemId": "string",
                "itemType": "product|service",
                "name": "string",
                "quantity": "number",
                "unitPrice": "number",
                "totalPrice": "number"
              }
            ],
            "totals": {
              "subtotal": "number",
              "discount": "number",
              "shipping": "number",
              "total": "number"
            },
            "currency": "string"
          }
        },
        "readsEntities": [
          "Cart",
          "Customer",
          "Address"
        ],
        "writesEntities": [
          "Order",
          "OrderItem",
          "Cart"
        ],
        "readsTables": [
          "cart"
        ],
        "writesTables": [
          "order",
          "cart"
        ],
        "usecaseRefs": [
          "usecaseCreateOrder"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "ruleOrderRequiresCustomer"
        ]
      },
      {
        "commandName": "confirmStripePayment",
        "purpose": "Confirmar pagamento via Stripe e atualizar status do pedido.",
        "kind": "command",
        "input": {
          "orderId": "string",
          "paymentIntentId": "string",
          "paymentMethod": "string",
          "confirmationData": {
            "clientSecret": "string?",
            "returnUrl": "string?"
          }
        },
        "output": {
          "paymentStatus": "string",
          "orderStatus": "string",
          "confirmation": {
            "orderId": "string",
            "receiptUrl": "string?",
            "paidAt": "string"
          }
        },
        "readsEntities": [
          "Order",
          "Payment",
          "StripeTransaction"
        ],
        "writesEntities": [
          "Payment",
          "StripeTransaction",
          "Order"
        ],
        "readsTables": [
          "order"
        ],
        "writesTables": [
          "order",
          "salesOpsMetrics"
        ],
        "usecaseRefs": [
          "usecaseConfirmStripePayment"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rulePaymentRequiredToConfirmOrder",
          "ruleStripeTransactionLink",
          "ruleMetricsUpdateOnOrderPaid"
        ]
      }
    ]
  }
} ;
