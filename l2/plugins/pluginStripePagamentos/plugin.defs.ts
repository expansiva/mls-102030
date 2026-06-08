export const pluginStripePagamentosPluginPlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "pluginDraft",
  "artifactId": "pluginStripePagamentos",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPlugins",
    "stepId": 36,
    "planId": "plan-index-critic:pluginPlan:1"
  },
  "data": {
    "plugin": {
      "pluginId": "pluginStripePagamentos",
      "provider": "Plugin Stripe Pagamentos",
      "priority": "now",
      "reason": "Pagamento online é requisito do MVP com checkout via Stripe no Brasil.",
      "events": [
        "checkout.payment_created",
        "checkout.payment_confirmed",
        "checkout.payment_failed",
        "payout.reconciled"
      ],
      "requiredCredentials": [],
      "inputData": [
        "pedido",
        "valor",
        "moeda",
        "metodoPagamento",
        "dadosCliente"
      ],
      "outputData": [
        "paymentIntentId",
        "statusPagamento",
        "taxas",
        "recebiveis"
      ],
      "webhooks": [
        "payment_intent.succeeded",
        "payment_intent.payment_failed",
        "charge.refunded",
        "payout.paid"
      ],
      "risks": [
        "Dependência de configuração correta de métodos de pagamento brasileiros (PIX/boleto) para evitar falhas no checkout."
      ],
      "questions": [
        "Quais métodos de pagamento Stripe devem ser habilitados no MVP (cartão, PIX, boleto)?",
        "Precisamos registrar webhooks Stripe em um endpoint específico já definido?"
      ],
      "resolution": "create_draft",
      "pluginDefsFileRef": "_102030_/l2/plugins/pluginStripePagamentos/plugin.defs.ts",
      "moduleConnectionDefsFileRef": "_102030_/l2/petShopStripe/plugins/pluginStripePagamentos.defs.ts"
    }
  }
} as const;

export default pluginStripePagamentosPluginPlan;
