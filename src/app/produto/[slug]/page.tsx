import {
  getProductById,
  getProductsByCategory,
  formatPrice,
  calculateDiscountedPrice,
} from "@/services/dummyjson";
import { DummyProduct } from "@/types/dummyjson";
import { notFound } from "next/navigation";
import {
  MdLocalShipping,
  MdVerified,
  MdShield,
  MdFavoriteBorder,
  MdShare,
  MdCreditCard,
  MdPix,
} from "react-icons/md";
import { ProductListCarousel } from "@/components/ProductCard";
import { ImageGallery } from "./ImageGallery";
import { ReviewsSection } from "./ReviewsSection";
import { AddToCartButton } from "./AddToCartButton";
import { BuyNowButton } from "./BuyNowButton";

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
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 sm:mb-6 md:mb-8 overflow-x-auto scrollbar-hide"
        >
          <ol className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm whitespace-nowrap">
            <li>
              <a
                href="/"
                className="text-gray-500 hover:text-primary-500 transition-colors"
              >
                Home
              </a>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <a
                href={`/categoria/${product.category}`}
                className="text-gray-500 hover:text-primary-500 transition-colors capitalize"
              >
                {product.category.replace(/-/g, " ")}
              </a>
            </li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-900 font-medium truncate max-w-[150px] sm:max-w-[250px]">
              {product.title}
            </li>
          </ol>
        </nav>

        {/* Conteúdo Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 xl:gap-16">
          {/* Galeria de Imagens */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            <ImageGallery
              images={product.images}
              title={product.title}
              discountPercentage={product.discountPercentage}
            />
          </div>

          {/* Informações do Produto */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            {/* Header: Categoria, Marca e Ações */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href={`/categoria/${product.category}`}
                  className="text-xs sm:text-sm text-gray-500 hover:text-primary-500 uppercase tracking-wide transition-colors"
                >
                  {product.category.replace(/-/g, " ")}
                </a>
                {product.brand && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs sm:text-sm text-primary-600 font-semibold">
                      {product.brand}
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
                  aria-label="Adicionar aos favoritos"
                >
                  <MdFavoriteBorder className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-red-500 transition-colors" />
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
                  aria-label="Compartilhar"
                >
                  <MdShare className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-primary-500 transition-colors" />
                </button>
              </div>
            </div>

            {/* Título */}
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 leading-snug">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                      star <= Math.round(product.rating)
                        ? "text-amber-400"
                        : "text-gray-200"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                {product.rating.toFixed(1)}
              </span>
              <a
                href="#avaliacoes"
                className="text-xs text-primary-500 hover:underline"
              >
                ({product.reviews.length} avaliações)
              </a>
              {product.stock > 0 && product.stock <= 10 && (
                <span className="ml-auto text-xs text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded-full">
                  🔥 Restam {product.stock}!
                </span>
              )}
            </div>

            {/* Bloco de Preço */}
            <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100">
              <div className="space-y-1.5">
                {hasDiscount && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm text-gray-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="bg-red-100 text-red-600 text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded">
                      -{Math.round(product.discountPercentage)}%
                    </span>
                  </div>
                )}
                <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
                  {formatPrice(discountedPrice)}
                </p>
              </div>

              {/* Opções de Pagamento */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <MdPix className="w-5 h-5 text-teal-500" />
                  <span className="text-gray-600">No Pix:</span>
                  <span className="font-bold text-teal-600">
                    {formatPrice(discountedPrice * 0.95)}
                  </span>
                  <span className="text-xs text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">
                    5% OFF
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <MdCreditCard className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">
                    ou <strong>12x</strong> de{" "}
                    <strong>{formatPrice(discountedPrice / 12)}</strong> sem
                    juros
                  </span>
                </div>
              </div>
            </div>

            {/* Disponibilidade */}
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${
                  product.stock > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`}
                />
                {product.availabilityStatus}
              </span>
              <span className="text-xs text-gray-500">SKU: {product.sku}</span>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col gap-2 sm:gap-3 lg:flex-row lg:gap-3 mt-2 mb-2">
              <BuyNowButton productId={product.id} />
              <AddToCartButton productId={product.id} />
            </div>

            {/* Informações de Entrega e Garantia */}
            <div className="bg-white rounded-2xl divide-y divide-gray-100 overflow-hidden shadow-sm border border-gray-100">
              <div className="flex items-start gap-3 sm:gap-4 p-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MdLocalShipping className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    {product.shippingInformation}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    Consulte prazo e valor do frete
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4 p-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MdVerified className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    {product.warrantyInformation}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    Garantia do fabricante
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4 p-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MdShield className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    {product.returnPolicy}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    Compre com segurança
                  </p>
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100">
              <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                Descrição do Produto
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Especificações */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h3 className="text-xs font-semibold text-gray-900 mb-2">
                  Especificações
                </h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm">
                  <dt className="text-gray-500">Peso</dt>
                  <dd className="text-gray-900 font-medium">
                    {product.weight}g
                  </dd>
                  <dt className="text-gray-500">Dimensões</dt>
                  <dd className="text-gray-900 font-medium">
                    {product.dimensions.width} x {product.dimensions.height} x{" "}
                    {product.dimensions.depth} cm
                  </dd>
                  <dt className="text-gray-500">Pedido mínimo</dt>
                  <dd className="text-gray-900 font-medium">
                    {product.minimumOrderQuantity} unidade(s)
                  </dd>
                </dl>
              </div>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/search?text=${tag}`}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-xs sm:text-sm transition-colors"
                  >
                    #{tag}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Seção de Avaliações */}
        <div id="avaliacoes">
          <ReviewsSection reviews={product.reviews} rating={product.rating} />
        </div>

        {/* Produtos Relacionados */}
        {filteredRelated.length > 0 && (
          <div className="mt-10 sm:mt-16">
            <ProductListCarousel
              title="Produtos Relacionados"
              products={filteredRelated}
            />
          </div>
        )}
      </div>
    </div>
  );
}
