/// <mls fileReference="_102030_/l2/petshop/web/shared/homeFormatters.ts" enhancement="_blank" />
export function formatPrice(priceInCents: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(priceInCents / 100);
}
