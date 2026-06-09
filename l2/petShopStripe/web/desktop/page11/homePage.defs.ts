/// <mls fileReference="_102030_/l2/petShopStripe/web/desktop/page11/homePage.defs.ts"  enhancement="_blank"/>
export const skill = `
## Pages spec
\`\`\`JSON
{"pageId":"homePage","pageName":"Página inicial","actor":"cliente","purpose":"Apresentar o pet shop e destacar categorias e ofertas para entrada no catálogo.","capabilities":["browseCatalog"],"flowRefs":{"experienceFlows":[],"entityLifecycles":[],"taskWorkflows":[],"automations":[]},"pluginRefs":[],"mdmRefs":["productService"],"pageInputs":[],"navigationRefs":[{"direction":"outbound","pageId":"catalogPage","trigger":"Explorar catálogo","description":"Levar o cliente para a listagem completa do catálogo."}],"sections":[{"sectionName":"Vitrine de destaques","mode":"view","organisms":[{"organismName":"catalogHighlightsShowcase","purpose":"Exibir categorias, produtos e serviços em destaque com preço e disponibilidade.","userActions":["Selecionar categoria em destaque","Selecionar item em destaque"],"requiredEntities":["CatalogCategory","Product","Service"],"readsFields":["CatalogCategory.name","CatalogCategory.imageUrl","Product.productId","Product.name","Product.price","Product.availabilityStatus","Service.serviceId","Service.name","Service.price","Service.availabilityStatus"],"writesFields":[],"rulesApplied":[]}]},{"sectionName":"Chamada para catálogo","mode":"view","organisms":[{"organismName":"catalogExploreCallToAction","purpose":"Incentivar o usuário a explorar o catálogo completo.","userActions":["Explorar catálogo"],"requiredEntities":[],"readsFields":[],"writesFields":[],"rulesApplied":[]}]}]}
\`\`\`

## Base Class
\`\`\`JSON
    [[(_102030_/l2/petShopStripe/web/shared/homePage.ts)]]
\`\`\`
`;
