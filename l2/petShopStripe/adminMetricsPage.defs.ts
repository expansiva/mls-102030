/// <mls fileReference="_102030_/l2/petShopStripe/adminMetricsPage.defs.ts" enhancement="_blank" />
export const adminMetricsPagePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "adminMetricsPage",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 94,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "adminMetricsPage",
      "pageName": "Métricas",
      "actor": "adminPetShop",
      "purpose": "Exibir métricas de vendas e pagamentos em dashboard administrativo.",
      "capabilities": [
        "metricsDashboard"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [
        "organization"
      ],
      "pageInputs": [
        {
          "name": "dateRange",
          "type": "DateRange",
          "required": false,
          "sources": [
            "query",
            "uiState"
          ],
          "description": "Intervalo de datas para consulta das métricas."
        },
        {
          "name": "filterDimensions",
          "type": "MetricsFilterDimensions",
          "required": false,
          "sources": [
            "query",
            "uiState"
          ],
          "description": "Dimensões de filtro (status do pedido, status do pagamento, tipo de item)."
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "adminDashboardPage",
          "trigger": "Acessar métricas"
        }
      ],
      "sections": [
        {
          "sectionName": "Filtros de métricas",
          "mode": "filter",
          "organisms": [
            {
              "organismName": "metricsFilters",
              "purpose": "Selecionar período e dimensões de filtro para atualizar o dashboard.",
              "userActions": [
                "Definir intervalo de datas",
                "Selecionar status do pedido",
                "Selecionar status do pagamento",
                "Selecionar tipo de item",
                "Aplicar filtros"
              ],
              "requiredEntities": [
                "salesOpsMetrics"
              ],
              "readsFields": [
                "event_time",
                "order_status",
                "payment_status",
                "item_type"
              ],
              "writesFields": [],
              "rulesApplied": [
                "ruleMetricsUpdateOnOrderPaid"
              ]
            }
          ]
        },
        {
          "sectionName": "Dashboard de métricas",
          "mode": "view",
          "organisms": [
            {
              "organismName": "metricsCharts",
              "purpose": "Exibir séries temporais e agregações de receita, pedidos e pagamentos.",
              "userActions": [
                "Visualizar gráficos",
                "Inspecionar métricas por período"
              ],
              "requiredEntities": [
                "salesOpsMetrics"
              ],
              "readsFields": [
                "event_time",
                "order_total",
                "order_count",
                "approved_count",
                "canceled_count",
                "order_status",
                "payment_status",
                "item_type"
              ],
              "writesFields": [],
              "rulesApplied": [
                "ruleMetricsUpdateOnOrderPaid"
              ]
            },
            {
              "organismName": "metricsSummaryCards",
              "purpose": "Apresentar totais e indicadores resumidos do período selecionado.",
              "userActions": [
                "Visualizar indicadores",
                "Comparar totais"
              ],
              "requiredEntities": [
                "salesOpsMetrics"
              ],
              "readsFields": [
                "order_total",
                "order_count",
                "approved_count",
                "canceled_count"
              ],
              "writesFields": [],
              "rulesApplied": [
                "ruleMetricsUpdateOnOrderPaid"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getMetricsDashboard",
        "purpose": "Obter séries temporais e agregações para o dashboard.",
        "kind": "query",
        "input": {
          "dateRange": {
            "from": "date",
            "to": "date"
          },
          "filters": {
            "orderStatus": [
              "string"
            ],
            "paymentStatus": [
              "string"
            ],
            "itemType": [
              "string"
            ]
          },
          "granularity": "hour|day|week|month"
        },
        "output": {
          "series": {
            "revenue": [
              {
                "timestamp": "timestamptz",
                "value": "number"
              }
            ],
            "orders": [
              {
                "timestamp": "timestamptz",
                "value": "number"
              }
            ],
            "averageTicket": [
              {
                "timestamp": "timestamptz",
                "value": "number"
              }
            ],
            "approvalRate": [
              {
                "timestamp": "timestamptz",
                "value": "number"
              }
            ],
            "canceledOrders": [
              {
                "timestamp": "timestamptz",
                "value": "number"
              }
            ]
          },
          "aggregations": {
            "totalRevenue": "number",
            "orderCount": "number",
            "averageTicket": "number",
            "approvedPayments": "number",
            "canceledOrders": "number"
          },
          "dimensions": {
            "orderStatus": [
              "string"
            ],
            "paymentStatus": [
              "string"
            ],
            "itemType": [
              "string"
            ]
          }
        },
        "readsEntities": [
          "salesOpsMetricsAggregate"
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
} ;

export const materializeIndex = [
  {
    "id": "contract",
    "agent": "agentL2MaterializeContract",
    "defsPath": "_102030_/l1/petShopStripe/layer_2_controllers/adminMetricsPage.defs.ts",
    "skillPath": "_102020_/l2/agentMaterializeSolution/skills/genContract.ts",
    "moduleName": "petShopStripe",
    "outputPath": "_102030_/l2/petShopStripe/web/contracts/adminMetricsPage.ts",
    "dependsOn": [],
    "specUpdatedAt": "2026-06-09T10:54:03Z"
  },
  {
    "id": "shared",
    "agent": "agentL2MaterializeSharedPage",
    "defsPath": "_102030_/l2/petShopStripe/web/shared/adminMetricsPage.defs.ts",
    "moduleName": "petShopStripe",
    "outputPath": "adminMetricsPage.ts",
    "dependsOn": [
      "contract"
    ],
    "specUpdatedAt": "2026-06-09T10:54:03Z"
  },
  {
    "id": "page",
    "agent": "agentL2MaterializePageLit",
    "defsPath": "_102030_/l2/petShopStripe/web/desktop/page11/adminMetricsPage.defs.ts",
    "moduleName": "petShopStripe",
    "outputPath": "adminMetricsPage.ts",
    "dependsOn": [
      "contract",
      "shared"
    ],
    "specUpdatedAt": "2026-06-09T10:54:03Z"
  }
]
