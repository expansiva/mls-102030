/// <mls fileReference="_102030_/l1/petShopStripe/layer_2_controllers/adminMetricsPage.defs.ts"  enhancement="_blank"/>
export const skill = `
## Pages spec
\`\`\`JSON
[{"commandName":"getMetricsDashboard","purpose":"Obter s\u00e9ries temporais e agrega\u00e7\u00f5es para o dashboard.","kind":"query","input":{"dateRange":{"from":"date","to":"date"},"filters":{"orderStatus":["string"],"paymentStatus":["string"],"itemType":["string"]},"granularity":"hour|day|week|month"},"output":{"series":{"revenue":[{"timestamp":"timestamptz","value":"number"}],"orders":[{"timestamp":"timestamptz","value":"number"}],"averageTicket":[{"timestamp":"timestamptz","value":"number"}],"approvalRate":[{"timestamp":"timestamptz","value":"number"}],"canceledOrders":[{"timestamp":"timestamptz","value":"number"}]},"aggregations":{"totalRevenue":"number","orderCount":"number","averageTicket":"number","approvedPayments":"number","canceledOrders":"number"},"dimensions":{"orderStatus":["string"],"paymentStatus":["string"],"itemType":["string"]}},"readsEntities":["salesOpsMetricsAggregate"],"writesEntities":[],"readsTables":["salesOpsMetrics"],"writesTables":[],"usecaseRefs":["usecaseGetMetricsDashboard"],"layerContract":{"controllerLayer":"layer_2_controllers","mustCallLayer":"layer_3_usecases","directTableAccessForbidden":true},"rulesApplied":[]}]
\`\`\`
`;
