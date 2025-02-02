import { Popover, PopoverBackdrop, PopoverButton, PopoverGroup, PopoverPanel } from "@headlessui/react";
import Link from "next/link";
import React from "react";

interface Category {
  category_id: number;
  name: string;
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
  children: Category[];
}

interface DesktopCategoriesProps {
  categories: Category[];
}

const DesktopCategories = ({ categories }: DesktopCategoriesProps) => {
  return (
    <>
      {/* Flyout menus */}
      <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
        <div className="flex h-full justify-center items-center gap-4">
          {categories.map((category) =>
            category.children.length > 0 ? (
              <Popover key={category.category_id} className="flex">
                <div className="relative flex">
                  <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm md:text-md md:font-semibold font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600">{category.name}</PopoverButton>
                </div>
                <PopoverBackdrop className="fixed inset-0 bg-black/15 z-10" />

                <PopoverPanel transition className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in z-10">
                  <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow" />
                  <div className="relative bg-white">
                    <div className="mx-auto max-w-7xl px-8">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                        <div className="col-start-2 grid grid-cols-2 gap-x-8"></div>
                        <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                          {category.children.map((section) => (
                            <div key={section.name}>
                              <Link href={`/category/${section.name.toLowerCase()}`} id={`${section.name}-heading`} className="font-medium text-gray-900 cursor-pointer">
                                {section.name}
                              </Link>
                              {section.children.length > 0 && (
                                <ul role="list" aria-labelledby={`${section.name}-heading`} className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                  {section.children.map((item) => (
                                    <li key={item.category_id} className="flex">
                                      <Link href={`/category/${item.name.toLowerCase()}`} className="hover:text-gray-800 cursor-pointer">
                                        {item.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </Popover>
            ) : (
              <Link href={`/category/${category.name.toLowerCase()}`} key={category.category_id} className="text-sm md:text-md md:font-semibold font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800">
                {category.name}
              </Link>
            )
          )}
        </div>
      </PopoverGroup>
    </>
  );
};

export default DesktopCategories;
