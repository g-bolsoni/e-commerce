import { ProductGrid } from "@/components/ProductCard";
import { getProductsByCategory, getCategories } from "@/services/dummyjson";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // Verifica se a categoria existe
  const categories = await getCategories();
  const categoryExists = categories.some((cat) => cat.slug === slug);

  if (!categoryExists) {
    notFound();
  }

  const response = await getProductsByCategory(slug, 20);

  if (!response.products || response.products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl text-gray-900 capitalize font-bold mb-6">
          {slug.replace(/-/g, " ")}
        </h1>
        <p className="text-gray-500">
          Nenhum produto encontrado nesta categoria.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl text-gray-900 capitalize font-bold mb-6">
        {slug.replace(/-/g, " ")}
      </h1>
      <ProductGrid products={response.products} />
    </div>
  );
}
