"use server";

import mongoose from "mongoose";
import connectDB from "..";
import Product from "../models/ProductModel";

export async function getProductsByCategory(categoryName: string) {
  await connectDB();
  const db = mongoose.connection.db;

  try {
    const products = await Product.find({
      "product_to_category.name": { $regex: new RegExp(`^${categoryName}$`, "i") },
    });

    return products;
  } catch (error) {
    console.error("Erro ao buscar produtos pela categoria:", error);
    return [];
    throw new Error("Falha ao buscar os produtos.");
  }
}
