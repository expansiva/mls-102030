CREATE TABLE IF NOT EXISTS petshop_product (
  "productId" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "priceInCents" INTEGER NOT NULL,
  "currency" TEXT NOT NULL,
  "highlightScore" INTEGER NOT NULL,
  "stockStatus" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "updatedAt" TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_petshop_product_category
  ON petshop_product ("category");

CREATE INDEX IF NOT EXISTS idx_petshop_product_highlight
  ON petshop_product ("highlightScore" DESC);

CREATE INDEX IF NOT EXISTS idx_petshop_product_updated
  ON petshop_product ("updatedAt" DESC);
