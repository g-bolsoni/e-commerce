import { ProductListCarousel } from "@/components/ProductCard";
import { getProducts, getProductsByCategory } from "@/services/dummyjson";
import Image from "next/image";

export default async function Home() {
  // Busca produtos da API pública DummyJSON
  const [allProducts, smartphones, laptops] = await Promise.all([
    getProducts(10),
    getProductsByCategory("smartphones", 10),
    getProductsByCategory("laptops", 10),
  ]);

  return (
    <>
      <picture>
        <source
          media="(max-width: 1023px)"
          srcSet="/images/m_banner.avif"
          type="image/avif"
        />
        <Image
          src="/images/d_home_banner.avif"
          priority={true}
          alt="banner home"
          width={1920}
          height={600}
          className="w-screen h-full"
        />
      </picture>

      <section className="mx-3 md:container md:mx-auto">
        <ProductListCarousel
          title="🔥 Mais Vendidos"
          products={allProducts.products}
        />

        <picture>
          <source
            media="(max-width: 1023px)"
            srcSet="/images/m_lancamento.avif"
            type="image/avif"
          />
          <Image
            src="/images/lancamento.avif"
            alt="banner destaques"
            width={1920}
            height={600}
            className="w-screen h-full"
          />
        </picture>

        <ProductListCarousel
          title="📱 Smartphones"
          products={smartphones.products}
        />

        <ProductListCarousel title="💻 Laptops" products={laptops.products} />

        <div className="hidden md:grid md:grid-cols-2 md:gap-4 my-8">
          <Image
            src="/images/d_esporte.avif"
            alt="banner esporte"
            width={768}
            height={637}
          />
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/images/d_social.avif"
              alt="banner social"
              width={648}
              height={300}
              className="col-span-full w-full h-[300px]"
            />
            <Image
              src="/images/d_infantil.avif"
              alt="banner infantil"
              width={300}
              height={300}
              className="w-full h-[300px]"
            />
            <Image
              src="/images/d_casual.avif"
              alt="banner casual"
              width={300}
              height={300}
              className="w-full h-[300px]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
