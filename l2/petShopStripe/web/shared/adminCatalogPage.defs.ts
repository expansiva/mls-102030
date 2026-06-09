/// <mls fileReference="_102030_/l2/petShopStripe/web/shared/adminCatalogPage.defs.ts"  enhancement="_blank"/>
export const skill = `
## Pages spec
\`\`\`JSON
[{"commandName":"getCatalogAdminList","purpose":"Listar itens do catálogo para administração.","kind":"query","input":{"itemType":"string?","statusFilter":"string[]?","categoryId":"string?","searchText":"string?","page":"number?","pageSize":"number?"},"output":{"items":[{"itemId":"string","itemType":"string","name":"string","categoryId":"string?","categoryName":"string?","price":"number?","status":"string","updatedAt":"string"}],"pagination":{"page":"number","pageSize":"number","totalItems":"number","totalPages":"number"}},"readsEntities":["Product","Service","CatalogCategory"],"writesEntities":[],"readsTables":[],"writesTables":[],"usecaseRefs":["usecaseManageCatalog"],"layerContract":{"controllerLayer":"layer_2_controllers","mustCallLayer":"layer_3_usecases","directTableAccessForbidden":true},"rulesApplied":[]},{"commandName":"manageCatalog","purpose":"Criar, editar ou desativar itens do catálogo.","kind":"command","input":{"action":"string","itemType":"string","itemId":"string?","payload":{"name":"string?","description":"string?","price":"number?","duration":"number?","status":"string?","categoryId":"string?"}},"output":{"itemId":"string","itemType":"string","status":"string","updatedAt":"string"},"readsEntities":["Product","Service","CatalogCategory"],"writesEntities":["Product","Service","CatalogCategory"],"readsTables":[],"writesTables":[],"usecaseRefs":["usecaseManageCatalog"],"layerContract":{"controllerLayer":"layer_2_controllers","mustCallLayer":"layer_3_usecases","directTableAccessForbidden":true},"rulesApplied":[]}]
\`\`\`

## Contracts
\`\`\`JSON
    [[(_102030_/l2/petShopStripe/web/contracts/adminCatalogPage.ts)]]
\`\`\`
`;
