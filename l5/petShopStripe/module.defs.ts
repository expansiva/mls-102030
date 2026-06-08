/// <mls fileReference="_102030_/l5/petShopStripe/module.defs.ts" enhancement="_blank" />
export const modulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "module",
  "artifactId": "petShopStripe",
  "moduleName": "petShopStripe",
  "status": "draft",
  "source": {
    "agentName": "agentFinalizeSolutionPlan",
    "stepId": 11,
    "planId": "plan-finalize-solution-plan"
  },
  "data": {
    "module": {
      "moduleName": "petShopStripe",
      "purpose": "Criar um site de pet shop no Brasil com vendas de produtos e serviços, checkout e pagamentos via Stripe, além de gestão administrativa e financeiro.",
      "businessDomain": "petShopCommerce",
      "languages": [
        "pt-BR"
      ],
      "visualStyle": {
        "tone": "Moderno e amigável",
        "layout": "Vitrine clara com navegação simples e foco em conversão",
        "palette": [
          "#F6F3FF",
          "#8BC7B5",
          "#F5A6C6",
          "#FFD48A",
          "#4C6A92"
        ]
      }
    },
    "actors": [
      {
        "actorId": "cliente",
        "title": "Cliente",
        "description": "Tutores de pets que compram produtos e serviços."
      },
      {
        "actorId": "adminPetShop",
        "title": "Administrador",
        "description": "Responsável por catálogo, pedidos, serviços, pagamentos, financeiro e métricas."
      }
    ],
    "capabilities": [
      {
        "capabilityId": "browseCatalog",
        "title": "Explorar catálogo",
        "description": "Permitir ao cliente navegar por produtos e serviços do pet shop.",
        "actor": "cliente",
        "priority": "now"
      },
      {
        "capabilityId": "manageCartCheckout",
        "title": "Carrinho e checkout",
        "description": "Adicionar itens ao carrinho e finalizar compra.",
        "actor": "cliente",
        "priority": "now"
      },
      {
        "capabilityId": "payWithStripe",
        "title": "Pagamento via Stripe",
        "description": "Realizar pagamento com Stripe para produtos e serviços.",
        "actor": "cliente",
        "priority": "now"
      },
      {
        "capabilityId": "bookService",
        "title": "Agendar serviço",
        "description": "Selecionar data/horário para serviços como banho e tosa.",
        "actor": "cliente",
        "priority": "soon"
      },
      {
        "capabilityId": "manageCatalog",
        "title": "Gerenciar catálogo",
        "description": "Cadastrar/editar produtos e serviços, preços e disponibilidade.",
        "actor": "adminPetShop",
        "priority": "now"
      },
      {
        "capabilityId": "manageOrdersServices",
        "title": "Gerenciar pedidos e serviços",
        "description": "Acompanhar pedidos, status de pagamento e agenda de serviços.",
        "actor": "adminPetShop",
        "priority": "now"
      },
      {
        "capabilityId": "financialOverview",
        "title": "Visão financeira",
        "description": "Acompanhar recebíveis e transações de pagamento.",
        "actor": "adminPetShop",
        "priority": "now"
      },
      {
        "capabilityId": "metricsDashboard",
        "title": "Métricas e dashboard",
        "description": "Visualizar métricas básicas de vendas e serviços.",
        "actor": "adminPetShop",
        "priority": "now"
      }
    ],
    "ontology": {
      "entities": {
        "Customer": {
          "title": "Cliente",
          "description": "Tutor de pet que compra produtos ou serviços."
        },
        "Pet": {
          "title": "Pet",
          "description": "Animal de estimação associado ao cliente para serviços."
        },
        "Product": {
          "title": "Produto",
          "description": "Item físico vendido pelo pet shop."
        },
        "Service": {
          "title": "Serviço",
          "description": "Serviço oferecido pelo pet shop, como banho e tosa."
        },
        "Cart": {
          "title": "Carrinho",
          "description": "Seleção temporária de produtos e serviços antes do checkout."
        },
        "CartItem": {
          "title": "Item do carrinho",
          "description": "Item individual no carrinho com quantidade e preço."
        },
        "Order": {
          "title": "Pedido",
          "description": "Compromisso de compra gerado no checkout."
        },
        "OrderItem": {
          "title": "Item do pedido",
          "description": "Itens do pedido, podendo ser produtos ou serviços."
        },
        "ServiceBooking": {
          "title": "Agendamento de serviço",
          "description": "Reserva de data/horário para prestação de serviço."
        },
        "Payment": {
          "title": "Pagamento",
          "description": "Registro do pagamento associado ao pedido."
        },
        "StripeTransaction": {
          "title": "Transação Stripe",
          "description": "Evento de cobrança e confirmação retornado pela Stripe."
        },
        "FinancialEntry": {
          "title": "Lançamento financeiro",
          "description": "Registro financeiro associado a recebíveis e conciliações."
        },
        "Receivable": {
          "title": "Recebível",
          "description": "Valor a receber proveniente de pagamentos aprovados."
        },
        "AdminUser": {
          "title": "Administrador",
          "description": "Usuário administrativo do pet shop."
        },
        "Address": {
          "title": "Endereço",
          "description": "Endereço de entrega ou cadastro do cliente."
        },
        "CatalogCategory": {
          "title": "Categoria",
          "description": "Classificação de produtos e serviços no catálogo."
        }
      }
    },
    "rules": [
      {
        "ruleId": "ruleOrderRequiresCustomer",
        "title": "Pedido requer cliente",
        "description": "Todo pedido deve estar associado a um cliente válido.",
        "appliesTo": [
          "Order"
        ],
        "layer": "layer_1"
      },
      {
        "ruleId": "ruleOrderStatusLifecycle",
        "title": "Ciclo de vida do pedido",
        "description": "O pedido deve seguir estados padrão: criado, aguardandoPagamento, pago, emSeparacao, concluido, cancelado.",
        "appliesTo": [
          "Order"
        ],
        "layer": "layer_1"
      },
      {
        "ruleId": "rulePaymentRequiredToConfirmOrder",
        "title": "Pagamento confirma pedido",
        "description": "Pedido só pode ser confirmado como pago após transação Stripe aprovada.",
        "appliesTo": [
          "Order",
          "Payment",
          "StripeTransaction"
        ],
        "layer": "layer_2"
      },
      {
        "ruleId": "ruleStripeTransactionLink",
        "title": "Transação Stripe vinculada",
        "description": "Toda transação Stripe deve estar vinculada a um pagamento e pedido.",
        "appliesTo": [
          "StripeTransaction",
          "Payment",
          "Order"
        ],
        "layer": "layer_1"
      },
      {
        "ruleId": "ruleServiceBookingRequiresSlot",
        "title": "Agendamento requer horário",
        "description": "Agendamento de serviço exige data e horário disponíveis.",
        "appliesTo": [
          "ServiceBooking"
        ],
        "layer": "layer_2"
      },
      {
        "ruleId": "ruleReceivableFromPayment",
        "title": "Recebível a partir do pagamento",
        "description": "Recebível é criado quando pagamento aprovado e conciliação registrada.",
        "appliesTo": [
          "Receivable",
          "Payment",
          "FinancialEntry"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "ruleMetricsUpdateOnOrderPaid",
        "title": "Atualização de métricas",
        "description": "Métricas de vendas e pagamentos são atualizadas quando pedido é pago.",
        "appliesTo": [
          "Order",
          "Payment"
        ],
        "layer": "layer_3"
      }
    ],
    "relationships": [
      {
        "relationshipId": "relCustomerOwnsPet",
        "fromEntity": "Customer",
        "toEntity": "Pet",
        "type": "owns",
        "description": "Cliente pode possuir um ou mais pets."
      },
      {
        "relationshipId": "relCustomerHasCart",
        "fromEntity": "Customer",
        "toEntity": "Cart",
        "type": "has",
        "description": "Cliente possui um carrinho ativo."
      },
      {
        "relationshipId": "relCartHasItems",
        "fromEntity": "Cart",
        "toEntity": "CartItem",
        "type": "contains",
        "description": "Carrinho contém itens."
      },
      {
        "relationshipId": "relOrderHasItems",
        "fromEntity": "Order",
        "toEntity": "OrderItem",
        "type": "contains",
        "description": "Pedido contém itens."
      },
      {
        "relationshipId": "relOrderHasPayment",
        "fromEntity": "Order",
        "toEntity": "Payment",
        "type": "has",
        "description": "Pedido possui um pagamento associado."
      },
      {
        "relationshipId": "relPaymentHasStripeTx",
        "fromEntity": "Payment",
        "toEntity": "StripeTransaction",
        "type": "has",
        "description": "Pagamento possui uma transação Stripe."
      },
      {
        "relationshipId": "relOrderHasBooking",
        "fromEntity": "Order",
        "toEntity": "ServiceBooking",
        "type": "mayHave",
        "description": "Pedido pode incluir agendamento de serviço."
      },
      {
        "relationshipId": "relOrderCreatesReceivable",
        "fromEntity": "Order",
        "toEntity": "Receivable",
        "type": "generates",
        "description": "Pedido pago gera recebível."
      },
      {
        "relationshipId": "relReceivableHasEntry",
        "fromEntity": "Receivable",
        "toEntity": "FinancialEntry",
        "type": "records",
        "description": "Recebível registra lançamentos financeiros."
      },
      {
        "relationshipId": "relProductCategory",
        "fromEntity": "CatalogCategory",
        "toEntity": "Product",
        "type": "categorizes",
        "description": "Categoria classifica produto."
      },
      {
        "relationshipId": "relServiceCategory",
        "fromEntity": "CatalogCategory",
        "toEntity": "Service",
        "type": "categorizes",
        "description": "Categoria classifica serviço."
      },
      {
        "relationshipId": "relCustomerAddress",
        "fromEntity": "Customer",
        "toEntity": "Address",
        "type": "has",
        "description": "Cliente possui endereços."
      },
      {
        "relationshipId": "relOrderBelongsCustomer",
        "fromEntity": "Order",
        "toEntity": "Customer",
        "type": "belongsTo",
        "description": "Pedido pertence a um cliente."
      },
      {
        "relationshipId": "relOrderItemProduct",
        "fromEntity": "OrderItem",
        "toEntity": "Product",
        "type": "mayReference",
        "description": "Item de pedido pode referenciar um produto."
      },
      {
        "relationshipId": "relOrderItemService",
        "fromEntity": "OrderItem",
        "toEntity": "Service",
        "type": "mayReference",
        "description": "Item de pedido pode referenciar um serviço."
      },
      {
        "relationshipId": "relCartItemProduct",
        "fromEntity": "CartItem",
        "toEntity": "Product",
        "type": "mayReference",
        "description": "Item do carrinho pode referenciar um produto."
      },
      {
        "relationshipId": "relCartItemService",
        "fromEntity": "CartItem",
        "toEntity": "Service",
        "type": "mayReference",
        "description": "Item do carrinho pode referenciar um serviço."
      },
      {
        "relationshipId": "relServiceBookingService",
        "fromEntity": "ServiceBooking",
        "toEntity": "Service",
        "type": "books",
        "description": "Agendamento refere-se a um serviço."
      },
      {
        "relationshipId": "relServiceBookingPet",
        "fromEntity": "ServiceBooking",
        "toEntity": "Pet",
        "type": "for",
        "description": "Agendamento é feito para um pet específico."
      }
    ],
    "userActions": [
      {
        "actionId": "browseCatalog",
        "title": "Navegar no catálogo",
        "actor": "cliente",
        "capabilityId": "browseCatalog",
        "description": "Explorar categorias e listar produtos/serviços disponíveis.",
        "commandType": "query",
        "affectedEntities": [
          "Product",
          "Service",
          "CatalogCategory"
        ]
      },
      {
        "actionId": "viewProductService",
        "title": "Ver detalhes de produto/serviço",
        "actor": "cliente",
        "capabilityId": "browseCatalog",
        "description": "Abrir página de detalhes com descrição, preço e opções.",
        "commandType": "query",
        "affectedEntities": [
          "Product",
          "Service"
        ]
      },
      {
        "actionId": "addToCart",
        "title": "Adicionar ao carrinho",
        "actor": "cliente",
        "capabilityId": "manageCartCheckout",
        "description": "Adicionar produto ou serviço ao carrinho com quantidade.",
        "commandType": "command",
        "affectedEntities": [
          "Cart",
          "CartItem"
        ]
      },
      {
        "actionId": "updateCart",
        "title": "Atualizar carrinho",
        "actor": "cliente",
        "capabilityId": "manageCartCheckout",
        "description": "Alterar quantidade ou remover itens do carrinho.",
        "commandType": "command",
        "affectedEntities": [
          "Cart",
          "CartItem"
        ]
      },
      {
        "actionId": "startCheckout",
        "title": "Iniciar checkout",
        "actor": "cliente",
        "capabilityId": "manageCartCheckout",
        "description": "Confirmar itens e dados para criação do pedido.",
        "commandType": "command",
        "affectedEntities": [
          "Order",
          "OrderItem"
        ],
        "rulesApplied": [
          "ruleOrderRequiresCustomer"
        ]
      },
      {
        "actionId": "confirmStripePayment",
        "title": "Confirmar pagamento Stripe",
        "actor": "cliente",
        "capabilityId": "payWithStripe",
        "description": "Autorizar e confirmar pagamento via Stripe.",
        "commandType": "command",
        "affectedEntities": [
          "Payment",
          "StripeTransaction",
          "Order"
        ],
        "rulesApplied": [
          "rulePaymentRequiredToConfirmOrder",
          "ruleStripeTransactionLink",
          "ruleMetricsUpdateOnOrderPaid"
        ]
      },
      {
        "actionId": "scheduleService",
        "title": "Agendar serviço",
        "actor": "cliente",
        "capabilityId": "bookService",
        "description": "Selecionar data e horário disponíveis para serviço.",
        "commandType": "command",
        "affectedEntities": [
          "ServiceBooking",
          "Order"
        ],
        "rulesApplied": [
          "ruleServiceBookingRequiresSlot"
        ]
      },
      {
        "actionId": "manageCatalog",
        "title": "Gerenciar catálogo",
        "actor": "adminPetShop",
        "capabilityId": "manageCatalog",
        "description": "Cadastrar, editar ou desativar produtos e serviços.",
        "commandType": "command",
        "affectedEntities": [
          "Product",
          "Service",
          "CatalogCategory"
        ]
      },
      {
        "actionId": "updateOrderStatus",
        "title": "Atualizar status do pedido",
        "actor": "adminPetShop",
        "capabilityId": "manageOrdersServices",
        "description": "Alterar status do pedido e acompanhar execução.",
        "commandType": "command",
        "affectedEntities": [
          "Order"
        ],
        "rulesApplied": [
          "ruleOrderStatusLifecycle"
        ]
      },
      {
        "actionId": "viewFinancial",
        "title": "Visualizar financeiro",
        "actor": "adminPetShop",
        "capabilityId": "financialOverview",
        "description": "Consultar recebíveis, transações e lançamentos.",
        "commandType": "query",
        "affectedEntities": [
          "Receivable",
          "StripeTransaction",
          "FinancialEntry"
        ]
      },
      {
        "actionId": "reconcilePayments",
        "title": "Conciliar recebíveis",
        "actor": "adminPetShop",
        "capabilityId": "financialOverview",
        "description": "Registrar conciliação e lançar recebíveis aprovados.",
        "commandType": "command",
        "affectedEntities": [
          "Receivable",
          "FinancialEntry",
          "Payment"
        ],
        "rulesApplied": [
          "ruleReceivableFromPayment"
        ]
      },
      {
        "actionId": "viewMetricsDashboard",
        "title": "Visualizar métricas",
        "actor": "adminPetShop",
        "capabilityId": "metricsDashboard",
        "description": "Acompanhar indicadores de vendas e pagamentos.",
        "commandType": "query",
        "affectedEntities": [
          "Order",
          "Payment"
        ]
      }
    ],
    "approvedArtifacts": {
      "pages": [
        {
          "signal": "homePage",
          "title": "Página inicial",
          "reason": "Apresentar o pet shop e acesso ao catálogo.",
          "priority": "now",
          "actor": "cliente",
          "artifactType": "page"
        },
        {
          "signal": "catalogPage",
          "title": "Catálogo",
          "reason": "Listar produtos e serviços disponíveis.",
          "priority": "now",
          "actor": "cliente",
          "artifactType": "page"
        },
        {
          "signal": "productServiceDetailPage",
          "title": "Detalhe de produto/serviço",
          "reason": "Exibir descrição, preço e opções de compra/agendamento.",
          "priority": "now",
          "actor": "cliente",
          "artifactType": "page",
          "rulesApplied": [
            "ruleServiceBookingRequiresSlot"
          ]
        },
        {
          "signal": "cartPage",
          "title": "Carrinho",
          "reason": "Revisar itens antes do checkout.",
          "priority": "now",
          "actor": "cliente",
          "artifactType": "page"
        },
        {
          "signal": "checkoutPage",
          "title": "Checkout",
          "reason": "Coletar dados e iniciar pagamento Stripe.",
          "priority": "now",
          "actor": "cliente",
          "artifactType": "page",
          "references": [
            "checkoutWorkflow"
          ],
          "rulesApplied": [
            "ruleOrderRequiresCustomer",
            "rulePaymentRequiredToConfirmOrder",
            "ruleStripeTransactionLink"
          ]
        },
        {
          "signal": "accountOrdersPage",
          "title": "Minha conta e pedidos",
          "reason": "Acompanhar histórico de compras e serviços.",
          "priority": "soon",
          "actor": "cliente",
          "artifactType": "page"
        },
        {
          "signal": "adminDashboardPage",
          "title": "Dashboard administrativo",
          "reason": "Acesso rápido a vendas, agenda e financeiro.",
          "priority": "now",
          "actor": "adminPetShop",
          "artifactType": "page",
          "references": [
            "metricTableSalesOps"
          ]
        },
        {
          "signal": "adminCatalogPage",
          "title": "Administração de catálogo",
          "reason": "Gerenciar produtos e serviços.",
          "priority": "now",
          "actor": "adminPetShop",
          "artifactType": "page",
          "references": [
            "manageCatalogWorkflow"
          ]
        },
        {
          "signal": "adminOrdersPage",
          "title": "Administração de pedidos/serviços",
          "reason": "Gerenciar pedidos e status de serviços.",
          "priority": "now",
          "actor": "adminPetShop",
          "artifactType": "page",
          "rulesApplied": [
            "ruleOrderStatusLifecycle"
          ]
        },
        {
          "signal": "adminFinancialPage",
          "title": "Financeiro",
          "reason": "Visualizar recebíveis e transações Stripe.",
          "priority": "now",
          "actor": "adminPetShop",
          "artifactType": "page",
          "references": [
            "payoutReconciliationWorkflow"
          ],
          "rulesApplied": [
            "ruleReceivableFromPayment"
          ]
        },
        {
          "signal": "adminMetricsPage",
          "title": "Métricas",
          "reason": "Exibir métricas básicas e gráficos.",
          "priority": "now",
          "actor": "adminPetShop",
          "artifactType": "page",
          "references": [
            "metricTableSalesOps"
          ],
          "rulesApplied": [
            "ruleMetricsUpdateOnOrderPaid"
          ]
        }
      ],
      "workflows": [
        {
          "signal": "checkoutWorkflow",
          "title": "Fluxo de checkout",
          "reason": "Processo de compra até confirmação de pagamento.",
          "priority": "now",
          "actor": "cliente",
          "artifactType": "workflow",
          "references": [
            "stripePaymentsPlugin",
            "usecaseCreateOrder",
            "usecaseConfirmStripePayment",
            "usecaseUpdateMetricsOnOrderPaid"
          ]
        },
        {
          "signal": "serviceBookingWorkflow",
          "title": "Agendamento de serviço",
          "reason": "Selecionar data/horário para banho e tosa e confirmar pagamento.",
          "priority": "soon",
          "actor": "cliente",
          "artifactType": "workflow",
          "references": [
            "usecaseScheduleService"
          ]
        },
        {
          "signal": "orderManagementWorkflow",
          "title": "Gestão de pedidos/serviços",
          "reason": "Atualizar status de pedidos e serviços.",
          "priority": "now",
          "actor": "adminPetShop",
          "artifactType": "workflow",
          "references": [
            "usecaseUpdateOrderStatus"
          ]
        },
        {
          "signal": "payoutReconciliationWorkflow",
          "title": "Conciliação de pagamentos",
          "reason": "Registrar recebíveis e conciliar transações Stripe.",
          "priority": "soon",
          "actor": "adminPetShop",
          "artifactType": "workflow",
          "references": [
            "usecaseReconcilePayments"
          ]
        },
        {
          "signal": "manageCatalogWorkflow",
          "title": "Gestão de catálogo",
          "reason": "Fluxo para criar, editar e desativar produtos, serviços e categorias.",
          "priority": "now",
          "actor": "adminPetShop",
          "artifactType": "workflow",
          "references": [
            "usecaseManageCatalog"
          ]
        }
      ],
      "plugins": [
        {
          "signal": "stripePaymentsPlugin",
          "title": "Plugin Stripe Brasil",
          "reason": "Integração de pagamento Stripe para o Brasil.",
          "priority": "now",
          "actor": "cliente",
          "artifactType": "plugin",
          "references": [
            "rulePaymentRequiredToConfirmOrder",
            "ruleStripeTransactionLink"
          ]
        }
      ],
      "agents": [],
      "horizontalModules": [
        {
          "signal": "authModule",
          "title": "Autenticação e perfis",
          "reason": "Cadastro/login para clientes e administradores.",
          "priority": "now",
          "actor": "cliente",
          "artifactType": "horizontalModule"
        },
        {
          "signal": "financeModule",
          "title": "Módulo financeiro",
          "reason": "Recebíveis, conciliação e relatórios financeiros básicos.",
          "priority": "now",
          "actor": "adminPetShop",
          "artifactType": "horizontalModule",
          "references": [
            "ruleReceivableFromPayment"
          ]
        },
        {
          "signal": "notificationsModule",
          "title": "Notificações",
          "reason": "Confirmações de pedidos e status de pagamento.",
          "priority": "soon",
          "actor": "cliente",
          "artifactType": "horizontalModule"
        }
      ],
      "mdm": [
        {
          "signal": "petShopMasterData",
          "title": "MDM do pet shop",
          "reason": "Centralizar dados mestres de cliente, pet, produto, serviço, pedido e transação.",
          "priority": "now",
          "actor": "adminPetShop",
          "artifactType": "mdm",
          "references": [
            "Customer",
            "Pet",
            "Product",
            "Service",
            "Order",
            "Payment",
            "StripeTransaction"
          ]
        }
      ],
      "metricTables": [
        {
          "signal": "metricTableSalesOps",
          "title": "Tabela de métricas de vendas e pagamentos",
          "reason": "Agregação de pedidos, ticket médio, receita e taxa de aprovação.",
          "priority": "now",
          "actor": "adminPetShop",
          "artifactType": "metricTable",
          "references": [
            "Order",
            "Payment"
          ]
        }
      ],
      "metricDashboards": [
        {
          "signal": "adminMetricsDashboard",
          "title": "Dashboard administrativo de métricas",
          "reason": "Painel com indicadores de vendas e pagamentos.",
          "priority": "now",
          "actor": "adminPetShop",
          "artifactType": "metricDashboard",
          "references": [
            "metricTableSalesOps"
          ]
        }
      ],
      "usecaseEntities": [
        {
          "signal": "usecaseCreateOrder",
          "title": "Caso de uso: criar pedido",
          "reason": "Registrar pedido a partir do carrinho.",
          "priority": "now",
          "actor": "cliente",
          "artifactType": "usecaseEntity",
          "references": [
            "Order",
            "OrderItem",
            "Cart",
            "CartItem"
          ]
        },
        {
          "signal": "usecaseConfirmStripePayment",
          "title": "Caso de uso: confirmar pagamento Stripe",
          "reason": "Atualizar status do pedido após confirmação do Stripe.",
          "priority": "now",
          "actor": "cliente",
          "artifactType": "usecaseEntity",
          "references": [
            "Payment",
            "StripeTransaction",
            "Order"
          ]
        },
        {
          "signal": "usecaseScheduleService",
          "title": "Caso de uso: agendar serviço",
          "reason": "Criar agendamento para banho e tosa.",
          "priority": "soon",
          "actor": "cliente",
          "artifactType": "usecaseEntity",
          "references": [
            "ServiceBooking",
            "Service",
            "Order"
          ]
        },
        {
          "signal": "usecaseUpdateOrderStatus",
          "title": "Caso de uso: atualizar status do pedido",
          "reason": "Gerenciar ciclo de vida do pedido.",
          "priority": "now",
          "actor": "adminPetShop",
          "artifactType": "usecaseEntity",
          "references": [
            "Order"
          ]
        },
        {
          "signal": "usecaseReconcilePayments",
          "title": "Caso de uso: conciliar recebíveis",
          "reason": "Atualizar financeiro com transações confirmadas.",
          "priority": "soon",
          "actor": "adminPetShop",
          "artifactType": "usecaseEntity",
          "references": [
            "Receivable",
            "FinancialEntry",
            "Payment"
          ]
        },
        {
          "signal": "usecaseManageCatalog",
          "title": "Caso de uso: gerenciar catálogo",
          "reason": "Criar, editar e desativar produtos, serviços e categorias.",
          "priority": "now",
          "actor": "adminPetShop",
          "artifactType": "usecaseEntity",
          "references": [
            "Product",
            "Service",
            "CatalogCategory"
          ]
        },
        {
          "signal": "usecaseUpdateMetricsOnOrderPaid",
          "title": "Caso de uso: atualizar métricas de vendas",
          "reason": "Atualizar agregações de métricas quando o pedido é pago.",
          "priority": "now",
          "actor": "adminPetShop",
          "artifactType": "usecaseEntity",
          "references": [
            "Order",
            "Payment",
            "metricTableSalesOps"
          ]
        }
      ]
    },
    "decisions": [
      {
        "decisionId": "fixArtifactReferences",
        "title": "Correção de referências entre artefatos",
        "decision": "Ajustar referências para sinais existentes (checkoutWorkflow, payoutReconciliationWorkflow, stripePaymentsPlugin).",
        "reason": "Evitar referências quebradas entre páginas, workflows e plugins.",
        "affectedArtifacts": [
          "checkoutPage",
          "adminFinancialPage",
          "checkoutWorkflow"
        ]
      },
      {
        "decisionId": "addCoreRelationships",
        "title": "Relacionamentos centrais de pedidos e agendamentos",
        "decision": "Adicionar vínculos de Order com Customer e itens com Product/Service, além de ServiceBooking com Service e Pet.",
        "reason": "Garantir integridade do domínio de pedidos e agendamento.",
        "affectedArtifacts": [
          "relationships"
        ]
      },
      {
        "decisionId": "addMetricsUsecase",
        "title": "Caso de uso de atualização de métricas",
        "decision": "Criar usecaseUpdateMetricsOnOrderPaid e referenciar no checkoutWorkflow.",
        "reason": "Cobrir regra layer_3 de atualização de métricas e planejamento de BFF/atualizações.",
        "affectedArtifacts": [
          "usecaseUpdateMetricsOnOrderPaid",
          "checkoutWorkflow"
        ]
      },
      {
        "decisionId": "addCatalogWorkflow",
        "title": "Workflow e caso de uso para gestão de catálogo",
        "decision": "Criar manageCatalogWorkflow e usecaseManageCatalog para operações administrativas no catálogo.",
        "reason": "Cobrir comandos de gestão de catálogo por workflow dedicado.",
        "affectedArtifacts": [
          "manageCatalogWorkflow",
          "usecaseManageCatalog",
          "adminCatalogPage"
        ]
      }
    ],
    "deferredItems": []
  }
} as const;

export default modulePlan;
