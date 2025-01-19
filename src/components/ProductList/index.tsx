"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";
import { ProductListInfo, Product } from "@/types/product_list";
import { formatPrice } from "@/util/format";

export const loadProducts = async () => {
  if (!localStorage.getItem("apiToken")) return [];

  const token = localStorage.getItem("apiToken");

  const response = await api.get<ProductListInfo[]>("/product/lists", {
    headers: {
      authorization: token,
    },
  });

  if (response.status != 200) return [];

  return response.data.data;
};

export function ProductList() {
  const { data, isLoading } = useQuery<ProductListInfo[]>({
    queryKey: ["products"],
    queryFn: loadProducts,
  });

  return (
    <>
      {!isLoading && data ? (
        <>
          {data.map((list, index) => {
            if (list.products.length <= 0) return;
            if (index > 4) return;
            return (
              <div className="list-products" key={index}>
                <span className="list_title flex w-full flex-col items-center my-4 font-bold text-lg lg:text-xl">
                  {list.name}
                </span>
                <div className="products w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center lg:justify-items-center gap-16 md:gap-16 px-4 py-4 md:px-0">
                  <Products products={list.products} />
                </div>
              </div>
            );
          })}
        </>
      ) : (
        "Loading ...."
      )}
    </>
  );
}

const Products = ({ products }: { products: Product[] }) => {
  return (
    <>
      {products.map((product) => (
        <div
          key={product.product_id}
          className="product flex flex-col gap-4 relative group/product max-w-[20rem]"
        >
          <div className="rounded-3xl w-full relative">
            <a href="/">
              <Image
                src={product.image}
                className="rounded-3xl object-contain transition-shadow duration-200 ease-linear group-hover/product:shadow-product mix-blend-multiply"
                alt=""
                width={320}
                height={320}
              />
            </a>
          </div>
          <div className="product_list_information flex flex-col gap-3 relative w-full">
            <div className="product_title flex flex-col gap-1 min-h-12 justify-center">
              <span className="text-sm font-normal md:text-md text-fontSecondary-900 line-clamp-2">
                {product.product_description[0].name}
              </span>
            </div>

            <div className="prices flex flex-col gap-1">
              <span className="font-bold text-md md:text-lg text-fontSecondary-900">
                {formatPrice(parseFloat(product.price))}
              </span>
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
              <a
                href="https://www.sapatoretro.com.br/p-bolsa-retro-salvia-e-bronze-frescor"
                className="w-full text-center bg-primary-500 text-fontPrimary-50 rounded-full px-6 py-2"
              >
                Comprar
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
