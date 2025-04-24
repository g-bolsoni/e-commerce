"use client";

import { getProductList } from "@/database/prodcutList";
import { useSwiper } from "swiper/react";
import Link from "next/link";
import Prices from "../Prices/page";
import { ProductInfo } from "@/types/product";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

interface ProductListProps {
  name: string;
  products: ProductInfo[];
  carousel: {
    is_carousel: boolean;
    desktop_itens: number;
    tablet_itens: number;
    mobile_itens: number;
  };
}

export async function ProductList(data: ProductListProps) {
  return (
    <>
      <div className="list-products relative">
        <span className="list_title flex w-full flex-col items-center my-4 font-bold text-lg lg:text-xl">{data.name}</span>

        <Swiper
          modules={[Navigation, Pagination]}
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
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
          style={{ position: "unset" }}
        >
          <div className="swiper_buttons flex gap-2 absolute top-1 right-0 z-10">
            <SwiperButtonPrev className="w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="fill-primary-500 w-4 h-4">
                <path d="m142-480 294 294q15 15 14.5 35T435-116q-15 15-35 15t-35-15L57-423q-12-12-18-27t-6-30q0-15 6-30t18-27l308-308q15-15 35.5-14.5T436-844q15 15 15 35t-15 35L142-480Z"></path>
              </svg>
            </SwiperButtonPrev>
            <SwiperButtonNext className="w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="fill-primary-500 w-4 h-4">
                <path d="M579-480 285-774q-15-15-14.5-35.5T286-845q15-15 35.5-15t35.5 15l307 308q12 12 18 27t6 30q0 15-6 30t-18 27L356-115q-15 15-35 14.5T286-116q-15-15-15-35.5t15-35.5l293-293Z"></path>
              </svg>
            </SwiperButtonNext>
          </div>
          <div className={`products ${!data.carousel.is_carousel ? "w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center lg:justify-items-center gap-16 md:gap-16 px-4 py-4 md:px-0" : ""} `}>
            {data.products.map((product) => {
              const imageUrl = product.image ? product.image : "/images/no_image.jpg";
              return (
                <SwiperSlide key={product.product_id} className="max-w-max">
                  <div className="product flex flex-col w-full gap-4 relative group/product">
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
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      </div>
    </>
  );
}

const SwiperButtonNext = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const swiper = useSwiper();
  return (
    <button onClick={() => swiper.slideNext()} className={className}>
      {children}
    </button>
  );
};

const SwiperButtonPrev = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const swiper = useSwiper();
  return (
    <button onClick={() => swiper.slidePrev()} className={className}>
      {children}
    </button>
  );
};

const Products = (data: ProductListProps) => {
  return <></>;
};
