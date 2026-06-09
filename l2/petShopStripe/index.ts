/// <mls fileReference="_102030_/l2/petShopStripe/index.ts" enhancement="_blank" />
import { bootstrapCollabApp } from '/_102033_/l2/core/bootstrap.js';

void bootstrapCollabApp({
  projectId: '102030',
  appId: 'petShopStripe',
  title: 'Collab Test · petShopStripe',
  shellMode: 'spa',
  navigation: [
    { label: 'Monitor', href: '/monitor' },
    { label: 'cartPage', href: '/petShopStripe/cartPage' },
    { label: 'catalogPage', href: '/petShopStripe/catalogPage' },
    { label: 'accountOrdersPage', href: '/petShopStripe/accountOrdersPage' },
    { label: 'adminCatalogPage', href: '/petShopStripe/adminCatalogPage' },
    { label: 'adminMetricsPage', href: '/petShopStripe/adminMetricsPage' },
    { label: 'adminOrdersPage', href: '/petShopStripe/adminOrdersPage' },
    { label: 'homePage', href: '/petShopStripe/homePage' },
    { label: 'checkoutPage', href: '/petShopStripe/checkoutPage' },
  ],
  pages: [
    {
      path: '/petShopStripe/cartPage',
      title: 'cartPage',
      tagName: 'pet-shop-stripe--web--desktop--page11--cart-page-102030',
      loader: () => import('/_102030_/l2/petShopStripe/web/desktop/page11/cartPage.js'),
    },
    {
      path: '/petShopStripe/catalogPage',
      title: 'catalogPage',
      tagName: 'pet-shop-stripe--web--desktop--page11--catalog-page-102030',
      loader: () => import('/_102030_/l2/petShopStripe/web/desktop/page11/catalogPage.js'),
    },
    {
      path: '/petShopStripe/accountOrdersPage',
      title: 'accountOrdersPage',
      tagName: 'pet-shop-stripe--web--desktop--page11--account-orders-page-102030',
      loader: () => import('/_102030_/l2/petShopStripe/web/desktop/page11/accountOrdersPage.js'),
    },
    {
      path: '/petShopStripe/adminCatalogPage',
      title: 'adminCatalogPage',
      tagName: 'pet-shop-stripe--web--desktop--page11--admin-catalog-page-102030',
      loader: () => import('/_102030_/l2/petShopStripe/web/desktop/page11/adminCatalogPage.js'),
    },
    {
      path: '/petShopStripe/adminMetricsPage',
      title: 'adminMetricsPage',
      tagName: 'pet-shop-stripe--web--desktop--page11--admin-metrics-page-102030',
      loader: () => import('/_102030_/l2/petShopStripe/web/desktop/page11/adminMetricsPage.js'),
    },
    {
      path: '/petShopStripe/adminOrdersPage',
      title: 'adminOrdersPage',
      tagName: 'pet-shop-stripe--web--desktop--page11--admin-orders-page-102030',
      loader: () => import('/_102030_/l2/petShopStripe/web/desktop/page11/adminOrdersPage.js'),
    },
    {
      path: '/petShopStripe/homePage',
      title: 'homePage',
      tagName: 'pet-shop-stripe--web--desktop--page11--home-page-102030',
      loader: () => import('/_102030_/l2/petShopStripe/web/desktop/page11/homePage.js'),
    },
    {
      path: '/petShopStripe/checkoutPage',
      title: 'checkoutPage',
      tagName: 'pet-shop-stripe--web--desktop--page11--checkout-page-102030',
      loader: () => import('/_102030_/l2/petShopStripe/web/desktop/page11/checkoutPage.js'),
    },
  ],
});
