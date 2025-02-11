import { Products } from "@/components/Product";
import { getProductsByCategory } from "@/database/categories";

interface CategoryPageProps {
  params: { slug: string };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const products = await getProductsByCategory(params.slug);

  if (!products || products.length === 0) {
    return <div>Nenhum produto encontrado para a categoria: {params.slug}</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-xl leading-6 md:text-4xl md:leading-9 text-secondary-900 capitalize font-bold my-8">{params.slug}</h1>
      <div className="products w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center lg:justify-items-center gap-16 md:gap-16 px-4 py-4 md:px-0">
        <Products products={products} />
      </div>
    </div>
  );
};

export default CategoryPage;
