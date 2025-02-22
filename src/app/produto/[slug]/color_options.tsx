"use client";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";

interface ProductOptionProps {
  colors: ProductOptionColorsProps[];
}

interface ProductOptionColorsProps {
  name: string;
  bgColor: string;
  selectedColor: string;
}

export function ProductColorOption({ colors }: ProductOptionProps) {
  const [selectedColor, setSelectedColor] = useState<ProductOptionColorsProps>(colors[0]);

  return (
    <div>
      <h2 className="text-sm font-medium text-gray-900">Escolha a Cor</h2>
      <fieldset aria-label="Choose a color" className="mt-2">
        <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center gap-x-3">
          {colors.map((color) => (
            <RadioGroup.Option key={color.name} value={color} className={({ checked }) => `${color.selectedColor} relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ${checked ? "ring-2 ring-offset-1" : ""}`}>
              <span aria-hidden="true" className={`${color.bgColor} size-8 rounded-full border border-black/10`} />
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      </fieldset>
    </div>
  );
}
