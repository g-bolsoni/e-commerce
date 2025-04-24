"use client";

import Image from "next/image";

import Link from "next/link";
import Prices from "../Prices/page";
import { ProductInfo } from "@/types/product";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface ProductListProps {
  products: ProductInfo[];
  carousel: {
    is_carousel: boolean;
    desktop_itens: number;
    tablet_itens: number;
    mobile_itens: number;
  };
}

export const Products = (data: ProductListProps) => {
  return (
    <>
      {data.carousel.is_carousel ? (
        <Swiper
          spaceBetween={10}
          navigation={false}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
        >
          {data.products.map((product) => {
            const imageUrl = product.image ? product.image : "/images/no_image.jpg";
            return (
              <SwiperSlide key={product.product_id} className="product flex flex-col w-full gap-4 relative group/product">
                <div className="rounded-3xl w-full bg-white relative">
                  <Link href={`/produto/${product.url}`}>
                    <div className="w-full h-full bg-secondary-100 rounded-xl flex items-center justify-center py-5">
                      <Image src={imageUrl} className="w-full h-full max-w-80 max-h-80 object-contain rounded-lg" alt={product.product_description[0].name} width={320} height={320} />
                    </div>
                  </Link>
                </div>

                <div className="product_list_information flex flex-col gap-3 relative w-full">
                  <div className="product_title flex flex-col gap-1 justify-center">
                    <span className="text-sm font-normal md:text-base text-fontSecondary-900 line-clamp-2">{product.product_description[0].name}</span>
                  </div>

                  <Prices product={product} />

                  <div className="product-list-btn flex items-center gap-2 flex-wrap justify-center">
                    <a href={`/produto/${product.url}`} className="w-full text-center bg-primary-500 text-fontPrimary-50 rounded-full px-6 py-2">
                      Comprar
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <>
          {data.products.map((product) => {
            const imageUrl = product.image ? product.image : "/images/no_image.jpg";
            return (
              <div key={product.product_id} className="product flex flex-col w-full gap-4 relative group/product">
                <div className="rounded-3xl w-full bg-white relative">
                  <Link href={`/produto/${product.url}`}>
                    <div className="w-full h-full bg-secondary-100 rounded-xl flex items-center justify-center py-5">
                      <Image src={imageUrl} className="w-full h-full max-w-80 max-h-80 object-contain rounded-lg" alt={product.product_description[0].name} width={320} height={320} />
                    </div>
                  </Link>
                </div>

                <div className="product_list_information flex flex-col gap-3 relative w-full">
                  <div className="product_title flex flex-col gap-1 justify-center">
                    <span className="text-sm font-normal md:text-base text-fontSecondary-900 line-clamp-2">{product.product_description[0].name}</span>
                  </div>

                  <Prices product={product} />
                  <div className="product-list-btn flex items-center gap-2 flex-wrap justify-center">
                    <a href={`/produto/${product.url}`} className="w-full text-center bg-primary-500 text-fontPrimary-50 rounded-full px-6 py-2">
                      Comprar
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};
