import {
  getProductById,
  getProductsByCategory,
  formatPrice,
  calculateDiscountedPrice,
} from "@/services/dummyjson";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MdStar, MdLocalShipping, MdVerified, MdShield } from "react-icons/md";
import { ProductListCarousel } from "@/components/ProductCard";

interface Props {
  params: { slug: string };
}

export default async function ProductPage({ params }: Props) {
  const productId = parseInt(params.slug);

  if (isNaN(productId)) {
    notFound();
  }

  let product;
  try {
    product = await getProductById(productId);
  } catch {
    notFound();
  }

  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discountPercentage,
  );
  const hasDiscount = product.discountPercentage > 0;

  // Busca produtos relacionados da mesma categoria
  const relatedProducts = await getProductsByCategory(product.category, 10);
  const filteredRelated = relatedProducts.products.filter(
    (p) => p.id !== product.id,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <a href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </a>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <a
              href={`/categoria/${product.category}`}
              className="text-gray-500 hover:text-gray-700 capitalize"
            >
              {product.category}
            </a>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 font-medium truncate max-w-[200px]">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Galeria de Imagens */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-secondary-100 rounded-2xl overflow-hidden">
            {hasDiscount && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full z-10">
                -{Math.round(product.discountPercentage)}% OFF
              </span>
            )}
            <Image
              src={product.images[0] || product.thumbnail}
              alt={product.title}
              fill
              className="object-contain p-8"
              priority
            />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="aspect-square bg-secondary-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-primary-500"
                >
                  <Image
                    src={image}
                    alt={`${product.title} - Imagem ${index + 1}`}
                    width={100}
                    height={100}
                    className="object-contain w-full h-full p-2"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Informações do Produto */}
        <div className="flex flex-col gap-6">
          {/* Categoria e Marca */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-secondary-500 uppercase">
              {product.category}
            </span>
            {product.brand && (
              <>
                <span className="text-secondary-300">•</span>
                <span className="text-sm text-primary-500 font-medium">
                  {product.brand}
                </span>
              </>
            )}
          </div>

          {/* Título */}
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <MdStar
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating.toFixed(1)} ({product.reviews.length} avaliações)
            </span>
          </div>

          {/* Preço */}
          <div className="space-y-2">
            {hasDiscount && (
              <p className="text-lg text-gray-400 line-through">
                {formatPrice(product.price)}
              </p>
            )}
            <p className="text-3xl lg:text-4xl font-bold text-primary-500">
              {formatPrice(discountedPrice)}
            </p>
            <p className="text-sm text-gray-500">
              ou 12x de {formatPrice(discountedPrice / 12)} sem juros
            </p>
            <p className="text-sm text-success-600 font-medium">
              {formatPrice(discountedPrice * 0.95)} à vista com 5% de desconto
            </p>
          </div>

          {/* Disponibilidade */}
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.stock > 0
                  ? "bg-success-100 text-success-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.availabilityStatus}
            </span>
            {product.stock > 0 && product.stock <= 10 && (
              <span className="text-sm text-orange-600">
                Apenas {product.stock} em estoque!
              </span>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col gap-3">
            <button className="w-full bg-primary-500 text-white py-4 px-8 rounded-full font-semibold text-lg hover:bg-primary-600 transition-colors">
              Comprar Agora
            </button>
            <button className="w-full bg-secondary-100 text-primary-500 py-4 px-8 rounded-full font-semibold text-lg hover:bg-secondary-200 transition-colors">
              Adicionar ao Carrinho
            </button>
          </div>

          {/* Informações de Entrega */}
          <div className="bg-secondary-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <MdLocalShipping className="text-success-500 text-xl" />
              <div>
                <p className="font-medium text-gray-900">
                  {product.shippingInformation}
                </p>
                <p className="text-sm text-gray-500">
                  Consulte prazo e valor do frete
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MdVerified className="text-info-500 text-xl" />
              <div>
                <p className="font-medium text-gray-900">
                  {product.warrantyInformation}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MdShield className="text-primary-500 text-xl" />
              <div>
                <p className="font-medium text-gray-900">
                  {product.returnPolicy}
                </p>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Descrição do Produto
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary-100 text-secondary-600 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Avaliações */}
      {product.reviews.length > 0 && (
        <div className="mt-12 border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Avaliações dos Clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white border rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                    {review.reviewerName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {review.reviewerName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <MdStar
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Produtos Relacionados */}
      {filteredRelated.length > 0 && (
        <div className="mt-12">
          <ProductListCarousel
            title="Produtos Relacionados"
            products={filteredRelated}
          />
        </div>
      )}
    </div>
  );
}
