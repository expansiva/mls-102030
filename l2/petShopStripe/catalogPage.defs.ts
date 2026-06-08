/// <mls fileReference="_102030_/l2/petShopStripe/catalogPage.defs.ts" enhancement="_blank" />
export const catalogPagePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "catalogPage",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 84,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "catalogPage",
      "pageName": "Catálogo",
      "actor": "cliente",
      "purpose": "Listar produtos e serviços disponíveis por categoria e filtros.",
      "capabilities": [
        "browseCatalog"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [
        "productService"
      ],
      "pageInputs": [
        {
          "name": "categoria",
          "type": "string",
          "sources": [
            "queryParam"
          ],
          "description": "Filtro de categoria selecionada",
          "entityRef": "CatalogCategory",
          "fieldRef": "CatalogCategory.title"
        },
        {
          "name": "tipo",
          "type": "string",
          "sources": [
            "queryParam"
          ],
          "description": "Filtro de tipo (produto ou serviço)"
        },
        {
          "name": "precoMin",
          "type": "number",
          "sources": [
            "queryParam"
          ],
          "description": "Preço mínimo para filtro"
        },
        {
          "name": "precoMax",
          "type": "number",
          "sources": [
            "queryParam"
          ],
          "description": "Preço máximo para filtro"
        },
        {
          "name": "page",
          "type": "number",
          "sources": [
            "queryParam"
          ],
          "description": "Número da página para paginação"
        },
        {
          "name": "pageSize",
          "type": "number",
          "sources": [
            "queryParam"
          ],
          "description": "Tamanho da página para paginação"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "homePage",
          "trigger": "Explorar catálogo"
        },
        {
          "direction": "outbound",
          "pageId": "productServiceDetailPage",
          "trigger": "Selecionar item"
        }
      ],
      "sections": [
        {
          "sectionName": "Filtros e categorias",
          "mode": "view",
          "organisms": [
            {
              "organismName": "catalogFilters",
              "purpose": "Permitir ao cliente filtrar o catálogo por categoria, tipo e faixa de preço.",
              "userActions": [
                "Selecionar categoria",
                "Selecionar tipo",
                "Definir faixa de preço",
                "Aplicar filtros"
              ],
              "requiredEntities": [
                "CatalogCategory"
              ],
              "readsFields": [
                "CatalogCategory.title"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Lista do catálogo",
          "mode": "view",
          "organisms": [
            {
              "organismName": "catalogList",
              "purpose": "Exibir lista paginada de produtos e serviços disponíveis.",
              "userActions": [
                "Navegar páginas",
                "Selecionar item"
              ],
              "requiredEntities": [
                "Product",
                "Service",
                "CatalogCategory"
              ],
              "readsFields": [
                "Product.productId",
                "Product.title",
                "Product.price",
                "Product.status",
                "Service.serviceId",
                "Service.title",
                "Service.price",
                "Service.status",
                "CatalogCategory.title"
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
        "commandName": "getCatalogList",
        "purpose": "Buscar lista paginada de produtos e serviços conforme filtros.",
        "kind": "query",
        "input": {
          "categoria": {
            "type": "string",
            "required": false
          },
          "tipo": {
            "type": "string",
            "required": false
          },
          "precoMin": {
            "type": "number",
            "required": false
          },
          "precoMax": {
            "type": "number",
            "required": false
          },
          "page": {
            "type": "number",
            "required": false
          },
          "pageSize": {
            "type": "number",
            "required": false
          }
        },
        "output": {
          "items": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "itemId": {
                  "type": "string"
                },
                "itemType": {
                  "type": "string",
                  "enum": [
                    "Product",
                    "Service"
                  ]
                },
                "title": {
                  "type": "string"
                },
                "summary": {
                  "type": "string"
                },
                "price": {
                  "type": "number"
                },
                "status": {
                  "type": "string"
                },
                "categoryTitle": {
                  "type": "string"
                }
              }
            }
          },
          "pagination": {
            "type": "object",
            "properties": {
              "page": {
                "type": "number"
              },
              "pageSize": {
                "type": "number"
              },
              "totalItems": {
                "type": "number"
              }
            }
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
        "usecaseRefs": [],
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

export default catalogPagePagePlan;
