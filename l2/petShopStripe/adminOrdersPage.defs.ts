/// <mls fileReference="_102030_/l2/petShopStripe/adminOrdersPage.defs.ts" enhancement="_blank" />
export const adminOrdersPagePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "adminOrdersPage",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 92,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "adminOrdersPage",
      "pageName": "Administração de pedidos/serviços",
      "actor": "adminPetShop",
      "purpose": "Gerenciar status de pedidos e acompanhar serviços agendados.",
      "capabilities": [
        "manageOrdersServices"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "orderLifecycleManagement"
        ],
        "taskWorkflows": [
          "serviceBooking"
        ],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [
        "organization",
        "customer"
      ],
      "pageInputs": [
        {
          "name": "statusFilter",
          "type": "string[]",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Filtro de status do pedido para a listagem."
        },
        {
          "name": "periodStart",
          "type": "date",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Data inicial do período para filtrar pedidos e serviços."
        },
        {
          "name": "periodEnd",
          "type": "date",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Data final do período para filtrar pedidos e serviços."
        },
        {
          "name": "orderNumber",
          "type": "string",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Número do pedido para busca rápida."
        },
        {
          "name": "orderId",
          "type": "uuid",
          "required": true,
          "sources": [
            "userSelection"
          ],
          "description": "Identificador do pedido selecionado para atualização de status.",
          "entityRef": "Order",
          "fieldRef": "order_id"
        },
        {
          "name": "serviceDate",
          "type": "date",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Data para filtrar agendamentos de serviços."
        },
        {
          "name": "serviceStatus",
          "type": "string",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Status do agendamento para filtragem."
        },
        {
          "name": "serviceId",
          "type": "uuid",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Serviço para filtrar agendamentos.",
          "entityRef": "Service",
          "fieldRef": "service_id"
        }
      ],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "adminDashboardPage",
          "trigger": "Voltar ao dashboard"
        }
      ],
      "sections": [
        {
          "sectionName": "Pedidos",
          "mode": "list",
          "organisms": [
            {
              "organismName": "orderFilters",
              "purpose": "Permitir filtrar pedidos por status, período e número do pedido.",
              "userActions": [
                "Aplicar filtros",
                "Limpar filtros"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.status",
                "Order.created_at",
                "Order.order_number"
              ],
              "writesFields": [],
              "rulesApplied": []
            },
            {
              "organismName": "orderList",
              "purpose": "Exibir lista de pedidos com status e pagamento para gestão administrativa.",
              "userActions": [
                "Selecionar pedido",
                "Atualizar status do pedido"
              ],
              "requiredEntities": [
                "Order"
              ],
              "readsFields": [
                "Order.order_id",
                "Order.order_number",
                "Order.status",
                "Order.payment_status",
                "Order.total_amount",
                "Order.created_at",
                "Order.updated_at"
              ],
              "writesFields": [
                "Order.status"
              ],
              "rulesApplied": [
                "ruleOrderStatusLifecycle"
              ]
            }
          ]
        },
        {
          "sectionName": "Agenda de serviços",
          "mode": "list",
          "organisms": [
            {
              "organismName": "serviceBookingFilters",
              "purpose": "Filtrar agendamentos por data, serviço e status.",
              "userActions": [
                "Aplicar filtros",
                "Limpar filtros"
              ],
              "requiredEntities": [
                "ServiceBooking",
                "Service"
              ],
              "readsFields": [
                "ServiceBooking.scheduled_date",
                "ServiceBooking.status",
                "Service.service_id"
              ],
              "writesFields": [],
              "rulesApplied": []
            },
            {
              "organismName": "serviceBookingList",
              "purpose": "Listar agendamentos de serviços com detalhes operacionais.",
              "userActions": [
                "Visualizar detalhes do agendamento"
              ],
              "requiredEntities": [
                "ServiceBooking",
                "Service",
                "Customer",
                "Pet"
              ],
              "readsFields": [
                "ServiceBooking.service_booking_id",
                "ServiceBooking.status",
                "ServiceBooking.scheduled_date",
                "ServiceBooking.scheduled_start_time",
                "ServiceBooking.scheduled_end_time",
                "ServiceBooking.order_id",
                "Service.service_id",
                "Service.title",
                "Customer.customer_id",
                "Customer.name",
                "Pet.pet_id",
                "Pet.name"
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
        "commandName": "getOrderAdminList",
        "purpose": "Listar pedidos por status e período.",
        "kind": "query",
        "input": {
          "statusFilter": "string[]?",
          "periodStart": "date?",
          "periodEnd": "date?",
          "orderNumber": "string?",
          "page": "number?",
          "pageSize": "number?"
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
              "updatedAt": "datetime"
            }
          ],
          "page": "number",
          "pageSize": "number",
          "total": "number"
        },
        "readsEntities": [
          "Order"
        ],
        "writesEntities": [],
        "readsTables": [
          "order"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "usecaseGetOrderAdminList"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": []
      },
      {
        "commandName": "updateOrderStatus",
        "purpose": "Atualizar o status do pedido conforme o ciclo de vida.",
        "kind": "command",
        "input": {
          "orderId": "uuid",
          "newStatus": "string",
          "statusReason": "string?"
        },
        "output": {
          "orderId": "uuid",
          "status": "string",
          "statusHistory": [
            {
              "fromStatus": "string",
              "toStatus": "string",
              "changedAt": "datetime",
              "changedBy": "string"
            }
          ],
          "updatedAt": "datetime"
        },
        "readsEntities": [
          "Order"
        ],
        "writesEntities": [
          "Order"
        ],
        "readsTables": [
          "order"
        ],
        "writesTables": [
          "order"
        ],
        "usecaseRefs": [
          "usecaseUpdateOrderStatus"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "ruleOrderStatusLifecycle"
        ]
      },
      {
        "commandName": "getServiceBookings",
        "purpose": "Listar agendamentos de serviços para gestão.",
        "kind": "query",
        "input": {
          "serviceDate": "date?",
          "serviceId": "uuid?",
          "status": "string?",
          "page": "number?",
          "pageSize": "number?"
        },
        "output": {
          "serviceBookings": [
            {
              "serviceBookingId": "uuid",
              "serviceId": "uuid",
              "serviceName": "string",
              "customerId": "uuid",
              "customerName": "string",
              "petId": "uuid",
              "petName": "string",
              "status": "string",
              "scheduledDate": "date",
              "scheduledStartTime": "time",
              "scheduledEndTime": "time",
              "orderId": "uuid?"
            }
          ],
          "page": "number",
          "pageSize": "number",
          "total": "number"
        },
        "readsEntities": [
          "ServiceBooking",
          "Service",
          "Customer",
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

export default adminOrdersPagePagePlan;
