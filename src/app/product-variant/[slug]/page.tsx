import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import QuantitySelector from "@/app/product-variant/[slug]/components/quantity-selector";
import VariantSelector from "@/app/product-variant/[slug]/components/variant-selector";
import Footer from "@/components/commom/footer";
import { Header } from "@/components/commom/header";
import ProductList from "@/components/commom/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

interface IProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: IProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productTable.slug, slug),
    with: {
      product: {
        with: { variants: true },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6">
        <Image
          src={productVariant.imageUrl}
          alt={productVariant.name}
          width={0}
          height={0}
          className="h-auto w-full rounded-3xl"
          sizes="100vw"
          quality={100}
        />

        <div className="px-5">
          <VariantSelector
            selectedVariantSlug={productVariant.slug}
            variants={productVariant.product.variants}
          />
        </div>

        <div className="px-5">
          <h2 className="text-lg font-semibold">
            {productVariant.product.name}
          </h2>
          <h3 className="text-muted-foreground">{productVariant.name}</h3>
          <h3 className="text-lg font-semibold">
            {formatCentsToBRL(productVariant.priceInCents)}
          </h3>
        </div>
        <div className="px-5">
          <QuantitySelector />
        </div>

        <div className="flex flex-col space-y-4 px-5">
          <Button size="lg" variant="outline" className="rounded-full">
            Adicionar na sacola
          </Button>
          <Button className="rounded-full" size="lg">
            Comprar agora
          </Button>
        </div>

        <div className="px-5">
          <p className="text-shadow-amber-600">
            {productVariant.product.description}
          </p>
        </div>

        <ProductList
          title="Você também pode gostar"
          products={likelyProducts}
        />

        <Footer />
      </div>
    </>
  );
};

export default ProductVariantPage;
