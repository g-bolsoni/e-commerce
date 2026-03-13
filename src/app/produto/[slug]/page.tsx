import {
  getProductById,
  getProductsByCategory,
  formatPrice,
  calculateDiscountedPrice,
} from "@/services/dummyjson";
import { DummyProduct } from "@/types/dummyjson";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MdStar, MdLocalShipping, MdVerified, MdShield } from "react-icons/md";
import { ProductListCarousel } from "@/components/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const productId = parseInt(slug);

  if (isNaN(productId)) {
    notFound();
  }

  let product: DummyProduct;
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
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-4 sm:mb-6 md:mb-8 overflow-x-auto"
      >
        <ol className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm whitespace-nowrap">
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
          <li className="text-gray-900 font-medium truncate max-w-[120px] sm:max-w-[200px]">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12">
        {/* Galeria de Imagens */}
        <div className="space-y-2 sm:space-y-4">
          <div className="relative aspect-square bg-secondary-100 rounded-xl sm:rounded-2xl overflow-hidden">
            {hasDiscount && (
              <span className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-red-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full z-10">
                -{Math.round(product.discountPercentage)}% OFF
              </span>
            )}
            <Image
              src={product.images[0] || product.thumbnail}
              alt={product.title}
              fill
              className="object-contain p-4 sm:p-8"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {product.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="aspect-square bg-secondary-100 rounded-md sm:rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-primary-500 transition-all"
                >
                  <Image
                    src={image}
                    alt={`${product.title} - Imagem ${index + 1}`}
                    width={100}
                    height={100}
                    className="object-contain w-full h-full p-1 sm:p-2"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Informações do Produto */}
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
          {/* Categoria e Marca */}
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-secondary-500 uppercase">
              {product.category}
            </span>
            {product.brand && (
              <>
                <span className="text-secondary-300">•</span>
                <span className="text-xs sm:text-sm text-primary-500 font-medium">
                  {product.brand}
                </span>
              </>
            )}
          </div>

          {/* Título */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <MdStar
                  key={star}
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    star <= Math.round(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-gray-600">
              {product.rating.toFixed(1)} ({product.reviews.length} avaliações)
            </span>
          </div>

          {/* Preço */}
          <div className="space-y-1 sm:space-y-2">
            {hasDiscount && (
              <p className="text-sm sm:text-base text-gray-400 line-through">
                {formatPrice(product.price)}
              </p>
            )}
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-500">
              {formatPrice(discountedPrice)}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              ou 12x de {formatPrice(discountedPrice / 12)} sem juros
            </p>
            <p className="text-xs sm:text-sm text-success-600 font-medium">
              {formatPrice(discountedPrice * 0.95)} à vista com 5% de desconto
            </p>
          </div>

          {/* Disponibilidade */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                product.stock > 0
                  ? "bg-success-100 text-success-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.availabilityStatus}
            </span>
            {product.stock > 0 && product.stock <= 10 && (
              <span className="text-xs sm:text-sm text-orange-600">
                Apenas {product.stock} em estoque!
              </span>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <button className="w-full bg-primary-500 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-full font-semibold text-sm sm:text-lg hover:bg-primary-600 transition-colors active:scale-[0.98]">
              Comprar Agora
            </button>
            <button className="w-full bg-secondary-100 text-primary-500 py-3 sm:py-4 px-6 sm:px-8 rounded-full font-semibold text-sm sm:text-lg hover:bg-secondary-200 transition-colors active:scale-[0.98]">
              Adicionar ao Carrinho
            </button>
          </div>

          {/* Informações de Entrega */}
          <div className="bg-secondary-50 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-3">
            <div className="flex items-start gap-2 sm:gap-3">
              <MdLocalShipping className="text-success-500 text-lg sm:text-xl flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 text-sm sm:text-base">
                  {product.shippingInformation}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Consulte prazo e valor do frete
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <MdVerified className="text-info-500 text-lg sm:text-xl flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 text-sm sm:text-base">
                  {product.warrantyInformation}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <MdShield className="text-primary-500 text-lg sm:text-xl flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 text-sm sm:text-base">
                  {product.returnPolicy}
                </p>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="border-t pt-4 sm:pt-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
              Descrição do Produto
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 sm:px-3 py-0.5 sm:py-1 bg-secondary-100 text-secondary-600 rounded-full text-xs sm:text-sm"
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
        <div className="mt-8 sm:mt-12 border-t pt-6 sm:pt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            Avaliações dos Clientes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                    {review.reviewerName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">
                      {review.reviewerName}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-1.5 sm:mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <MdStar
                      key={star}
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                        star <= review.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Produtos Relacionados */}
      {filteredRelated.length > 0 && (
        <div className="mt-8 sm:mt-12">
          <ProductListCarousel
            title="Produtos Relacionados"
            products={filteredRelated}
          />
        </div>
      )}
    </div>
  );
}
