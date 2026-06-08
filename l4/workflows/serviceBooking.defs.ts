export const serviceBookingDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "serviceBooking",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 73,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "serviceBooking",
      "title": "Agendamento de serviço",
      "purpose": "Permitir ao cliente selecionar data e horário disponíveis para serviços como banho e tosa, vinculando o agendamento ao pedido e gerando entrada na agenda administrativa.",
      "executionMode": "taskWorkflow",
      "createsTask": true,
      "taskConfig": {
        "taskTitleTemplate": "Confirmar agendamento de serviço {{service_booking_id}}",
        "assigneeRules": [
          "assignToRole:adminPetShop"
        ],
        "slaRules": [
          "sla:confirmBooking24h"
        ],
        "taskRoomRequired": false
      },
      "actors": [
        "cliente",
        "adminPetShop"
      ],
      "states": [
        {
          "stateId": "notScheduled",
          "description": "Cliente ainda não solicitou agendamento para o serviço."
        },
        {
          "stateId": "bookingPending",
          "description": "Agendamento criado e aguardando confirmação administrativa."
        },
        {
          "stateId": "bookingConfirmed",
          "description": "Agendamento confirmado e reservado na agenda."
        },
        {
          "stateId": "bookingCanceled",
          "description": "Agendamento cancelado pelo cliente ou admin."
        }
      ],
      "transitions": [
        {
          "from": "notScheduled",
          "to": "bookingPending",
          "trigger": "scheduleService",
          "actor": "cliente",
          "conditions": [
            "ruleServiceBookingRequiresSlot"
          ],
          "actions": [
            "ServiceBooking.status=pendente",
            "ServiceBooking.service_id=selectedServiceId",
            "ServiceBooking.customer_id=currentCustomerId",
            "ServiceBooking.pet_id=selectedPetId",
            "ServiceBooking.order_id=orderId",
            "ServiceBooking.scheduled_date=selectedDate",
            "ServiceBooking.scheduled_start_time=selectedStartTime",
            "ServiceBooking.scheduled_end_time=selectedEndTime",
            "ServiceBooking.timezone=selectedTimezone",
            "ServiceBooking.created_at=now",
            "ServiceBooking.updated_at=now",
            "Order.scheduled_service_at=selectedDateTime",
            "Order.updated_at=now"
          ],
          "rulesApplied": [
            "ruleServiceBookingRequiresSlot"
          ]
        },
        {
          "from": "bookingPending",
          "to": "bookingConfirmed",
          "trigger": "confirmBooking",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [
            "ServiceBooking.status=confirmado",
            "ServiceBooking.updated_at=now"
          ],
          "rulesApplied": []
        },
        {
          "from": "bookingPending",
          "to": "bookingCanceled",
          "trigger": "cancelBooking",
          "actor": "cliente",
          "conditions": [],
          "actions": [
            "ServiceBooking.status=cancelado",
            "ServiceBooking.canceled_at=now",
            "ServiceBooking.updated_at=now"
          ],
          "rulesApplied": []
        },
        {
          "from": "bookingConfirmed",
          "to": "bookingCanceled",
          "trigger": "cancelBooking",
          "actor": "cliente",
          "conditions": [],
          "actions": [
            "ServiceBooking.status=cancelado",
            "ServiceBooking.canceled_at=now",
            "ServiceBooking.updated_at=now"
          ],
          "rulesApplied": []
        }
      ],
      "requiredEntities": [
        "ServiceBooking",
        "Service",
        "Pet",
        "Order"
      ],
      "persistenceRefs": [
        "serviceBooking",
        "order"
      ],
      "usecaseRefs": [
        "usecaseScheduleService"
      ],
      "metricRefs": [
        "salesOpsMetrics"
      ],
      "userActions": [
        "scheduleService"
      ],
      "relatedPages": [
        "productServiceDetailPage",
        "accountOrdersPage",
        "adminOrdersPage",
        "adminDashboardPage"
      ],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "ruleServiceBookingRequiresSlot"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "suggestRealTimeSlotCheck",
          "title": "Verificar disponibilidade de horários em tempo real durante a seleção",
          "priority": "now",
          "description": "Consultar disponibilidade antes de confirmar o agendamento para evitar conflito de agenda.",
          "tradeoff": "Aumenta complexidade de consultas e requer cache/lock de slots."
        },
        {
          "suggestionId": "suggestBookingReminderNotification",
          "title": "Enviar lembrete automático de agendamento ao cliente",
          "priority": "soon",
          "description": "Disparar notificações antes do horário agendado para reduzir no-show.",
          "tradeoff": "Depende de integração com módulo de notificações."
        },
        {
          "suggestionId": "suggestAdminTaskSlaMonitor",
          "title": "Monitorar SLA de confirmação de agendamento",
          "priority": "soon",
          "description": "Criar alertas quando tarefas de confirmação ultrapassarem 24h.",
          "tradeoff": "Exige configuração de alertas e acompanhamento operacional."
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/serviceBooking.defs.ts",
      "exportName": "serviceBookingDef",
      "saveAsDefs": true
    }
  }
} as const;

export default serviceBookingDef;
