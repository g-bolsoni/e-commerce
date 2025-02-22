import { formatPrice } from "@/util/format";
import React from "react";
import { IProduct, ProductSpecial } from "@/database/models/ProductModel";

const Prices = ({ product }: { product: IProduct }) => {
  const customerGroupId = 8;
  const originalPrice = parseFloat(product.price);

  // Verifica se há promoção válida
  let promotion: ProductSpecial | null = null;
  if (product.product_special && product.product_special.length > 0) {
    promotion = getValidPromotion(product.product_special, customerGroupId);
  }

  // Calcula o preço com desconto, se houver promoção
  let discountedPrice: number | null = null;
  if (promotion) {
    const promoValue = parseFloat(promotion.price);
    if (promotion.price_type === 0) {
      // Desconto em valor fixo
      discountedPrice = originalPrice - promoValue;
    } else if (promotion.price_type === 1) {
      // Desconto em percentual
      discountedPrice = originalPrice - originalPrice * (promoValue / 100);
    }
  }

  return (
    <div className="prices flex flex-col gap-1">
      {discountedPrice !== null ? (
        <>
          {/* Exibe o preço original riscado */}
          <span className="font-bold text-md md:text-lg text-fontSecondary-900 line-through">{formatPrice(originalPrice)}</span>
          {/* Exibe o novo preço promocional */}
          <span className="font-bold text-md md:text-lg text-fontSecondary-900">{promotion?.payment_select !== "null-payment" ? `Por ${formatPrice(discountedPrice)} no ${promotion?.payment_select}` : `Por ${formatPrice(discountedPrice)}`}</span>
        </>
      ) : (
        // Se não houver promoção, exibe apenas o preço original
        <span className="font-bold text-md md:text-lg text-fontSecondary-900">{formatPrice(originalPrice)}</span>
      )}
    </div>
  );
};

export default Prices;

/**
 * Filtra e retorna uma promoção válida para o grupo de cliente informado
 * considerando as datas de início e fim.
 */
function getValidPromotion(promotions: ProductSpecial[], customerGroupId: number): ProductSpecial | null {
  const now = new Date();

  const validPromos = promotions.filter((promo) => {
    if (promo.customer_group_id !== customerGroupId) return false;

    const start = new Date(promo.date_start);
    const end = new Date(promo.date_end);

    return now >= start && now <= end;
  });

  if (validPromos.length === 0) return null;

  // Ordena por prioridade (menor valor tem maior prioridade)
  validPromos.sort((a, b) => a.priority - b.priority);

  return validPromos[0];
}
