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
    <div className="product flex flex-col w-full gap-4 relative group/product">
      <div className="rounded-xl w-full bg-white relative overflow-hidden">
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
        <Link href={`/produto/${product.id}`}>
          <div className="w-full h-full bg-secondary-100 rounded-xl flex items-center justify-center py-5">
            <Image
              src={product.thumbnail}
              className="w-full h-full max-w-80 max-h-80 object-contain rounded-lg transition-transform group-hover/product:scale-105"
              alt={product.title}
              width={320}
              height={320}
            />
          </div>
        </Link>
      </div>

      <div className="product_list_information flex flex-col gap-3 relative w-full">
        <div className="product_title flex flex-col gap-1 justify-center">
          <span className="text-xs text-secondary-400 uppercase">
            {product.brand || product.category}
          </span>
          <span className="text-sm font-normal md:text-base text-fontSecondary-900 line-clamp-2">
            {product.title}
          </span>
        </div>

        <div className="product_prices flex flex-col gap-1">
          {hasDiscount && (
            <span className="text-sm text-secondary-400 line-through">
              {formatPrice(product.price)}
            </span>
          )}
          <span className="text-lg font-bold text-primary-500">
            {formatPrice(discountedPrice)}
          </span>
          <span className="text-xs text-secondary-500">
            ou 10x de {formatPrice(discountedPrice / 10)}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-4 h-4 ${
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
          <span className="text-xs text-secondary-500 ml-1">
            ({product.rating.toFixed(1)})
          </span>
        </div>

        <div className="product-list-btn flex items-center gap-2 flex-wrap justify-center">
          <Link
            href={`/produto/${product.id}`}
            className="w-full text-center bg-primary-500 text-fontPrimary-50 rounded-full px-6 py-2 hover:bg-primary-600 transition-colors"
          >
            Comprar
          </Link>
        </div>
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
    <div className="list-products relative py-8">
      <span className="list_title flex w-full flex-col items-center my-4 font-bold text-lg lg:text-xl">
        {title}
      </span>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
          1280: { slidesPerView: 5, spaceBetween: 30 },
        }}
        className="!pb-12"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
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
    <div className="products w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-4 md:px-0">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
