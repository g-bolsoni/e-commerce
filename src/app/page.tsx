import { ProductList } from "@/components/ProductList";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Image src="/images/d_home_banner.avif" priority={true} alt="banner home" width={1920} height={600} className="w-screen h-full" />
      <section className="mx-3 md:container md:mx-auto">
        <ProductList />
        <Image src="/images/lancamento.avif" alt="banner destaques" width={1920} height={600} />
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
