/// <mls fileReference="_102030_/l2/petshop/index.ts" enhancement="_blank" />
import { bootstrapCollabApp } from '/_102020_/l2/core/bootstrap.js';

void bootstrapCollabApp({
  projectId: '102030',
  appId: 'petshop',
  title: 'Collab Test · Petshop',
  shellMode: 'spa',
  navigation: [
    { label: 'Catalogo', href: '/petshop/catalogo' },
    { label: 'Monitor', href: '/monitor' },
  ],
  pages: [
    {
      path: '/petshop/index.html',
      title: 'Home',
      tagName: 'petshop-web-desktop-home-page',
      loader: () => import('/_102030_/l2/petshop/web/desktop/page11/home.js'),
    },
    {
      path: '/petshop/catalogo',
      title: 'Home',
      tagName: 'petshop-web-desktop-home-page',
      loader: () => import('/_102030_/l2/petshop/web/desktop/page11/home.js'),
    },
  ],
});
