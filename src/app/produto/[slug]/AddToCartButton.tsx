"use client";

import { useCart } from "@/hooks/useCart";

interface AddToCartButtonProps {
  productId: number;
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addProduct } = useCart();

  const handleAddToCart = () => {
    addProduct(productId);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full lg:w-auto lg:flex-[1_0_240px] bg-white text-primary-600 py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base border-2 border-primary-500 hover:bg-primary-50 transition-all active:scale-[0.98]"
    >
      Adicionar ao Carrinho
    </button>
  );
}
