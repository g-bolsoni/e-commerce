"use client";

import { useState, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import {
  searchProducts,
  formatPrice,
  calculateDiscountedPrice,
} from "@/services/dummyjson";
import Image from "next/image";
import { MdClose, MdSearch } from "react-icons/md";
import { Modal } from "flowbite-react";
import Link from "next/link";
import { DummyProduct } from "@/types/dummyjson";

export const Search = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<DummyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Cria a função debounced apenas uma vez
  const debouncedSearch = useRef(
    debounce(async (query: string) => {
      if (query.length > 1) {
        setIsLoading(true);
        try {
          const response = await searchProducts(query, 12);
          setResults(response.products);
        } catch (error) {
          console.error("Erro na busca:", error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 500),
  );

  // Chama a função debounced sempre que searchText mudar
  useEffect(() => {
    debouncedSearch.current(searchText);
  }, [searchText]);

  // Cancela o debounce ao desmontar o componente
  useEffect(() => {
    return () => {
      debouncedSearch.current.cancel();
    };
  }, []);

  const handleClearSearch = () => {
    setSearchText("");
    setResults([]);
  };

  const handleProductClick = () => {
    setOpenModal(false);
    setSearchText("");
    setResults([]);
  };

  return (
    <>
      {/* Search Button */}
      <button
        type="button"
        aria-label="Buscar produtos"
        onClick={() => setOpenModal(true)}
        className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors group"
      >
        <MdSearch className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-primary-500 transition-colors" />
      </button>

      {/* Search Modal */}
      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm [&>div]:!bg-transparent [&>div]:max-w-none [&>div]:w-full [&>div]:h-full [&>div]:p-0 [&>div]:m-0 [&>div>div]:!bg-transparent [&>div>div]:!shadow-none [&>div>div]:h-full"
      >
        <div className="min-h-full flex flex-col items-center pt-4 sm:pt-8 px-3 sm:px-4">
          {/* Search Input Container */}
          <div className="w-full max-w-4xl">
            <div className="relative">
              <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="search"
                className="w-full h-12 sm:h-14 bg-white border-0 text-gray-900 text-base sm:text-lg rounded-xl shadow-lg outline-none focus:ring-2 focus:ring-primary-500 pl-12 pr-12 placeholder:text-gray-400"
                placeholder="O que você está procurando?"
                autoFocus
                autoComplete="off"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {searchText.length > 0 && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={handleClearSearch}
                >
                  <MdClose className="w-5 h-5 text-gray-500" />
                </button>
              )}
            </div>
          </div>

          {/* Results Container */}
          <div className="w-full max-w-4xl mt-4">
            {/* Loading State */}
            {isLoading && (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="inline-flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-gray-500">Buscando produtos...</span>
                </div>
              </div>
            )}

            {/* Results Grid */}
            {!isLoading && results.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 overflow-y-auto max-h-[70vh]">
                <p className="text-sm text-gray-500 mb-4">
                  {results.length} produto{results.length !== 1 ? "s" : ""}{" "}
                  encontrado{results.length !== 1 ? "s" : ""}
                </p>
                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {results.map((product) => {
                    const discountedPrice = calculateDiscountedPrice(
                      product.price,
                      product.discountPercentage,
                    );
                    return (
                      <li key={product.id}>
                        <Link
                          href={`/produto/${product.id}`}
                          className="group block bg-gray-50 rounded-xl p-3 hover:shadow-md transition-shadow"
                          onClick={handleProductClick}
                        >
                          <div className="aspect-square bg-white rounded-lg flex items-center justify-center p-2 mb-3">
                            <Image
                              src={product.thumbnail}
                              alt={product.title}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                              width={200}
                              height={200}
                            />
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 leading-tight">
                              {product.title}
                            </h3>
                            <p className="text-sm sm:text-base font-bold text-primary-500">
                              {formatPrice(discountedPrice)}
                            </p>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && searchText.length > 1 && results.length === 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <MdSearch className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-sm text-gray-500">
                  Tente buscar por outro termo ou categoria
                </p>
              </div>
            )}

            {/* Initial State - Search Suggestions */}
            {!isLoading && searchText.length <= 1 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Sugestões populares
                </p>
                <div className="flex flex-wrap gap-2">
                  {["iPhone", "Laptop", "Perfume", "Skincare", "Sapatos"].map(
                    (suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => setSearchText(suggestion)}
                        className="px-3 py-1.5 bg-gray-100 text-sm text-gray-700 rounded-full hover:bg-primary-100 hover:text-primary-600 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
