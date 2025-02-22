import { searchProductByUrl } from "@/database/product";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

import he from "he";
import { ProductColorOption } from "./color_options";
import { ProductSizeOption } from "./size_options";
import { MdStar } from "react-icons/md";

export default async function Produto({ params }: { params: { slug?: string } }) {
  const productUrl = params.slug || "";

  const products = productUrl ? await searchProductByUrl(productUrl) : [];
  const product = products[0];

  if (!product) redirect("/");

  const decodedHTML = he.decode(product.product_description[0].description);
  const image_products = [{ image: product.image, main_image: true }];

  if (product.product_image.length) {
    product.product_image.map((imageLink: any) => {
      image_products.push({ image: imageLink.image, main_image: false });
    });
  }

  const product2 = {
    rating: 3.9,
    reviewCount: 512,
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Clothing", href: "#" },
    ],
    colors: [
      { name: "Black", bgColor: "bg-gray-900", selectedColor: "ring-gray-900" },
      { name: "Heather Grey", bgColor: "bg-gray-400", selectedColor: "ring-gray-400" },
    ],
    sizes: [
      { name: "PP", inStock: true },
      { name: "P", inStock: true },
      { name: "M", inStock: true },
      { name: "GG", inStock: true },
      { name: "XG", inStock: true },
      { name: "XXG", inStock: false },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <nav aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          {product2.breadcrumbs.map((breadcrumb) => (
            <li key={breadcrumb.id}>
              <div className="flex items-center">
                <a href={breadcrumb.href} className="mr-4 text-sm font-medium text-gray-900">
                  {breadcrumb.name}
                </a>
                <svg viewBox="0 0 6 20" aria-hidden="true" className="h-5 w-auto text-gray-300">
                  <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                </svg>
              </div>
            </li>
          ))}
          <li className="text-sm">
            <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
              {product.name}
            </a>
          </li>
        </ol>
      </nav>
      <div className="lg:mt-8 grid grid-cols-1 lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
        <div className="product_image mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
          <h2 className="sr-only">Images</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8 auto-rows-min">
            {image_products.map((image, index) => {
              return <img key={index} src={image.image} alt="Product" className={`${image.main_image ? "lg:col-span-2 lg:row-span-2" : ""} w-full h-full`} />;
            })}
          </div>
        </div>
        <div className="mt-6 lg:mt-0 product_info lg:col-span-5 lg:col-start-8">
          <div className="flex flex-col justify-between">
            <h1 className="text-lg lg:text-xl font-medium text-gray-900">{product.product_description[0].name}</h1>
            <p className="text-lg lg:text-xl font-medium text-gray-900">{product.price}</p>
          </div>

          {/* Reviews */}
          <div className="mt-4">
            <h2 className="sr-only">Reviews</h2>
            <div className="flex items-center">
              <p className="text-sm text-gray-700">
                {product2.rating}
                <span className="sr-only"> out of 5 stars</span>
              </p>
              <div className="ml-1 flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <MdStar key={rating} aria-hidden="true" className={`${product2.rating > rating ? "text-yellow-400" : "text-gray-200"} size-5 shrink-0`} />
                ))}
              </div>
              <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                ·
              </div>
              <div className="ml-4 flex">
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Ver todos os {product2.reviewCount} depoimentos.
                </a>
              </div>
            </div>
          </div>

          <form>
            <ProductColorOption colors={product2.colors} />
            <ProductSizeOption sizes={product2.sizes} />

            <button type="submit" className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Comprar
            </button>
          </form>

          <div className="product_description mt-10">
            <h2 className="text-sm font-medium text-gray-900">Descrição</h2>
            <div dangerouslySetInnerHTML={{ __html: decodedHTML }} className="mt-4 space-y-4 text-sm/6 text-gray-500 [&>div]:!whitespace-break-spaces" />
          </div>
        </div>
      </div>
    </div>
  );
}
