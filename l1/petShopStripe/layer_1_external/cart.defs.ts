export const cartTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "cart",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 41,
    "planId": "plan-table-definition:cart"
  },
  "data": {
    "tableDefinition": {
      "tableId": "cart",
      "tableName": "cart",
      "moduleId": "petShopStripe",
      "title": "Carrinho",
      "purpose": "Persistir o carrinho ativo do cliente para checkout.",
      "ownership": "moduleOwned",
      "rootEntity": "Cart",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "cart_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador do carrinho."
        },
        {
          "name": "customer_id",
          "type": "uuid",
          "nullable": false,
          "description": "Cliente dono do carrinho."
        },
        {
          "name": "status",
          "type": "text",
          "nullable": false,
          "description": "Status do carrinho (ativo, convertido, abandonado, expirado)."
        },
        {
          "name": "currency",
          "type": "text",
          "nullable": false,
          "description": "Moeda usada para preços do carrinho."
        },
        {
          "name": "items_count",
          "type": "int",
          "nullable": false,
          "default": 0,
          "description": "Quantidade total de itens no carrinho."
        },
        {
          "name": "subtotal_amount",
          "type": "decimal",
          "nullable": false,
          "default": 0,
          "description": "Subtotal do carrinho antes de descontos."
        },
        {
          "name": "discount_amount",
          "type": "decimal",
          "nullable": false,
          "default": 0,
          "description": "Desconto aplicado ao carrinho."
        },
        {
          "name": "total_amount",
          "type": "decimal",
          "nullable": false,
          "default": 0,
          "description": "Total do carrinho após descontos."
        },
        {
          "name": "created_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Data de criação do carrinho."
        },
        {
          "name": "updated_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Data da última atualização do carrinho."
        },
        {
          "name": "expires_at",
          "type": "timestamptz",
          "nullable": true,
          "description": "Data de expiração do carrinho."
        },
        {
          "name": "last_activity_at",
          "type": "timestamptz",
          "nullable": true,
          "description": "Última interação no carrinho."
        }
      ],
      "primaryKey": [
        "cart_id"
      ],
      "foreignRefs": [
        {
          "fieldName": "customer_id",
          "targetEntity": "Customer",
          "targetOwnership": "mdmOwned",
          "reason": "rule.persistence.excludeMdmEntities"
        }
      ],
      "indexes": [
        {
          "indexName": "idx_cart_customer_status",
          "columns": [
            "customer_id",
            "status"
          ],
          "reason": "rule.index.lookupByCustomerStatus"
        },
        {
          "indexName": "idx_cart_updated_at",
          "columns": [
            "updated_at"
          ],
          "reason": "rule.index.sortByRecentUpdate"
        },
        {
          "indexName": "idx_cart_expires_at",
          "columns": [
            "expires_at"
          ],
          "reason": "rule.index.expirationCleanup"
        }
      ],
      "detailsColumn": {
        "enabled": true,
        "columnName": "details",
        "jsonSchemaRef": "CartDetails",
        "reason": "rule.persistence.aggregateWithChildEntities"
      },
      "metricUpdatePolicy": {
        "feedsMetrics": false,
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
      "rulesApplied": []
    },
    "defsPlan": {
      "fileName": "tables/cart.defs.ts",
      "exportName": "cartTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default cartTableDefinition;
