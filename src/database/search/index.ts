"use server";

import mongoose from "mongoose";
import connectDB from "..";
import Product from "../models/ProductModel";

export async function searchProductsByName(searchTerm: string) {
  await connectDB();
  const db = mongoose.connection.db;

  try {
    if (!searchTerm || typeof searchTerm !== "string" || searchTerm.trim() === "") {
      throw new Error("searchTerm inválido");
    }

    const products = await Product.find({
      "product_description.name": "Oculos",
    })
      .select("product_id image price product_description.name")
      .limit(10);

    return products;
  } catch (error) {
    console.error("Erro ao buscar produtos pelo nome:", error);
    return [];
  }
}
