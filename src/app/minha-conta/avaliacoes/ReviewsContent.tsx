"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DummyProduct, DummyReview } from "@/types/dummyjson";

interface ReviewWithProduct {
  review: DummyReview;
  product: DummyProduct;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsContent({ userName }: { userName: string }) {
  const [reviews, setReviews] = useState<ReviewWithProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=12");
        const data = await res.json();

        const userReviews: ReviewWithProduct[] = [];
        data.products.forEach((product: DummyProduct) => {
          if (product.reviews && product.reviews.length > 0) {
            // Pega a primeira review de cada produto como se fosse do usuário
            const review = {
              ...product.reviews[0],
              reviewerName: userName,
            };
            userReviews.push({ review, product });
          }
        });

        setReviews(userReviews.slice(0, 8));
      } catch {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [userName]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-secondary-200 rounded-lg" />
              <div className="flex-1">
                <div className="h-4 bg-secondary-200 rounded w-1/3 mb-2" />
                <div className="h-3 bg-secondary-100 rounded w-1/2 mb-2" />
                <div className="h-3 bg-secondary-100 rounded w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg p-10 text-center">
        <p className="text-secondary-500 text-sm">
          Você ainda não fez nenhuma avaliação.
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
    <div className="space-y-4">
      {reviews.map(({ review, product }) => (
        <div key={product.id} className="bg-white rounded-lg p-4 md:p-6">
          <div className="flex gap-3 md:gap-4">
            <Link href={`/produto/${product.id}`} className="shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-secondary-50 rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </Link>

            <div className="flex-1 min-w-0">
              <Link
                href={`/produto/${product.id}`}
                className="text-sm font-medium text-gray-800 hover:text-primary-500 line-clamp-1 transition-colors"
              >
                {product.title}
              </Link>

              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={review.rating} />
                <span className="text-xs text-secondary-500">
                  {new Date(review.date).toLocaleDateString("pt-BR")}
                </span>
              </div>

              <p className="text-sm text-secondary-600 mt-2 line-clamp-2">
                {review.comment}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
