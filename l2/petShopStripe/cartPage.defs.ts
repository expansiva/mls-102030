/// <mls fileReference="_102030_/l2/petShopStripe/cartPage.defs.ts" enhancement="_blank" />
export const cartPagePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "cartPage",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 86,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "cartPage",
      "pageName": "Carrinho",
      "actor": "cliente",
      "purpose": "Revisar itens e quantidades antes do checkout.",
      "capabilities": [
        "manageCartCheckout"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "checkoutAndPayment"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [
        "customer",
        "productService"
      ],
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "productServiceDetailPage",
          "trigger": "Adicionar ao carrinho"
        },
        {
          "direction": "outbound",
          "pageId": "checkoutPage",
          "trigger": "Iniciar checkout"
        }
      ],
      "sections": [
        {
          "sectionName": "Itens do carrinho",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "listaItensCarrinho",
              "purpose": "Exibir itens do carrinho com quantidades e permitir ajustes ou remoções.",
              "userActions": [
                "Ajustar quantidade",
                "Remover item"
              ],
              "requiredEntities": [
                "Cart",
                "CartItem",
                "Product",
                "Service"
              ],
              "readsFields": [
                "Cart.items",
                "CartItem.quantity",
                "CartItem.unitPrice",
                "CartItem.totalPrice",
                "Product.name",
                "Service.name"
              ],
              "writesFields": [
                "CartItem.quantity"
              ],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Resumo e checkout",
          "mode": "view",
          "organisms": [
            {
              "organismName": "resumoTotais",
              "purpose": "Exibir subtotal, descontos e total do carrinho.",
              "userActions": [],
              "requiredEntities": [
                "Cart"
              ],
              "readsFields": [
                "Cart.subtotalAmount",
                "Cart.discountAmount",
                "Cart.totalAmount"
              ],
              "writesFields": [],
              "rulesApplied": []
            },
            {
              "organismName": "acaoIniciarCheckout",
              "purpose": "Confirmar itens e iniciar o checkout criando o pedido.",
              "userActions": [
                "Iniciar checkout"
              ],
              "requiredEntities": [
                "Cart",
                "Order",
                "OrderItem"
              ],
              "readsFields": [
                "Cart.totalAmount",
                "Cart.itemsCount"
              ],
              "writesFields": [
                "Order.status",
                "OrderItem"
              ],
              "rulesApplied": [
                "ruleOrderRequiresCustomer"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getCart",
        "purpose": "Carregar o carrinho ativo do cliente com itens e totais.",
        "kind": "query",
        "input": {
          "cartContext": {
            "cartId?": "string"
          },
          "include": {
            "items": "boolean",
            "totals": "boolean"
          }
        },
        "output": {
          "cart": {
            "cartId": "string",
            "status": "string",
            "currency": "string",
            "itemsCount": "number",
            "subtotalAmount": "number",
            "discountAmount": "number",
            "totalAmount": "number",
            "items": [
              {
                "itemId": "string",
                "productId?": "string",
                "serviceId?": "string",
                "name": "string",
                "quantity": "number",
                "unitPrice": "number",
                "totalPrice": "number"
              }
            ]
          }
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
        "commandName": "updateCart",
        "purpose": "Atualizar quantidade ou remover itens do carrinho.",
        "kind": "command",
        "input": {
          "cartContext": {
            "cartId?": "string"
          },
          "changes": {
            "items": [
              {
                "itemId?": "string",
                "productId?": "string",
                "serviceId?": "string",
                "quantity?": "number",
                "action": "updateQuantity|remove"
              }
            ]
          }
        },
        "output": {
          "cart": {
            "cartId": "string",
            "status": "string",
            "itemsCount": "number",
            "subtotalAmount": "number",
            "discountAmount": "number",
            "totalAmount": "number",
            "items": [
              {
                "itemId": "string",
                "productId?": "string",
                "serviceId?": "string",
                "name": "string",
                "quantity": "number",
                "unitPrice": "number",
                "totalPrice": "number"
              }
            ]
          }
        },
        "readsEntities": [
          "Cart",
          "CartItem"
        ],
        "writesEntities": [
          "Cart",
          "CartItem"
        ],
        "readsTables": [
          "cart"
        ],
        "writesTables": [
          "cart"
        ],
        "usecaseRefs": [
          "usecaseUpdateCart"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": []
      },
      {
        "commandName": "startCheckout",
        "purpose": "Criar pedido a partir do carrinho confirmado.",
        "kind": "command",
        "input": {
          "cartContext": {
            "cartId?": "string"
          },
          "deliveryContact?": {
            "phone?": "string",
            "email?": "string"
          },
          "deliveryAddress?": {
            "addressId?": "string",
            "street?": "string",
            "number?": "string",
            "city?": "string",
            "state?": "string",
            "postalCode?": "string"
          }
        },
        "output": {
          "order": {
            "orderId": "string",
            "status": "string",
            "paymentStatus": "string",
            "totalAmount": "number"
          },
          "cart": {
            "cartId": "string",
            "status": "string"
          }
        },
        "readsEntities": [
          "Cart",
          "CartItem"
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
      }
    ]
  }
} ;

export const materializeIndex = [
  {
    "id": "contract",
    "agent": "agentL2MaterializeContract",
    "defsPath": "_102030_/l1/petShopStripe/layer_2_controllers/cartPage.defs.ts",
    "skillPath": "_102020_/l2/agentMaterializeSolution/skills/genContract.ts",
    "moduleName": "petShopStripe",
    "outputPath": "_102030_/l2/petShopStripe/web/contracts/cartPage.ts",
    "dependsOn": [],
    "specUpdatedAt": "2026-06-09T17:37:17Z"
  },
  {
    "id": "shared",
    "agent": "agentL2MaterializeSharedPage",
    "defsPath": "_102030_/l2/petShopStripe/web/shared/cartPage.defs.ts",
    "moduleName": "petShopStripe",
    "outputPath": "cartPage.ts",
    "dependsOn": [
      "contract"
    ],
    "specUpdatedAt": "2026-06-09T17:37:17Z"
  },
  {
    "id": "page",
    "agent": "agentL2MaterializePageLit",
    "defsPath": "_102030_/l2/petShopStripe/web/desktop/page11/cartPage.defs.ts",
    "moduleName": "petShopStripe",
    "outputPath": "cartPage.ts",
    "dependsOn": [
      "contract",
      "shared"
    ],
    "specUpdatedAt": "2026-06-09T17:37:17Z"
  }
]
