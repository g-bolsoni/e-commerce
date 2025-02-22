"use server";

import { log } from "console";
import Product from "../models/ProductModel";

export async function getProductsByCategory(categoryName: string) {
  try {
    const products = await Product.find({
      "product_to_category.name": { $regex: new RegExp(`^${categoryName}$`, "i") },
    });

    return products;
  } catch (error) {
    log("Erro ao buscar produtos pela categoria:", error);

    return [];
  }
}
