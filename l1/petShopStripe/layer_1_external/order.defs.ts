/// <mls fileReference="_102030_/l1/petShopStripe/layer_1_external/order.defs.ts" enhancement="_blank" />
export const orderTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "order",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 43,
    "planId": "plan-table-definition:order"
  },
  "data": {
    "tableDefinition": {
      "tableId": "order",
      "tableName": "order",
      "moduleId": "petShopStripe",
      "title": "Pedido",
      "purpose": "Registrar pedidos gerados no checkout e seu ciclo de vida.",
      "ownership": "moduleOwned",
      "rootEntity": "Order",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "order_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador do pedido."
        },
        {
          "name": "order_number",
          "type": "text",
          "nullable": false,
          "description": "Número legível do pedido para referência do cliente e admin."
        },
        {
          "name": "customer_id",
          "type": "uuid",
          "nullable": false,
          "description": "Cliente responsável pelo pedido."
        },
        {
          "name": "status",
          "type": "text",
          "nullable": false,
          "description": "Status do ciclo de vida do pedido."
        },
        {
          "name": "payment_status",
          "type": "text",
          "nullable": false,
          "description": "Status do pagamento associado ao pedido."
        },
        {
          "name": "payment_id",
          "type": "uuid",
          "nullable": true,
          "description": "Referência ao pagamento horizontal."
        },
        {
          "name": "currency",
          "type": "text",
          "nullable": false,
          "default": "BRL",
          "description": "Moeda do pedido."
        },
        {
          "name": "total_amount",
          "type": "numeric",
          "nullable": false,
          "description": "Valor total do pedido."
        },
        {
          "name": "discount_amount",
          "type": "numeric",
          "nullable": false,
          "default": 0,
          "description": "Total de descontos aplicados."
        },
        {
          "name": "shipping_amount",
          "type": "numeric",
          "nullable": false,
          "default": 0,
          "description": "Valor de entrega, quando aplicável."
        },
        {
          "name": "scheduled_service_at",
          "type": "timestamp",
          "nullable": true,
          "description": "Data e hora do serviço agendado, quando aplicável."
        },
        {
          "name": "created_at",
          "type": "timestamp",
          "nullable": false,
          "description": "Data de criação do pedido."
        },
        {
          "name": "updated_at",
          "type": "timestamp",
          "nullable": false,
          "description": "Última atualização do pedido."
        },
        {
          "name": "paid_at",
          "type": "timestamp",
          "nullable": true,
          "description": "Data/hora da confirmação de pagamento."
        },
        {
          "name": "canceled_at",
          "type": "timestamp",
          "nullable": true,
          "description": "Data/hora de cancelamento."
        }
      ],
      "primaryKey": [
        "order_id"
      ],
      "foreignRefs": [
        {
          "fieldName": "customer_id",
          "targetEntity": "Customer",
          "targetOwnership": "mdmOwned",
          "reason": "ruleOrderRequiresCustomer"
        },
        {
          "fieldName": "payment_id",
          "targetEntity": "Payment",
          "targetOwnership": "horizontalOwned",
          "reason": "rulePaymentRequiredToConfirmOrder"
        }
      ],
      "indexes": [
        {
          "indexName": "idx_order_customer_id_created_at",
          "columns": [
            "customer_id",
            "created_at"
          ],
          "unique": false,
          "reason": "Busca de pedidos do cliente por período."
        },
        {
          "indexName": "idx_order_status_created_at",
          "columns": [
            "status",
            "created_at"
          ],
          "unique": false,
          "reason": "Filtrar pedidos por status no admin."
        },
        {
          "indexName": "idx_order_paid_at",
          "columns": [
            "paid_at"
          ],
          "unique": false,
          "reason": "Apuração de métricas por data de pagamento."
        },
        {
          "indexName": "idx_order_scheduled_service_at",
          "columns": [
            "scheduled_service_at"
          ],
          "unique": false,
          "reason": "Agenda de serviços."
        },
        {
          "indexName": "idx_order_order_number",
          "columns": [
            "order_number"
          ],
          "unique": true,
          "reason": "Consulta rápida por número do pedido."
        }
      ],
      "detailsColumn": {
        "enabled": true,
        "columnName": "details",
        "jsonSchemaRef": "OrderDetails",
        "reason": "Armazenar itens do pedido e dados auxiliares do checkout."
      },
      "metricUpdatePolicy": {
        "feedsMetrics": true,
        "metricRefs": [
          "metricTableSalesOps"
        ],
        "updatedByLayer": "layer_3_usecases"
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
        "ruleOrderRequiresCustomer",
        "ruleOrderStatusLifecycle",
        "rulePaymentRequiredToConfirmOrder"
      ]
    },
    "defsPlan": {
      "fileName": "tables/order.defs.ts",
      "exportName": "orderTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default orderTableDefinition;
