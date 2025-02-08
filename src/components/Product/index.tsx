import { formatPrice } from "@/util/format";
import Image from "next/image";
import { Product } from "@/types/product_list";
import Link from "next/link";

export const Products = ({ products }: { products: Product[] }) => {
  return (
    <>
      {products.map((product) => {
        const imageUrl = product.image ? product.image : "/images/no_image";
        return (
          <div key={product.product_id} className="product flex flex-col gap-4 relative group/product">
            <div className="rounded-3xl w-full bg-white relative">
              <Link href={`product/${product.product_description[0].name}`}>
                <div className="w-full h-full bg-secondary-100 rounded-xl flex items-center justify-center py-5">
                  <Image src={imageUrl} className="w-full h-full max-w-80 max-h-80 object-contain rounded-lg" alt={product.product_description[0].name} width={320} height={320} />
                </div>
              </Link>
            </div>

            <div className="product_list_information flex flex-col gap-3 relative w-full">
              <div className="product_title flex flex-col gap-1 justify-center">
                <span className="text-sm font-normal md:text-base text-fontSecondary-900 line-clamp-2">{product.product_description[0].name}</span>
              </div>

              <div className="prices flex flex-col gap-1">
                <span className="font-bold text-md md:text-lg text-fontSecondary-900">{formatPrice(parseFloat(product.price))}</span>
                <div className="installments text-sm text-fontSecondary-900">
                  <span className="quantity_installments font-bold"> 6x </span> de
                  <span className="amount_installments font-bold">R$ 41,65</span>
                  sem juros
                </div>
                <div className="product-price-discount text-sm text-fontSecondary-900">
                  <b>R$ 242,40</b> no Pix
                </div>
              </div>
              <div className="product-list-btn flex items-center gap-2 flex-wrap justify-center">
                <a href={`product/${product.url}`} className="w-full text-center bg-primary-500 text-fontPrimary-50 rounded-full px-6 py-2">
                  Comprar
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
