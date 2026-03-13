"use client";

import Image from "next/image";
import Link from "next/link";
import { DummyProduct } from "@/types/dummyjson";
import { formatPrice, calculateDiscountedPrice } from "@/services/dummyjson";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductCardProps {
  product: DummyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discountPercentage,
  );
  const hasDiscount = product.discountPercentage > 0;

  return (
    <div className="product flex flex-col w-full gap-2 sm:gap-3 md:gap-4 relative group/product bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="rounded-lg sm:rounded-xl w-full bg-secondary-50 relative overflow-hidden aspect-square">
        {hasDiscount && (
          <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full z-10">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
        <Link href={`/produto/${product.id}`} className="block w-full h-full">
          <div className="w-full h-full flex items-center justify-center p-2 sm:p-4">
            <Image
              src={product.thumbnail}
              className="w-full h-full object-contain transition-transform duration-300 group-hover/product:scale-105"
              alt={product.title}
              width={280}
              height={280}
              sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 25vw, 20vw"
            />
          </div>
        </Link>
      </div>

      <div className="product_list_information flex flex-col gap-1.5 sm:gap-2 md:gap-3 relative w-full">
        <div className="product_title flex flex-col gap-0.5 sm:gap-1">
          <span className="text-[10px] sm:text-xs text-secondary-400 uppercase truncate">
            {product.brand || product.category}
          </span>
          <span className="text-xs sm:text-sm md:text-base font-medium text-gray-800 line-clamp-2 leading-tight">
            {product.title}
          </span>
        </div>

        <div className="product_prices flex flex-col">
          {hasDiscount && (
            <span className="text-[10px] sm:text-xs text-secondary-400 line-through">
              {formatPrice(product.price)}
            </span>
          )}
          <span className="text-sm sm:text-base md:text-lg font-bold text-primary-500">
            {formatPrice(discountedPrice)}
          </span>
          <span className="text-[10px] sm:text-xs text-secondary-500 hidden sm:block">
            ou 10x de {formatPrice(discountedPrice / 10)}
          </span>
        </div>

        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-3 h-3 sm:w-4 sm:h-4 ${
                star <= Math.round(product.rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-[10px] sm:text-xs text-secondary-500 ml-0.5">
            ({product.rating.toFixed(1)})
          </span>
        </div>

        <Link
          href={`/produto/${product.id}`}
          className="w-full text-center bg-primary-500 text-white rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium hover:bg-primary-600 transition-colors mt-1"
        >
          Comprar
        </Link>
      </div>
    </div>
  );
}

interface ProductListCarouselProps {
  title: string;
  products: DummyProduct[];
}

export function ProductListCarousel({
  title,
  products,
}: ProductListCarouselProps) {
  return (
    <div className="list-products relative py-4 sm:py-6 md:py-8">
      <h2 className="list_title text-center mb-4 sm:mb-6 font-bold text-base sm:text-lg lg:text-xl text-gray-800">
        {title}
      </h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={12}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 12 },
          640: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
          1280: { slidesPerView: 5, spaceBetween: 24 },
        }}
        className="!pb-10 sm:!pb-12 px-1"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="!h-auto">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

interface ProductGridProps {
  products: DummyProduct[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
