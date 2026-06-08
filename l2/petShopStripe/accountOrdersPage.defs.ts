/// <mls fileReference="_102030_/l2/petShopStripe/accountOrdersPage.defs.ts" enhancement="_blank" />
export const accountOrdersPagePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "accountOrdersPage",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 89,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "accountOrdersPage",
      "pageName": "Minha conta e pedidos",
      "actor": "cliente",
      "purpose": "Acompanhar histórico de compras, serviços e status de pedidos.",
      "capabilities": [
        "manageCartCheckout",
        "bookService"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [],
        "taskWorkflows": [
          "serviceBooking"
        ],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [
        "customer"
      ],
      "pageInputs": [
        {
          "name": "orderStatus",
          "type": "string",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Filtro opcional de status do pedido."
        },
        {
          "name": "bookingStatus",
          "type": "string",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Filtro opcional de status do agendamento."
        },
        {
          "name": "startDate",
          "type": "date",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Data inicial para filtrar histórico."
        },
        {
          "name": "endDate",
          "type": "date",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Data final para filtrar histórico."
        }
      ],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "productServiceDetailPage",
          "trigger": "Repetir compra ou agendar serviço"
        }
      ],
      "sections": [
        {
          "sectionName": "filtrosDeHistorico",
          "mode": "interactive",
          "organisms": [
            {
              "organismName": "orderAndBookingFilters",
              "purpose": "Permitir filtrar pedidos e agendamentos por período e status.",
              "userActions": [
                "Aplicar filtros",
                "Limpar filtros"
              ],
              "requiredEntities": [],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "historicoDePedidos",
          "mode": "read",
          "organisms": [
            {
              "organismName": "orderHistoryList",
              "purpose": "Listar pedidos do cliente com itens, valores e status de pagamento/entrega.",
              "userActions": [
                "Visualizar pedido",
                "Repetir compra"
              ],
              "requiredEntities": [
                "Order",
                "OrderItem",
                "Payment"
              ],
              "readsFields": [
                "Order.order_id",
                "Order.order_number",
                "Order.status",
                "Order.payment_status",
                "Order.total_amount",
                "Order.created_at",
                "OrderItem",
                "Payment.status"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "agendamentosDeServicos",
          "mode": "read",
          "organisms": [
            {
              "organismName": "serviceBookingList",
              "purpose": "Exibir agendamentos do cliente com data/hora, pet e status.",
              "userActions": [
                "Ver detalhes do agendamento",
                "Agendar novamente"
              ],
              "requiredEntities": [
                "ServiceBooking",
                "Service",
                "Pet"
              ],
              "readsFields": [
                "ServiceBooking.service_booking_id",
                "ServiceBooking.status",
                "ServiceBooking.scheduled_date",
                "ServiceBooking.scheduled_start_time",
                "ServiceBooking.scheduled_end_time",
                "ServiceBooking.timezone",
                "Service",
                "Pet"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getOrderHistory",
        "purpose": "Listar pedidos do cliente com status e itens.",
        "kind": "query",
        "input": {
          "customerId": "uuid",
          "filters": {
            "orderStatus": "string?",
            "startDate": "date?",
            "endDate": "date?"
          }
        },
        "output": {
          "orders": [
            {
              "orderId": "uuid",
              "orderNumber": "string",
              "status": "string",
              "paymentStatus": "string",
              "totalAmount": "number",
              "createdAt": "datetime",
              "items": [
                {
                  "itemType": "product|service",
                  "itemId": "uuid",
                  "name": "string",
                  "quantity": "number",
                  "unitPrice": "number"
                }
              ]
            }
          ]
        },
        "readsEntities": [
          "Order",
          "OrderItem",
          "Payment"
        ],
        "writesEntities": [],
        "readsTables": [
          "order"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "usecaseGetOrderHistory"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": []
      },
      {
        "commandName": "getCustomerServiceBookings",
        "purpose": "Listar agendamentos de serviços do cliente com status e dados do pet.",
        "kind": "query",
        "input": {
          "customerId": "uuid",
          "filters": {
            "bookingStatus": "string?",
            "startDate": "date?",
            "endDate": "date?"
          }
        },
        "output": {
          "bookings": [
            {
              "serviceBookingId": "uuid",
              "status": "string",
              "scheduledDate": "date",
              "scheduledStartTime": "time",
              "scheduledEndTime": "time?",
              "timezone": "string",
              "service": {
                "serviceId": "uuid",
                "name": "string"
              },
              "pet": {
                "petId": "uuid",
                "name": "string"
              }
            }
          ]
        },
        "readsEntities": [
          "ServiceBooking",
          "Service",
          "Pet"
        ],
        "writesEntities": [],
        "readsTables": [
          "serviceBooking"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "usecaseGetServiceBookings"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": []
      }
    ]
  }
} as const;

export default accountOrdersPagePagePlan;
