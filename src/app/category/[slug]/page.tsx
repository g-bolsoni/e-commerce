import { getProductsByCategory } from "@/database/categories";

interface CategoryPageProps {
  params: { slug: string };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const products = await getProductsByCategory(params.slug);
  console.log(products);

  if (!products || products.length === 0) {
    return <div>Nenhum produto encontrado para a categoria: {params.slug}</div>;
  }

  return (
    <div>
      <h1>Produtos na Categoria: {params.slug}</h1>
      <ul>
        {products.map((product: any) => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
