"use server";

import { error } from "console";
import Product from "../models/ProductModel";

export async function searchProductByUrl(url: string) {
  try {
    if (!url || typeof url !== "string" || url.trim() === "") {
      throw new Error("Url inválida");
    }

    // define pipeline
    const agg = [
      {
        $match: {
          url: url,
        },
      },
    ];
    const products = await Product.aggregate(agg);

    return JSON.parse(JSON.stringify(products));
  } catch (e) {
    error("Erro ao buscar produtos pela url:");
    error(e);
    return [];
  }
}

export async function searchProductById(productId: number) {
  try {
    if (!productId || typeof productId !== "number") {
      throw new Error("ID do produto inválido");
    }

    const product = await Product.findOne({ product_id: productId });

    if (!product) {
      return null;
    }

    return JSON.parse(JSON.stringify(product));
  } catch (e) {
    error("Erro ao buscar produto pelo ID:");
    error(e);
    return null;
  }
}
