/// <mls fileReference="_102030_/l4/workflows/catalogManagement.defs.ts" enhancement="_blank" />
export const catalogManagementDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "catalogManagement",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 76,
    "planId": ""
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "catalogManagement",
      "title": "Gestão de catálogo",
      "purpose": "Fluxo administrativo para criação, edição, ativação e desativação de produtos, serviços e categorias no catálogo do pet shop.",
      "executionMode": "entityLifecycle",
      "createsTask": false,
      "taskConfig": {
        "taskTitleTemplate": "",
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false
      },
      "actors": [
        "adminPetShop"
      ],
      "states": [
        {
          "stateId": "catalogNew",
          "description": "Item ainda não persistido no catálogo."
        },
        {
          "stateId": "catalogDraft",
          "description": "Item criado e em edição interna antes de disponibilizar ao público."
        },
        {
          "stateId": "catalogActive",
          "description": "Item disponível para venda no catálogo."
        },
        {
          "stateId": "catalogInactive",
          "description": "Item desativado e oculto do catálogo."
        }
      ],
      "transitions": [
        {
          "from": "catalogNew",
          "to": "catalogDraft",
          "trigger": "createCatalogItem",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [
            "gravar novo registro de Product",
            "gravar novo registro de Service",
            "gravar novo registro de CatalogCategory"
          ],
          "rulesApplied": []
        },
        {
          "from": "catalogDraft",
          "to": "catalogDraft",
          "trigger": "saveDraftChanges",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [
            "atualizar registro de Product",
            "atualizar registro de Service",
            "atualizar registro de CatalogCategory"
          ],
          "rulesApplied": []
        },
        {
          "from": "catalogDraft",
          "to": "catalogActive",
          "trigger": "publishCatalogItem",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [
            "definir item como ativo no catálogo"
          ],
          "rulesApplied": []
        },
        {
          "from": "catalogActive",
          "to": "catalogActive",
          "trigger": "updateActiveItem",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [
            "atualizar registro de Product",
            "atualizar registro de Service",
            "atualizar registro de CatalogCategory"
          ],
          "rulesApplied": []
        },
        {
          "from": "catalogActive",
          "to": "catalogInactive",
          "trigger": "deactivateCatalogItem",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [
            "definir item como inativo no catálogo"
          ],
          "rulesApplied": []
        },
        {
          "from": "catalogInactive",
          "to": "catalogActive",
          "trigger": "reactivateCatalogItem",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [
            "definir item como ativo no catálogo"
          ],
          "rulesApplied": []
        },
        {
          "from": "catalogInactive",
          "to": "catalogInactive",
          "trigger": "updateInactiveItem",
          "actor": "adminPetShop",
          "conditions": [],
          "actions": [
            "atualizar registro de Product",
            "atualizar registro de Service",
            "atualizar registro de CatalogCategory"
          ],
          "rulesApplied": []
        }
      ],
      "requiredEntities": [
        "Product",
        "Service",
        "CatalogCategory"
      ],
      "persistenceRefs": [
        "product",
        "service",
        "catalogCategory"
      ],
      "usecaseRefs": [
        "usecaseManageCatalog"
      ],
      "metricRefs": [],
      "userActions": [
        "manageCatalog"
      ],
      "relatedPages": [
        "adminCatalogPage"
      ],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [],
      "implementationSuggestions": [
        {
          "suggestionId": "suggestCatalogAuditLog",
          "title": "Manter histórico de alterações de preço e disponibilidade do catálogo",
          "priority": "soon",
          "description": "Registrar mudanças de catálogo para auditoria e rollback administrativo.",
          "tradeoff": "Aumenta volume de dados e exige telas de histórico."
        },
        {
          "suggestionId": "suggestBulkCatalogEdit",
          "title": "Suportar edição em lote de produtos e serviços",
          "priority": "later",
          "description": "Permitir alterações em massa para campanhas sazonais e promoções.",
          "tradeoff": "Complexidade maior na validação e possibilidade de erros em massa."
        },
        {
          "suggestionId": "suggestNoCatalogTasks",
          "title": "Operar gestão de catálogo sem criação automática de tarefas",
          "priority": "now",
          "description": "Manter o fluxo direto no painel administrativo, sem filas de tarefas.",
          "tradeoff": "Menos rastreio formal de responsáveis e SLAs internos."
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/catalogManagement.defs.ts",
      "exportName": "catalogManagementDef",
      "saveAsDefs": true
    }
  }
} as const;

export default catalogManagementDef;
