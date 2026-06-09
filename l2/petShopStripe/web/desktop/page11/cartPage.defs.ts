/// <mls fileReference="_102030_/l2/petShopStripe/web/desktop/page11/cartPage.defs.ts"  enhancement="_blank"/>
export const skill = `
## Pages spec
\`\`\`JSON
{"pageId":"cartPage","pageName":"Carrinho","actor":"cliente","purpose":"Revisar itens e quantidades antes do checkout.","capabilities":["manageCartCheckout"],"flowRefs":{"experienceFlows":[],"entityLifecycles":["checkoutAndPayment"],"taskWorkflows":[],"automations":[]},"pluginRefs":[],"mdmRefs":["customer","productService"],"pageInputs":[],"navigationRefs":[{"direction":"inbound","pageId":"productServiceDetailPage","trigger":"Adicionar ao carrinho"},{"direction":"outbound","pageId":"checkoutPage","trigger":"Iniciar checkout"}],"sections":[{"sectionName":"Itens do carrinho","mode":"edit","organisms":[{"organismName":"listaItensCarrinho","purpose":"Exibir itens do carrinho com quantidades e permitir ajustes ou remoções.","userActions":["Ajustar quantidade","Remover item"],"requiredEntities":["Cart","CartItem","Product","Service"],"readsFields":["Cart.items","CartItem.quantity","CartItem.unitPrice","CartItem.totalPrice","Product.name","Service.name"],"writesFields":["CartItem.quantity"],"rulesApplied":[]}]},{"sectionName":"Resumo e checkout","mode":"view","organisms":[{"organismName":"resumoTotais","purpose":"Exibir subtotal, descontos e total do carrinho.","userActions":[],"requiredEntities":["Cart"],"readsFields":["Cart.subtotalAmount","Cart.discountAmount","Cart.totalAmount"],"writesFields":[],"rulesApplied":[]},{"organismName":"acaoIniciarCheckout","purpose":"Confirmar itens e iniciar o checkout criando o pedido.","userActions":["Iniciar checkout"],"requiredEntities":["Cart","Order","OrderItem"],"readsFields":["Cart.totalAmount","Cart.itemsCount"],"writesFields":["Order.status","OrderItem"],"rulesApplied":["ruleOrderRequiresCustomer"]}]}]}
\`\`\`

## Base Class
\`\`\`JSON
    [[(_102030_/l2/petShopStripe/web/shared/cartPage.ts)]]
\`\`\`
`;
