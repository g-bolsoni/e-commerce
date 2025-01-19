import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/database";

export default async function getProducts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("store"); // Substitua pelo nome do banco
    const products = await db.collection("products").find({}).toArray();

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res
      .status(500)
      .json({ success: false, error: "Falha ao buscar os produtos." });
  }
}
