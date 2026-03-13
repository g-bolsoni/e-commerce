import { getProductsByCategory, getCategories } from "@/services/dummyjson";
import { ProductGrid } from "@/components/ProductCard";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default async function CategoryPage({ params }: Props) {
  const categorySlug = decodeURIComponent(params.slug);

  // Verifica se a categoria existe
  const categories = await getCategories();
  const categoryExists = categories.find((c) => c.slug === categorySlug);

  if (!categoryExists) {
    notFound();
  }

  // Busca produtos da categoria
  const result = await getProductsByCategory(categorySlug, 30);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium capitalize">
              {categoryExists.name}
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 capitalize">
          {categoryExists.name}
        </h1>
        <p className="text-gray-500 mt-2">
          {result.total} produtos encontrados
        </p>
      </div>

      {result.products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Nenhum produto encontrado nesta categoria.
          </p>
        </div>
      ) : (
        <ProductGrid products={result.products} />
      )}
    </div>
  );
}

// Gera páginas estáticas para as categorias
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}
