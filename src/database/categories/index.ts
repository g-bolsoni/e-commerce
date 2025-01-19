import clientPromise from "@/database";

export async function getProductsByCategory(categoryName: string) {
  const client = await clientPromise;
  const db = client.db("store");
  const collection = db.collection("products");

  try {
    const products = await collection
      .find({
        "product_to_category.name": categoryName,
      })
      .toArray();

    return products;
  } catch (error) {
    console.error("Erro ao buscar produtos pela categoria:", error);
    throw new Error("Falha ao buscar os produtos.");
  }
}
