"use server";

import { error } from "console";
import ProductListModel from "../models/ProductListModel";
import { IProductList } from "@/types/product_list";

export async function getProductList(): Promise<IProductList[]> {
  try {
    // define pipeline
    const agg = [
      {
        $match: {
          name: "Os mais vendidos",
          status: "1",
        },
      },
    ];

    const products_list = await ProductListModel.aggregate(agg);

    return JSON.parse(JSON.stringify(products_list));
  } catch (e) {
    error("Erro ao carregar as listas de produtos:");
    error(e);
    return [];
  }
}
