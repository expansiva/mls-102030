/// <mls fileReference="_102030_/l2/petshop/module.ts" enhancement="_blank" />
import type { AuraModuleFrontendDefinition } from '/_102029_/l2/contracts/bootstrap.js';

export const moduleGenome = {
  page11: {
    device: 'desktop',
    layout: 'standard',
  },
  page21: {
    device: 'mobile',
    layout: 'standard',
  },
} as const;

export const moduleStates = {
  currentSection: 'ui.petshop.currentSection',
  selectedCategory: 'ui.petshop.selectedCategory',
  searchQuery: 'ui.petshop.searchQuery',
  editorAuthor: 'ui.petshop.editorAuthor',
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
  pageTitle: 'petshop',
  device: 'desktop',
  navigation: [
    {
      id: 'catalog',
      label: 'Catalog',
      href: '/petshop',
      description: 'Storefront catalog view',
    },
    {
      id: 'edit-products',
      label: 'Edit products',
      href: '/petshop/edit-products',
      description: 'Simulate product changes with author',
    },
  ],
  routes: [
    {
      path: '/petshop',
      aliases: ['/petshop/index.html', '/petshop/catalogo'],
      entrypoint: '/_102030_/l2/petshop/web/routes/catalog.js',
      tag: 'petshop-web-desktop-home-page',
      title: 'Catalog',
    },
    {
      path: '/petshop/edit-products',
      entrypoint: '/_102030_/l2/petshop/web/routes/edit-products.js',
      tag: 'petshop-web-desktop-home-page',
      title: 'Edit products',
    },
  ],
};
