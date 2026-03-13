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
      {/* Banner Principal */}
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
          className="w-full h-auto object-cover"
          sizes="100vw"
        />
      </picture>

      <section className="px-3 sm:px-4 md:container md:mx-auto">
        <ProductListCarousel
          title="🔥 Mais Vendidos"
          products={allProducts.products}
        />

        {/* Banner Lançamento */}
        <picture className="block my-4 sm:my-6">
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
            className="w-full h-auto rounded-lg sm:rounded-xl md:rounded-2xl object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />
        </picture>

        <ProductListCarousel
          title="📱 Smartphones"
          products={smartphones.products}
        />

        <ProductListCarousel title="💻 Laptops" products={laptops.products} />

        {/* Grid de Banners - Desktop */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-4 lg:gap-6 my-6 md:my-8">
          <Image
            src="/images/d_esporte.avif"
            alt="banner esporte"
            width={768}
            height={637}
            className="rounded-xl lg:rounded-2xl w-full h-auto object-cover"
          />
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <Image
              src="/images/d_social.avif"
              alt="banner social"
              width={648}
              height={300}
              className="col-span-full w-full h-auto max-h-[300px] object-cover rounded-xl lg:rounded-2xl"
            />
            <Image
              src="/images/d_infantil.avif"
              alt="banner infantil"
              width={300}
              height={300}
              className="w-full h-auto aspect-square object-cover rounded-xl lg:rounded-2xl"
            />
            <Image
              src="/images/d_casual.avif"
              alt="banner casual"
              width={300}
              height={300}
              className="w-full h-auto aspect-square object-cover rounded-xl lg:rounded-2xl"
            />
          </div>
        </div>
      </section>
    </>
  );
}
