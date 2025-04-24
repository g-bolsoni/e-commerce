import { ProductList } from "@/components/ProductList";
import { getProductList } from "@/database/prodcutList";
import Image from "next/image";

export default async function Home() {
  const product_list = await getProductList();
  console.log(product_list);

  const productsListData = {
    name: product_list[0].name,
    products: product_list[0].products,
    carousel: {
      is_carousel: true,
      desktop_itens: 5,
      tablet_itens: 4,
      mobile_itens: 2,
    },
  };

  return (
    <>
      <picture>
        <source media="(max-width: 1023px)" srcSet="/images/m_banner.avif" type="image/avif" />
        <Image src="/images/d_home_banner.avif" priority={true} alt="banner home" width={1920} height={600} className="w-screen h-full" />
      </picture>
      <section className="mx-3 md:container md:mx-auto">
        <ProductList {...productsListData} />
        <picture>
          <source media="(max-width: 1023px)" srcSet="/images/m_lancamento.avif" type="image/avif" />
          <Image src="/images/lancamento.avif" alt="banner destaques" width={1920} height={600} className="w-screen h-full" />
        </picture>
        <div className="hidden md:grid md:grid-cols-2 md:gap-4">
          <Image src="/images/d_esporte.avif" alt="banner esporte" width={768} height={637} />
          <div className="grid grid-cols-2 gap-4">
            <Image src="/images/d_social.avif" alt="banner social" width={648} height={300} className="col-span-full w-full h-[300px]" />
            <Image src="/images/d_infantil.avif" alt="banner infantil" width={300} height={300} className="w-full h-[300px]" />
            <Image src="/images/d_casual.avif" alt="banner casual" width={300} height={300} className="w-full h-[300px]" />
          </div>
        </div>
      </section>
    </>
  );
}
