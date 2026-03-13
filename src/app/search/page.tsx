import { ProductGrid } from "@/components/ProductCard";
import { searchProducts } from "@/services/dummyjson";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { text?: string };
}) {
  const searchText = searchParams.text || "";

  // Busca produtos da API DummyJSON
  const result = searchText ? await searchProducts(searchText, 30) : null;
  const products = result?.products || [];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">
        {searchText ? (
          <>
            Resultados para:{" "}
            <span className="text-primary-500">{searchText}</span>
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({products.length} produtos encontrados)
            </span>
          </>
        ) : (
          "Digite algo para buscar"
        )}
      </h1>

      {products.length === 0 && searchText ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum produto encontrado.</p>
          <p className="text-gray-400 mt-2">
            Tente buscar por outros termos como &quot;phone&quot;,
            &quot;laptop&quot; ou &quot;beauty&quot;
          </p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
