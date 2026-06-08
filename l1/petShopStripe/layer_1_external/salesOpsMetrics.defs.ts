/// <mls fileReference="_102030_/l1/petShopStripe/layer_1_external/salesOpsMetrics.defs.ts" enhancement="_blank" />
export const salesOpsMetricsMetricTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "metricTable",
  "artifactId": "salesOpsMetrics",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMetricTableDefinition",
    "stepId": 53,
    "planId": "plan-metric-table-definition:salesOpsMetrics"
  },
  "data": {
    "metricTableDefinition": {
      "metricTableId": "salesOpsMetrics",
      "tableName": "sales_ops_metrics",
      "moduleId": "petShopStripe",
      "title": "Métricas de vendas e pagamentos",
      "purpose": "Agregar dados de pedidos e pagamentos para análise de receita, ticket médio, volume de pedidos e taxa de aprovação.",
      "tableKind": "metricTimeseries",
      "storageEngine": "postgresTimescaleDB",
      "layer": "layer_1_external",
      "timeColumn": "event_time",
      "columns": [
        {
          "name": "event_time",
          "type": "timestamptz",
          "nullable": false,
          "description": "Data/hora do evento agregado."
        },
        {
          "name": "order_status",
          "type": "text",
          "nullable": true,
          "description": "Status do pedido no momento do evento."
        },
        {
          "name": "payment_status",
          "type": "text",
          "nullable": true,
          "description": "Status do pagamento associado."
        },
        {
          "name": "item_type",
          "type": "text",
          "nullable": true,
          "description": "Tipo do item vendido (produto ou serviço)."
        },
        {
          "name": "order_total",
          "type": "numeric",
          "nullable": false,
          "default": 0,
          "description": "Valor total dos pedidos."
        },
        {
          "name": "order_count",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Quantidade de pedidos."
        },
        {
          "name": "approved_count",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Quantidade de pagamentos aprovados."
        },
        {
          "name": "canceled_count",
          "type": "integer",
          "nullable": false,
          "default": 0,
          "description": "Quantidade de pedidos cancelados."
        }
      ],
      "dimensions": [
        {
          "dimensionId": "orderStatus",
          "column": "order_status",
          "type": "text",
          "description": "Status do pedido no momento do evento"
        },
        {
          "dimensionId": "paymentStatus",
          "column": "payment_status",
          "type": "text",
          "description": "Status do pagamento associado"
        },
        {
          "dimensionId": "itemType",
          "column": "item_type",
          "type": "text",
          "description": "Tipo do item vendido (produto ou serviço)"
        }
      ],
      "measures": [
        {
          "measureId": "totalRevenue",
          "column": "order_total",
          "aggregation": "sum",
          "unit": "BRL",
          "description": "Valor total dos pedidos"
        },
        {
          "measureId": "orderCount",
          "column": "order_count",
          "aggregation": "sum",
          "unit": "count",
          "description": "Quantidade de pedidos"
        },
        {
          "measureId": "averageTicket",
          "column": "order_total",
          "aggregation": "avg",
          "unit": "BRL",
          "description": "Ticket médio dos pedidos"
        },
        {
          "measureId": "approvedPayments",
          "column": "approved_count",
          "aggregation": "sum",
          "unit": "count",
          "description": "Quantidade de pagamentos aprovados"
        },
        {
          "measureId": "canceledOrders",
          "column": "canceled_count",
          "aggregation": "sum",
          "unit": "count",
          "description": "Quantidade de pedidos cancelados"
        }
      ],
      "sourceWriteEvents": [
        "orderCreated",
        "orderPaid",
        "orderCanceled",
        "serviceBookingCreated",
        "serviceBookingConfirmed"
      ],
      "hypertable": {
        "timeColumn": "event_time",
        "chunkTimeInterval": "7 days",
        "retentionPolicy": "90 days",
        "compressionPolicy": "30 days",
        "indexes": [
          {
            "indexName": "idx_sales_ops_metrics_event_time",
            "columns": [
              "event_time"
            ],
            "purpose": "Consulta temporal de métricas."
          },
          {
            "indexName": "idx_sales_ops_metrics_order_status_time",
            "columns": [
              "order_status",
              "event_time"
            ],
            "purpose": "Filtrar métricas por status do pedido e período."
          },
          {
            "indexName": "idx_sales_ops_metrics_payment_status_time",
            "columns": [
              "payment_status",
              "event_time"
            ],
            "purpose": "Filtrar métricas por status do pagamento e período."
          },
          {
            "indexName": "idx_sales_ops_metrics_item_type_time",
            "columns": [
              "item_type",
              "event_time"
            ],
            "purpose": "Filtrar métricas por tipo de item e período."
          }
        ]
      },
      "updatePolicy": {
        "updatedByLayer": "layer_3_usecases",
        "pagesMayUpdate": false,
        "controllersMayUpdate": false,
        "usecaseRefs": [
          "usecaseUpdateMetricsOnOrderPaid"
        ]
      },
      "accessPolicy": {
        "directAccessAllowedFor": [
          "layer_3_usecases"
        ],
        "forbiddenFor": [
          "pages",
          "layer_2_controllers",
          "agents"
        ]
      },
      "rulesApplied": [
        "ruleMetricsUpdateOnOrderPaid"
      ]
    },
    "defsPlan": {
      "fileName": "tables/salesOpsMetrics.defs.ts",
      "exportName": "salesOpsMetricsMetricTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default salesOpsMetricsMetricTableDefinition;
