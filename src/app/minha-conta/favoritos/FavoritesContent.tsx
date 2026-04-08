"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";
import { DummyProduct } from "@/types/dummyjson";
import { formatPrice, calculateDiscountedPrice } from "@/services/dummyjson";
import { MdClose } from "react-icons/md";

export default function FavoritesContent() {
  const { favorites, removeFavorite } = useFavorites();
  const [products, setProducts] = useState<DummyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      if (favorites.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        const fetched = await Promise.all(
          favorites.map(async (id) => {
            const res = await fetch(`https://dummyjson.com/products/${id}`);
            if (!res.ok) return null;
            return res.json() as Promise<DummyProduct>;
          }),
        );
        setProducts(fetched.filter((p): p is DummyProduct => p !== null));
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [favorites]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
            <div className="aspect-square bg-secondary-200 rounded-lg mb-3" />
            <div className="h-3 bg-secondary-200 rounded w-2/3 mb-2" />
            <div className="h-4 bg-secondary-100 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg p-10 text-center">
        <p className="text-secondary-500 text-sm">
          Você ainda não adicionou nenhum produto aos favoritos.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 bg-primary-500 text-white rounded-full px-6 py-2.5 text-sm font-medium hover:bg-primary-600 transition-colors"
        >
          Explorar produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {products.map((product) => {
        const discountedPrice = calculateDiscountedPrice(
          product.price,
          product.discountPercentage,
        );
        const hasDiscount = product.discountPercentage > 0;

        return (
          <div
            key={product.id}
            className="bg-white rounded-xl p-3 relative group"
          >
            <button
              type="button"
              onClick={() => removeFavorite(product.id)}
              className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
              aria-label="Remover dos favoritos"
            >
              <MdClose size={16} className="text-red-500" />
            </button>

            <Link href={`/produto/${product.id}`}>
              <div className="aspect-square bg-secondary-50 rounded-lg overflow-hidden flex items-center justify-center p-2 mb-3">
                {hasDiscount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    -{Math.round(product.discountPercentage)}%
                  </span>
                )}
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="object-contain w-full h-full"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] text-secondary-400 uppercase">
                  {product.brand || product.category}
                </span>
                <p className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2">
                  {product.title}
                </p>
                <div>
                  {hasDiscount && (
                    <span className="text-[10px] text-secondary-400 line-through block">
                      {formatPrice(product.price)}
                    </span>
                  )}
                  <span className="text-sm font-bold text-primary-500">
                    {formatPrice(discountedPrice)}
                  </span>
                </div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-3 h-3 ${
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
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
