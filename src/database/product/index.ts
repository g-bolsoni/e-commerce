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
