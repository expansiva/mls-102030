/// <mls fileReference="_102030_/l2/petShopStripe/module.ts" enhancement="_blank" />
import type { AuraModuleFrontendDefinition, IPaths, IGenomeConfig } from '/_102029_/l2/contracts/bootstrap.js';

export const moduleGenome: Record<string, IGenomeConfig> = {
  'web/desktop/page11': {
    designSystem: 'default',
    device: 'desktop',
    layout: 'standard',
  }
} as const;

export const skills: IPaths = {
  web: {
    sharedPath: '/_102030_/l2/petShopStripe/web/shared',
    sharedSkill: '/_102020_/l2/agentMaterializeSolution/skills/genPageShared.ts'
  }
}

export const moduleStates = {
} as const;

export const moduleShellPreferences = {
  layout: {
    asideMode: {
      desktop: 'inline',
      mobile: 'fullscreen',
    },
  },
} as const;

export const moduleFrontendDefinition: AuraModuleFrontendDefinition = {
  pageTitle: 'petShopStripe',
  device: 'desktop',
  navigation: [
    {
      id: 'cartPage',
      label: 'cartPage',
      href: '/petShopStripe/cartPage',
      description: 'cartPage',
    },
    {
      id: 'catalogPage',
      label: 'catalogPage',
      href: '/petShopStripe/catalogPage',
      description: 'catalogPage',
    },
    {
      id: 'accountOrdersPage',
      label: 'accountOrdersPage',
      href: '/petShopStripe/accountOrdersPage',
      description: 'accountOrdersPage',
    },
    {
      id: 'adminCatalogPage',
      label: 'adminCatalogPage',
      href: '/petShopStripe/adminCatalogPage',
      description: 'adminCatalogPage',
    },
    {
      id: 'adminMetricsPage',
      label: 'adminMetricsPage',
      href: '/petShopStripe/adminMetricsPage',
      description: 'adminMetricsPage',
    },
    {
      id: 'adminOrdersPage',
      label: 'adminOrdersPage',
      href: '/petShopStripe/adminOrdersPage',
      description: 'adminOrdersPage',
    },
    {
      id: 'homePage',
      label: 'homePage',
      href: '/petShopStripe/homePage',
      description: 'homePage',
    },
    {
      id: 'checkoutPage',
      label: 'checkoutPage',
      href: '/petShopStripe/checkoutPage',
      description: 'checkoutPage',
    },
  ],
  routes: [
    {
      path: '/petShopStripe/cartPage',
      aliases: [],
      entrypoint: '/_102030_/l2/petShopStripe/web/desktop/page11/cartPage.js',
      tag: 'pet-shop-stripe--web--desktop--page11--cart-page-102030',
      title: 'cartPage',
    },
    {
      path: '/petShopStripe/catalogPage',
      aliases: [],
      entrypoint: '/_102030_/l2/petShopStripe/web/desktop/page11/catalogPage.js',
      tag: 'pet-shop-stripe--web--desktop--page11--catalog-page-102030',
      title: 'catalogPage',
    },
    {
      path: '/petShopStripe/accountOrdersPage',
      aliases: [],
      entrypoint: '/_102030_/l2/petShopStripe/web/desktop/page11/accountOrdersPage.js',
      tag: 'pet-shop-stripe--web--desktop--page11--account-orders-page-102030',
      title: 'accountOrdersPage',
    },
    {
      path: '/petShopStripe/adminCatalogPage',
      aliases: [],
      entrypoint: '/_102030_/l2/petShopStripe/web/desktop/page11/adminCatalogPage.js',
      tag: 'pet-shop-stripe--web--desktop--page11--admin-catalog-page-102030',
      title: 'adminCatalogPage',
    },
    {
      path: '/petShopStripe/adminMetricsPage',
      aliases: [],
      entrypoint: '/_102030_/l2/petShopStripe/web/desktop/page11/adminMetricsPage.js',
      tag: 'pet-shop-stripe--web--desktop--page11--admin-metrics-page-102030',
      title: 'adminMetricsPage',
    },
    {
      path: '/petShopStripe/adminOrdersPage',
      aliases: [],
      entrypoint: '/_102030_/l2/petShopStripe/web/desktop/page11/adminOrdersPage.js',
      tag: 'pet-shop-stripe--web--desktop--page11--admin-orders-page-102030',
      title: 'adminOrdersPage',
    },
    {
      path: '/petShopStripe/homePage',
      aliases: [],
      entrypoint: '/_102030_/l2/petShopStripe/web/desktop/page11/homePage.js',
      tag: 'pet-shop-stripe--web--desktop--page11--home-page-102030',
      title: 'homePage',
    },
    {
      path: '/petShopStripe/checkoutPage',
      aliases: [],
      entrypoint: '/_102030_/l2/petShopStripe/web/desktop/page11/checkoutPage.js',
      tag: 'pet-shop-stripe--web--desktop--page11--checkout-page-102030',
      title: 'checkoutPage',
    },
  ],
};
