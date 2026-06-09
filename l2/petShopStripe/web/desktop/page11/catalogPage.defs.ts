/// <mls fileReference="_102030_/l2/petShopStripe/web/desktop/page11/catalogPage.defs.ts"  enhancement="_blank"/>
export const skill = `
## Pages spec
\`\`\`JSON
{"pageId":"catalogPage","pageName":"Catálogo","actor":"cliente","purpose":"Listar produtos e serviços disponíveis por categoria e filtros.","capabilities":["browseCatalog"],"flowRefs":{"experienceFlows":[],"entityLifecycles":[],"taskWorkflows":[],"automations":[]},"pluginRefs":[],"mdmRefs":["productService"],"pageInputs":[{"name":"categoria","type":"string","sources":["queryParam"],"description":"Filtro de categoria selecionada","entityRef":"CatalogCategory","fieldRef":"CatalogCategory.title"},{"name":"tipo","type":"string","sources":["queryParam"],"description":"Filtro de tipo (produto ou serviço)"},{"name":"precoMin","type":"number","sources":["queryParam"],"description":"Preço mínimo para filtro"},{"name":"precoMax","type":"number","sources":["queryParam"],"description":"Preço máximo para filtro"},{"name":"page","type":"number","sources":["queryParam"],"description":"Número da página para paginação"},{"name":"pageSize","type":"number","sources":["queryParam"],"description":"Tamanho da página para paginação"}],"navigationRefs":[{"direction":"inbound","pageId":"homePage","trigger":"Explorar catálogo"},{"direction":"outbound","pageId":"productServiceDetailPage","trigger":"Selecionar item"}],"sections":[{"sectionName":"Filtros e categorias","mode":"view","organisms":[{"organismName":"catalogFilters","purpose":"Permitir ao cliente filtrar o catálogo por categoria, tipo e faixa de preço.","userActions":["Selecionar categoria","Selecionar tipo","Definir faixa de preço","Aplicar filtros"],"requiredEntities":["CatalogCategory"],"readsFields":["CatalogCategory.title"],"writesFields":[],"rulesApplied":[]}]},{"sectionName":"Lista do catálogo","mode":"view","organisms":[{"organismName":"catalogList","purpose":"Exibir lista paginada de produtos e serviços disponíveis.","userActions":["Navegar páginas","Selecionar item"],"requiredEntities":["Product","Service","CatalogCategory"],"readsFields":["Product.productId","Product.title","Product.price","Product.status","Service.serviceId","Service.title","Service.price","Service.status","CatalogCategory.title"],"writesFields":[],"rulesApplied":[]}]}]}
\`\`\`

## Base Class
\`\`\`JSON
    [[(_102030_/l2/petShopStripe/web/shared/catalogPage.ts)]]
\`\`\`
`;
