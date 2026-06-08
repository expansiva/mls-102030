/// <mls fileReference="_102030_/l2/petShopStripe/adminCatalogPage.defs.ts" enhancement="_blank" />
export const adminCatalogPagePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "adminCatalogPage",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 91,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "adminCatalogPage",
      "pageName": "Administração de catálogo",
      "actor": "adminPetShop",
      "purpose": "Cadastrar, editar e desativar produtos, serviços e categorias.",
      "capabilities": [
        "manageCatalog"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "catalogManagement"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [
        "productService",
        "organization"
      ],
      "pageInputs": [
        {
          "name": "itemType",
          "type": "string",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Tipo de item a administrar (produto, serviço ou categoria)."
        },
        {
          "name": "statusFilter",
          "type": "string[]",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Filtro de status para itens do catálogo."
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
          "sectionName": "Filtros e lista de catálogo",
          "mode": "view",
          "organisms": [
            {
              "organismName": "CatalogFilters",
              "purpose": "Definir filtros de tipo, status e categoria para a lista administrativa.",
              "userActions": [
                "Aplicar filtros",
                "Limpar filtros"
              ],
              "requiredEntities": [
                "Product",
                "Service",
                "CatalogCategory"
              ],
              "readsFields": [
                "Product.status",
                "Product.categoryId",
                "Service.status",
                "Service.categoryId",
                "CatalogCategory.id",
                "CatalogCategory.name"
              ],
              "writesFields": [],
              "rulesApplied": []
            },
            {
              "organismName": "CatalogAdminList",
              "purpose": "Exibir lista de itens do catálogo com status e ações rápidas.",
              "userActions": [
                "Selecionar item",
                "Iniciar criação de item",
                "Ativar/desativar item"
              ],
              "requiredEntities": [
                "Product",
                "Service",
                "CatalogCategory"
              ],
              "readsFields": [
                "Product.id",
                "Product.name",
                "Product.price",
                "Product.status",
                "Service.id",
                "Service.name",
                "Service.price",
                "Service.status",
                "CatalogCategory.id",
                "CatalogCategory.name",
                "CatalogCategory.status"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Editor de item de catálogo",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "CatalogItemForm",
              "purpose": "Cadastrar ou editar dados do item selecionado do catálogo.",
              "userActions": [
                "Salvar item",
                "Atualizar item",
                "Desativar item"
              ],
              "requiredEntities": [
                "Product",
                "Service",
                "CatalogCategory"
              ],
              "readsFields": [
                "Product.id",
                "Product.name",
                "Product.description",
                "Product.price",
                "Product.status",
                "Product.categoryId",
                "Service.id",
                "Service.name",
                "Service.description",
                "Service.price",
                "Service.duration",
                "Service.status",
                "Service.categoryId",
                "CatalogCategory.id",
                "CatalogCategory.name",
                "CatalogCategory.status"
              ],
              "writesFields": [
                "Product.name",
                "Product.description",
                "Product.price",
                "Product.status",
                "Product.categoryId",
                "Service.name",
                "Service.description",
                "Service.price",
                "Service.duration",
                "Service.status",
                "Service.categoryId",
                "CatalogCategory.name",
                "CatalogCategory.status"
              ],
              "rulesApplied": []
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getCatalogAdminList",
        "purpose": "Listar itens do catálogo para administração.",
        "kind": "query",
        "input": {
          "itemType": "string?",
          "statusFilter": "string[]?",
          "categoryId": "string?",
          "searchText": "string?",
          "page": "number?",
          "pageSize": "number?"
        },
        "output": {
          "items": [
            {
              "itemId": "string",
              "itemType": "string",
              "name": "string",
              "categoryId": "string?",
              "categoryName": "string?",
              "price": "number?",
              "status": "string",
              "updatedAt": "string"
            }
          ],
          "pagination": {
            "page": "number",
            "pageSize": "number",
            "totalItems": "number",
            "totalPages": "number"
          }
        },
        "readsEntities": [
          "Product",
          "Service",
          "CatalogCategory"
        ],
        "writesEntities": [],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "usecaseManageCatalog"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": []
      },
      {
        "commandName": "manageCatalog",
        "purpose": "Criar, editar ou desativar itens do catálogo.",
        "kind": "command",
        "input": {
          "action": "string",
          "itemType": "string",
          "itemId": "string?",
          "payload": {
            "name": "string?",
            "description": "string?",
            "price": "number?",
            "duration": "number?",
            "status": "string?",
            "categoryId": "string?"
          }
        },
        "output": {
          "itemId": "string",
          "itemType": "string",
          "status": "string",
          "updatedAt": "string"
        },
        "readsEntities": [
          "Product",
          "Service",
          "CatalogCategory"
        ],
        "writesEntities": [
          "Product",
          "Service",
          "CatalogCategory"
        ],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "usecaseManageCatalog"
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

export default adminCatalogPagePagePlan;
