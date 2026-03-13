import { PopoverGroup } from "@headlessui/react";
import Link from "next/link";
import React from "react";

interface Category {
  category_id: number;
  name: string;
  slug: string;
  children: Category[];
}

interface DesktopCategoriesProps {
  categories: Category[];
}

const DesktopCategories = ({ categories }: DesktopCategoriesProps) => {
  return (
    <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
      <div className="flex h-full justify-center items-center gap-6">
        {categories.map((category) => (
          <Link
            href={`/categoria/${category.slug}`}
            key={category.category_id}
            className="text-sm md:text-md font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-primary-500 capitalize"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </PopoverGroup>
  );
};

export default DesktopCategories;
