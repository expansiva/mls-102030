/// <mls fileReference="_102030_/l2/petShopStripe/web/shared/accountOrdersPage.defs.ts"  enhancement="_blank"/>
export const skill = `
## Pages spec
\`\`\`JSON
[{"commandName":"getOrderHistory","purpose":"Listar pedidos do cliente com status e itens.","kind":"query","input":{"customerId":"uuid","filters":{"orderStatus":"string?","startDate":"date?","endDate":"date?"}},"output":{"orders":[{"orderId":"uuid","orderNumber":"string","status":"string","paymentStatus":"string","totalAmount":"number","createdAt":"datetime","items":[{"itemType":"product|service","itemId":"uuid","name":"string","quantity":"number","unitPrice":"number"}]}]},"readsEntities":["Order","OrderItem","Payment"],"writesEntities":[],"readsTables":["order"],"writesTables":[],"usecaseRefs":["usecaseGetOrderHistory"],"layerContract":{"controllerLayer":"layer_2_controllers","mustCallLayer":"layer_3_usecases","directTableAccessForbidden":true},"rulesApplied":[]},{"commandName":"getCustomerServiceBookings","purpose":"Listar agendamentos de serviços do cliente com status e dados do pet.","kind":"query","input":{"customerId":"uuid","filters":{"bookingStatus":"string?","startDate":"date?","endDate":"date?"}},"output":{"bookings":[{"serviceBookingId":"uuid","status":"string","scheduledDate":"date","scheduledStartTime":"time","scheduledEndTime":"time?","timezone":"string","service":{"serviceId":"uuid","name":"string"},"pet":{"petId":"uuid","name":"string"}}]},"readsEntities":["ServiceBooking","Service","Pet"],"writesEntities":[],"readsTables":["serviceBooking"],"writesTables":[],"usecaseRefs":["usecaseGetServiceBookings"],"layerContract":{"controllerLayer":"layer_2_controllers","mustCallLayer":"layer_3_usecases","directTableAccessForbidden":true},"rulesApplied":[]}]
\`\`\`

## Contracts
\`\`\`JSON
    [[(_102030_/l2/petShopStripe/web/contracts/accountOrdersPage.ts)]]
\`\`\`
`;
