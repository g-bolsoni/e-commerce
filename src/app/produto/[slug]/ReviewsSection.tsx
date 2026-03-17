"use client";

import { useState } from "react";
import {
  MdStar,
  MdStarHalf,
  MdStarOutline,
  MdThumbUp,
  MdVerified,
} from "react-icons/md";
import { DummyReview } from "@/types/dummyjson";

interface ReviewsSectionProps {
  reviews: DummyReview[];
  rating: number;
}

export function ReviewsSection({ reviews, rating }: ReviewsSectionProps) {
  const [visibleCount, setVisibleCount] = useState(3);

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "sm") => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <MdStar key={i} className={`${sizeClasses[size]} text-amber-400`} />,
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <MdStarHalf
            key={i}
            className={`${sizeClasses[size]} text-amber-400`}
          />,
        );
      } else {
        stars.push(
          <MdStarOutline
            key={i}
            className={`${sizeClasses[size]} text-gray-300`}
          />,
        );
      }
    }
    return stars;
  };

  // Calcular distribuição de estrelas
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
    percentage:
      (reviews.filter((r) => Math.round(r.rating) === star).length /
        reviews.length) *
        100 || 0,
  }));

  if (reviews.length === 0) return null;

  return (
    <section className="mt-10 sm:mt-16">
      <div className="border-t border-gray-200 pt-8 sm:pt-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
          Avaliações dos Clientes
        </h2>

        {/* Resumo das Avaliações */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 sm:mb-10 p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100">
          {/* Média Geral */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
              {rating.toFixed(1)}
            </div>
            <div className="flex items-center gap-1 mb-2">
              {renderStars(rating, "lg")}
            </div>
            <p className="text-sm text-gray-500">
              Baseado em {reviews.length} avaliação
              {reviews.length !== 1 ? "ões" : ""}
            </p>
          </div>

          {/* Distribuição de Estrelas */}
          <div className="md:col-span-2 space-y-2">
            {ratingDistribution.map(({ star, count, percentage }) => (
              <div key={star} className="flex items-center gap-2 sm:gap-3">
                <span className="text-sm text-gray-600 w-3">{star}</span>
                <MdStar className="w-4 h-4 text-amber-400" />
                <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de Reviews */}
        <div className="space-y-4 sm:space-y-6">
          {reviews.slice(0, visibleCount).map((review, index) => (
            <article
              key={index}
              className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-sm">
                  {review.reviewerName.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                        {review.reviewerName}
                      </h4>
                      <MdVerified
                        className="w-4 h-4 text-green-500 flex-shrink-0"
                        title="Compra verificada"
                      />
                    </div>
                    <time className="text-xs sm:text-sm text-gray-400">
                      {new Date(review.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {renderStars(review.rating, "sm")}
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Comentário */}
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {review.comment}
                  </p>

                  {/* Ações */}
                  <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
                    <button className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-primary-500 transition-colors">
                      <MdThumbUp className="w-4 h-4" />
                      <span>Útil</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Botão Ver Mais */}
        {visibleCount < reviews.length && (
          <div className="flex justify-center mt-6 sm:mt-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-full transition-colors text-sm sm:text-base"
            >
              Ver mais avaliações ({reviews.length - visibleCount} restantes)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
