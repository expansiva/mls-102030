/// <mls fileReference="_102030_/l2/petshop/shared/mock/products.ts" enhancement="_blank" />
import type { PetshopCatalogProduct } from '/_102030_/l1/petshop/module.js';

export function buildPetshopMockProducts(): PetshopCatalogProduct[] {
  return [
    {
      productId: 'pet-001',
      name: 'Racao Premium Cao Adulto',
      category: 'Alimentacao',
      priceInCents: 18990,
      currency: 'BRL',
      highlightScore: 98,
      stockStatus: 'in_stock',
      description: 'Pacote de racao para cao adulto com alta aceitacao.',
      updatedAt: new Date('2026-03-20T10:00:00.000Z').toISOString(),
    },
    {
      productId: 'pet-002',
      name: 'Areia Higienica Super Fina',
      category: 'Higiene',
      priceInCents: 4590,
      currency: 'BRL',
      highlightScore: 92,
      stockStatus: 'in_stock',
      description: 'Areia com controle de odor para gatos.',
      updatedAt: new Date('2026-03-20T10:02:00.000Z').toISOString(),
    },
    {
      productId: 'pet-003',
      name: 'Shampoo Dermatologico',
      category: 'Banho',
      priceInCents: 3590,
      currency: 'BRL',
      highlightScore: 87,
      stockStatus: 'low_stock',
      description: 'Shampoo suave para pets com pele sensivel.',
      updatedAt: new Date('2026-03-20T10:03:00.000Z').toISOString(),
    },
    {
      productId: 'pet-004',
      name: 'Brinquedo Mordedor Resistente',
      category: 'Acessorios',
      priceInCents: 2990,
      currency: 'BRL',
      highlightScore: 85,
      stockStatus: 'in_stock',
      description: 'Brinquedo para enriquecimento ambiental.',
      updatedAt: new Date('2026-03-20T10:04:00.000Z').toISOString(),
    },
    {
      productId: 'pet-005',
      name: 'Kit Escova e Pente',
      category: 'Banho',
      priceInCents: 2490,
      currency: 'BRL',
      highlightScore: 80,
      stockStatus: 'out_of_stock',
      description: 'Kit para higiene e desembaraco.',
      updatedAt: new Date('2026-03-20T10:05:00.000Z').toISOString(),
    },
  ];
}
