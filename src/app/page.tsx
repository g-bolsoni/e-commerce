import { ProductList } from "@/components/ProductList";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Image src="/images/banner_home.jpg" alt="banner home" width={1920} height={600} className="w-screen h-full" />
      <section className="mx-3 md:container md:mx-auto">
        <ProductList />
        <Image src="/images/Destaque.png" alt="banner destaques" width={1920} height={600} className="w-screen h-full" />
        <Image src="/images/Categorias.png" alt="banner categorias" width={1920} height={600} className="w-screen h-full" />
      </section>
    </>
  );
}
