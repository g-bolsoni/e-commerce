"use server";

import Product from "../models/ProductModel";

export async function searchProductsByName(searchTerm: string) {
  try {
    if (!searchTerm || typeof searchTerm !== "string" || searchTerm.trim() === "") {
      throw new Error("searchTerm inválido");
    }

    // define pipeline
    const agg = [
      {
        $search: {
          index: "autocomplete_index",
          autocomplete: {
            query: searchTerm,
            path: "product_description.name",
          },
        },
      },
      {
        $project: {
          "product_description.name": 1,
          image: 1,
          price: 1,
          product_special: 1,
        },
      },
      {
        $limit: 10,
      },
    ];

    // run pipeline
    const products = await Product.aggregate(agg);

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Erro ao buscar produtos pelo nome:", error);
    return [];
  }
}
