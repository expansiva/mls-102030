/// <mls fileReference="_102030_/l1/petShopStripe/layer_1_external/serviceBooking.defs.ts" enhancement="_blank" />
export const serviceBookingTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "serviceBooking",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 45,
    "planId": "plan-table-definition:serviceBooking"
  },
  "data": {
    "tableDefinition": {
      "tableId": "serviceBooking",
      "tableName": "service_booking",
      "moduleId": "petShopStripe",
      "title": "Agendamento de serviço",
      "purpose": "Controlar reservas de data e horário para serviços do pet shop.",
      "ownership": "moduleOwned",
      "rootEntity": "ServiceBooking",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "columns": [
        {
          "name": "service_booking_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador do agendamento de serviço."
        },
        {
          "name": "service_id",
          "type": "uuid",
          "nullable": false,
          "description": "Serviço reservado no agendamento."
        },
        {
          "name": "customer_id",
          "type": "uuid",
          "nullable": false,
          "description": "Cliente que realizou o agendamento."
        },
        {
          "name": "pet_id",
          "type": "uuid",
          "nullable": true,
          "description": "Pet associado ao serviço."
        },
        {
          "name": "order_id",
          "type": "uuid",
          "nullable": true,
          "description": "Pedido associado ao agendamento."
        },
        {
          "name": "status",
          "type": "text",
          "nullable": false,
          "description": "Status do agendamento (ex.: pendente, confirmado, concluído, cancelado)."
        },
        {
          "name": "scheduled_date",
          "type": "date",
          "nullable": false,
          "description": "Data do agendamento."
        },
        {
          "name": "scheduled_start_time",
          "type": "time",
          "nullable": false,
          "description": "Horário de início do agendamento."
        },
        {
          "name": "scheduled_end_time",
          "type": "time",
          "nullable": true,
          "description": "Horário de término previsto do agendamento."
        },
        {
          "name": "timezone",
          "type": "text",
          "nullable": false,
          "description": "Fuso horário do agendamento."
        },
        {
          "name": "notes",
          "type": "text",
          "nullable": true,
          "description": "Observações do cliente ou do pet shop."
        },
        {
          "name": "created_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Data/hora de criação do agendamento."
        },
        {
          "name": "updated_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Data/hora da última atualização do agendamento."
        },
        {
          "name": "canceled_at",
          "type": "timestamptz",
          "nullable": true,
          "description": "Data/hora de cancelamento do agendamento."
        }
      ],
      "primaryKey": [
        "service_booking_id"
      ],
      "foreignRefs": [
        {
          "fieldName": "service_id",
          "targetEntity": "Service",
          "targetOwnership": "mdmOwned",
          "reason": "Serviço agendado."
        },
        {
          "fieldName": "customer_id",
          "targetEntity": "Customer",
          "targetOwnership": "mdmOwned",
          "reason": "Cliente responsável pelo agendamento."
        },
        {
          "fieldName": "pet_id",
          "targetEntity": "Pet",
          "targetOwnership": "mdmOwned",
          "reason": "Pet atendido no agendamento."
        },
        {
          "fieldName": "order_id",
          "targetEntity": "Order",
          "targetOwnership": "moduleOwned",
          "reason": "Vincular o agendamento ao pedido."
        }
      ],
      "indexes": [
        {
          "indexName": "idx_service_booking_customer",
          "columns": [
            "customer_id",
            "scheduled_date"
          ],
          "reason": "Listagem de agendamentos por cliente e data."
        },
        {
          "indexName": "idx_service_booking_pet",
          "columns": [
            "pet_id",
            "scheduled_date"
          ],
          "reason": "Consultas de agendamentos por pet."
        },
        {
          "indexName": "idx_service_booking_service_date",
          "columns": [
            "service_id",
            "scheduled_date"
          ],
          "reason": "Consulta de agendamentos por serviço e data."
        },
        {
          "indexName": "idx_service_booking_order",
          "columns": [
            "order_id"
          ],
          "reason": "Localizar agendamento pelo pedido."
        },
        {
          "indexName": "idx_service_booking_status_date",
          "columns": [
            "status",
            "scheduled_date"
          ],
          "reason": "Filtros de status e agenda."
        }
      ],
      "detailsColumn": {
        "enabled": false
      },
      "metricUpdatePolicy": {
        "feedsMetrics": true,
        "metricRefs": [],
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
        "ruleServiceBookingRequiresSlot"
      ]
    },
    "defsPlan": {
      "fileName": "tables/serviceBooking.defs.ts",
      "exportName": "serviceBookingTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default serviceBookingTableDefinition;
