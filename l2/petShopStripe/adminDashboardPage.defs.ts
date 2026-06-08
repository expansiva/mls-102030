/// <mls fileReference="_102030_/l2/petShopStripe/adminDashboardPage.defs.ts" enhancement="_blank" />
export const adminDashboardPagePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "adminDashboardPage",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 90,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "adminDashboardPage",
      "pageName": "Dashboard administrativo",
      "actor": "adminPetShop",
      "purpose": "Fornecer visão geral de pedidos, agenda e indicadores rápidos.",
      "capabilities": [
        "manageOrdersServices",
        "financialOverview",
        "metricsDashboard"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "orderLifecycleManagement"
        ],
        "taskWorkflows": [
          "serviceBooking",
          "paymentReconciliation"
        ],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [
        "organization"
      ],
      "pageInputs": [
        {
          "name": "dateRange",
          "type": "dateRange",
          "required": false,
          "sources": [
            "queryParam",
            "userSelection"
          ],
          "description": "Intervalo de datas para filtrar KPIs, pedidos e agenda."
        }
      ],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "adminOrdersPage",
          "trigger": "Gerenciar pedidos"
        },
        {
          "direction": "outbound",
          "pageId": "adminFinancialPage",
          "trigger": "Ver financeiro"
        },
        {
          "direction": "outbound",
          "pageId": "adminMetricsPage",
          "trigger": "Ver métricas"
        }
      ],
      "sections": [
        {
          "sectionName": "Resumo operacional",
          "mode": "view",
          "organisms": [
            {
              "organismName": "kpiSummaryCards",
              "purpose": "Exibir KPIs de pedidos e agenda no período.",
              "userActions": [
                "Ver resumo operacional"
              ],
              "requiredEntities": [
                "Order",
                "ServiceBooking"
              ],
              "readsFields": [
                "Order.status",
                "Order.payment_status",
                "Order.total_amount",
                "Order.created_at",
                "ServiceBooking.status",
                "ServiceBooking.scheduled_date"
              ],
              "writesFields": [],
              "rulesApplied": []
            },
            {
              "organismName": "operationalQueues",
              "purpose": "Mostrar filas de pedidos por status e próximos agendamentos.",
              "userActions": [
                "Ver resumo operacional",
                "Acessar gestão de pedidos"
              ],
              "requiredEntities": [
                "Order",
                "ServiceBooking"
              ],
              "readsFields": [
                "Order.order_number",
                "Order.status",
                "Order.payment_status",
                "Order.total_amount",
                "Order.created_at",
                "ServiceBooking.service_id",
                "ServiceBooking.status",
                "ServiceBooking.scheduled_date",
                "ServiceBooking.scheduled_start_time"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Indicadores rápidos",
          "mode": "view",
          "organisms": [
            {
              "organismName": "metricsSummaryWidget",
              "purpose": "Apresentar resumo das métricas de vendas e pagamentos.",
              "userActions": [
                "Acessar métricas"
              ],
              "requiredEntities": [
                "salesOpsMetrics"
              ],
              "readsFields": [
                "salesOpsMetrics.totalRevenue",
                "salesOpsMetrics.orderCount",
                "salesOpsMetrics.approvedPayments",
                "salesOpsMetrics.canceledOrders"
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
        "commandName": "getAdminOverview",
        "purpose": "Carregar KPIs resumidos e filas operacionais.",
        "kind": "query",
        "input": {
          "dateFrom": "string",
          "dateTo": "string"
        },
        "output": {
          "orderCountsByStatus": [
            {
              "status": "string",
              "count": "number"
            }
          ],
          "paymentStatusCounts": [
            {
              "status": "string",
              "count": "number"
            }
          ],
          "recentOrders": [
            {
              "orderId": "string",
              "orderNumber": "string",
              "status": "string",
              "paymentStatus": "string",
              "totalAmount": "number",
              "createdAt": "string"
            }
          ],
          "upcomingBookings": [
            {
              "serviceBookingId": "string",
              "serviceId": "string",
              "status": "string",
              "scheduledDate": "string",
              "scheduledStartTime": "string"
            }
          ]
        },
        "readsEntities": [
          "Order",
          "ServiceBooking"
        ],
        "writesEntities": [],
        "readsTables": [
          "order",
          "serviceBooking"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "usecaseGetOrderAdminList",
          "usecaseGetServiceBookings"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": []
      },
      {
        "commandName": "getMetricsSummary",
        "purpose": "Obter resumo das métricas de vendas para o painel.",
        "kind": "query",
        "input": {
          "dateFrom": "string",
          "dateTo": "string"
        },
        "output": {
          "totalRevenue": "number",
          "orderCount": "number",
          "approvedPayments": "number",
          "canceledOrders": "number",
          "averageTicket": "number"
        },
        "readsEntities": [
          "salesOpsMetrics"
        ],
        "writesEntities": [],
        "readsTables": [
          "salesOpsMetrics"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "usecaseGetMetricsDashboard"
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

export default adminDashboardPagePagePlan;
