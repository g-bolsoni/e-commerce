"use client";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

export function BuyNowButton({ productId }: { productId: number }) {
  const { addProduct } = useCart();
  const router = useRouter();

  const handleBuyNow = async () => {
    await addProduct(productId);
    // router.push("/checkout");
  };

  return (
    <button
      onClick={handleBuyNow}
      className="w-full lg:w-auto lg:flex-[1_0_180px] bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base hover:from-primary-600 hover:to-primary-700 transition-all active:scale-[0.98] shadow-lg shadow-primary-500/25"
    >
      Comprar Agora
    </button>
  );
}
