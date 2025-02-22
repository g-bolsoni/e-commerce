import { Products } from "@/components/Product";
import { searchProductsByName } from "@/database/search";

// Esta função é executada no servidor (server component)
export default async function SearchPage({ searchParams }: { searchParams: { text?: string } }) {
  // Obtém o termo de busca da query string
  const searchText = searchParams.text || "";

  // Busca os produtos apenas se houver um termo definido
  const products = searchText ? await searchProductsByName(searchText) : [];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">
        Resultados para: <span className="text-secondary">{searchText}</span>
      </h1>

      {products.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <div className="products w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center lg:justify-items-center gap-16 md:gap-16 px-4 py-4 md:px-0">
          <Products products={products} />
        </div>
      )}
    </div>
  );
}
