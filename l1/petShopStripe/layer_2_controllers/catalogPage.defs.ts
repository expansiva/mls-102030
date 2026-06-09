/// <mls fileReference="_102030_/l1/petShopStripe/layer_2_controllers/catalogPage.defs.ts"  enhancement="_blank"/>
export const skill = `
## Pages spec
\`\`\`JSON
[{"commandName":"getCatalogList","purpose":"Buscar lista paginada de produtos e serviços conforme filtros.","kind":"query","input":{"categoria":{"type":"string","required":false},"tipo":{"type":"string","required":false},"precoMin":{"type":"number","required":false},"precoMax":{"type":"number","required":false},"page":{"type":"number","required":false},"pageSize":{"type":"number","required":false}},"output":{"items":{"type":"array","items":{"type":"object","properties":{"itemId":{"type":"string"},"itemType":{"type":"string","enum":["Product","Service"]},"title":{"type":"string"},"summary":{"type":"string"},"price":{"type":"number"},"status":{"type":"string"},"categoryTitle":{"type":"string"}}}},"pagination":{"type":"object","properties":{"page":{"type":"number"},"pageSize":{"type":"number"},"totalItems":{"type":"number"}}}},"readsEntities":["Product","Service","CatalogCategory"],"writesEntities":[],"readsTables":[],"writesTables":[],"usecaseRefs":[],"layerContract":{"controllerLayer":"layer_2_controllers","mustCallLayer":"layer_3_usecases","directTableAccessForbidden":true},"rulesApplied":[]}]
\`\`\`
`;
