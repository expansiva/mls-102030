/// <mls fileReference="_102030_/l2/petShopStripe/homePage.defs.ts" enhancement="_blank" />
export const homePagePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "homePage",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 83,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "homePage",
      "pageName": "Página inicial",
      "actor": "cliente",
      "purpose": "Apresentar o pet shop e destacar categorias e ofertas para entrada no catálogo.",
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
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "catalogPage",
          "trigger": "Explorar catálogo",
          "description": "Levar o cliente para a listagem completa do catálogo."
        }
      ],
      "sections": [
        {
          "sectionName": "Vitrine de destaques",
          "mode": "view",
          "organisms": [
            {
              "organismName": "catalogHighlightsShowcase",
              "purpose": "Exibir categorias, produtos e serviços em destaque com preço e disponibilidade.",
              "userActions": [
                "Selecionar categoria em destaque",
                "Selecionar item em destaque"
              ],
              "requiredEntities": [
                "CatalogCategory",
                "Product",
                "Service"
              ],
              "readsFields": [
                "CatalogCategory.name",
                "CatalogCategory.imageUrl",
                "Product.productId",
                "Product.name",
                "Product.price",
                "Product.availabilityStatus",
                "Service.serviceId",
                "Service.name",
                "Service.price",
                "Service.availabilityStatus"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Chamada para catálogo",
          "mode": "view",
          "organisms": [
            {
              "organismName": "catalogExploreCallToAction",
              "purpose": "Incentivar o usuário a explorar o catálogo completo.",
              "userActions": [
                "Explorar catálogo"
              ],
              "requiredEntities": [],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getCatalogHighlights",
        "purpose": "Carregar categorias, produtos e serviços em destaque para a vitrine.",
        "kind": "query",
        "input": {
          "highlightLimits": {
            "type": "object",
            "required": false,
            "fields": {
              "categories": {
                "type": "number"
              },
              "products": {
                "type": "number"
              },
              "services": {
                "type": "number"
              }
            }
          },
          "filters": {
            "type": "object",
            "required": false,
            "fields": {
              "categoryIds": {
                "type": "string[]"
              },
              "availabilityStatus": {
                "type": "string"
              },
              "priceRange": {
                "type": "object",
                "fields": {
                  "min": {
                    "type": "number"
                  },
                  "max": {
                    "type": "number"
                  }
                }
              }
            }
          }
        },
        "output": {
          "categories": {
            "type": "array",
            "items": {
              "categoryId": "string",
              "name": "string",
              "imageUrl": "string"
            }
          },
          "items": {
            "type": "array",
            "items": {
              "itemType": "string",
              "itemId": "string",
              "name": "string",
              "price": {
                "amount": "number",
                "currency": "string"
              },
              "availabilityStatus": "string",
              "categoryIds": "string[]",
              "imageUrl": "string"
            }
          }
        },
        "readsEntities": [
          "CatalogCategory",
          "Product",
          "Service"
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
} ;
