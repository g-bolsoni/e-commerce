"use client";

import Image from "next/image";
import { useState } from "react";
import { MdChevronLeft, MdChevronRight, MdZoomIn } from "react-icons/md";

interface ImageGalleryProps {
  images: string[];
  title: string;
  discountPercentage?: number;
}

export function ImageGallery({
  images,
  title,
  discountPercentage = 0,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const hasDiscount = discountPercentage > 0;
  const displayImages = images.length > 0 ? images : ["/images/no_image.avif"];

  const handlePrevious = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Imagem Principal */}
      <div className="relative group">
        <div
          className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden cursor-zoom-in shadow-sm"
          onClick={() => setIsZoomed(!isZoomed)}
        >
          {/* Badge de Desconto */}
          {hasDiscount && (
            <span className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full z-10 shadow-lg">
              -{Math.round(discountPercentage)}% OFF
            </span>
          )}

          {/* Botão de Zoom */}
          <button
            className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(!isZoomed);
            }}
          >
            <MdZoomIn className="w-5 h-5 text-gray-700" />
          </button>

          {/* Imagem */}
          <Image
            src={displayImages[selectedIndex]}
            alt={`${title} - Imagem ${selectedIndex + 1}`}
            fill
            className={`object-contain p-6 sm:p-10 transition-transform duration-300 ${isZoomed ? "scale-150" : "scale-100"}`}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Navegação Mobile (Arrows) */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 active:scale-95"
                aria-label="Imagem anterior"
              >
                <MdChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 active:scale-95"
                aria-label="Próxima imagem"
              >
                <MdChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </button>
            </>
          )}
        </div>

        {/* Indicadores Mobile (Dots) */}
        {displayImages.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3 sm:hidden">
            {displayImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`no-min w-2 h-2 rounded-full transition-all ${
                  index === selectedIndex
                    ? "bg-primary-500 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails Desktop */}
      {displayImages.length > 1 && (
        <div className="hidden sm:grid grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
          {displayImages.slice(0, 6).map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden transition-all duration-200 ${
                index === selectedIndex
                  ? "ring-2 ring-primary-500 ring-offset-2 shadow-md"
                  : "hover:ring-2 hover:ring-gray-300 hover:shadow-sm"
              }`}
            >
              <Image
                src={image}
                alt={`${title} - Miniatura ${index + 1}`}
                fill
                className="object-contain p-2"
                sizes="100px"
              />
              {index === selectedIndex && (
                <div className="absolute inset-0 bg-primary-500/10" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Thumbnails Mobile (Horizontal Scroll) */}
      {displayImages.length > 1 && (
        <div className="flex sm:hidden gap-2 overflow-x-auto p-2 scrollbar-hide">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative flex-shrink-0 w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden transition-all ${
                index === selectedIndex
                  ? "ring-2 ring-primary-500"
                  : "ring-1 ring-gray-200"
              }`}
            >
              <Image
                src={image}
                alt={`${title} - Miniatura ${index + 1}`}
                fill
                className="object-contain p-1.5"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
