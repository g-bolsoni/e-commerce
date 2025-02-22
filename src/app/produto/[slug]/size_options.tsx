"use client";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";

interface ProductOptionProps {
  sizes: ProductOptionSizesProps[];
}

interface ProductOptionSizesProps {
  name: string;
  inStock: boolean;
}

export function ProductSizeOption({ sizes }: ProductOptionProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[2]);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">Escolha o Tamanho</h2>
        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Tabela de tamanhos
        </a>
      </div>

      <fieldset aria-label="Choose a size" className="mt-2">
        <RadioGroup value={selectedSize} onChange={setSelectedSize} className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {sizes.map((size) => (
            <RadioGroup.Option key={size.name} value={size} disabled={!size.inStock} className={`${size.inStock ? "cursor-pointer focus:outline-none" : "cursor-not-allowed opacity-25"} flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-3 text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 data-[checked]:border-transparent data-[checked]:bg-indigo-600 data-[checked]:text-white data-[focus]:ring-2 data-[focus]:ring-indigo-500 data-[focus]:ring-offset-2 data-[checked]:hover:bg-indigo-700 sm:flex-1`}>
              {size.name}
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      </fieldset>
    </div>
  );
}
