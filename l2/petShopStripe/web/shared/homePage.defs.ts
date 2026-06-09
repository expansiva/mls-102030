/// <mls fileReference="_102030_/l2/petShopStripe/web/shared/homePage.defs.ts"  enhancement="_blank"/>
export const skill = `
## Pages spec
\`\`\`JSON
[{"commandName":"getCatalogHighlights","purpose":"Carregar categorias, produtos e serviços em destaque para a vitrine.","kind":"query","input":{"highlightLimits":{"type":"object","required":false,"fields":{"categories":{"type":"number"},"products":{"type":"number"},"services":{"type":"number"}}},"filters":{"type":"object","required":false,"fields":{"categoryIds":{"type":"string[]"},"availabilityStatus":{"type":"string"},"priceRange":{"type":"object","fields":{"min":{"type":"number"},"max":{"type":"number"}}}}}},"output":{"categories":{"type":"array","items":{"categoryId":"string","name":"string","imageUrl":"string"}},"items":{"type":"array","items":{"itemType":"string","itemId":"string","name":"string","price":{"amount":"number","currency":"string"},"availabilityStatus":"string","categoryIds":"string[]","imageUrl":"string"}}},"readsEntities":["CatalogCategory","Product","Service"],"writesEntities":[],"readsTables":[],"writesTables":[],"usecaseRefs":[],"layerContract":{"controllerLayer":"layer_2_controllers","mustCallLayer":"layer_3_usecases","directTableAccessForbidden":true},"rulesApplied":[]}]
\`\`\`

## Contracts
\`\`\`JSON
    [[(_102030_/l2/petShopStripe/web/contracts/homePage.ts)]]
\`\`\`
`;
