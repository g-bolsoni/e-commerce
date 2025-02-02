"use server";

import mongoose from "mongoose";
import connectDB from "..";
import Product from "../models/ProductModel";

export async function getProducts() {
  try {
    await connectDB();
    const db = mongoose.connection.db;

    const products = await Product.find();

    return products;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}
