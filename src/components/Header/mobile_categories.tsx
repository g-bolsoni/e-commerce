"use client";

import React, { useState, Fragment } from "react";
import { Dialog, DialogBackdrop, DialogPanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { MdClose, MdMenu } from "react-icons/md";

interface Category {
  category_id: number;
  name: string;
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
  children: Category[];
}

const MobileCategories = ({ categories }: { categories: Category[] }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop transition className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0" />
        <div className="fixed inset-0 z-40 flex w-11/12">
          <DialogPanel transition className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white rounded-r-2xl shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full">
            <div className="menu-header border-b border-gray-300">
              <div className="p-4">
                <div className="flex justify-between px-7 py-4 rounded-lg bg-black/10">
                  <span>Menu</span>
                  <button type="button" onClick={() => setOpen(false)} className="relative -m-2 overflow-y-hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <MdClose size={24} color="#000" />
                  </button>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="cart-body h-full">
              <TabGroup className="">
                <TabList className="flex flex-col items-start ">
                  {categories.map((category) => (
                    <a key={category.category_id} href={`/${category.name.toLowerCase()}`} className="min-h-14 flex items-center whitespace-nowrap border-b border-primary-200 w-full text-start">
                      <span className="px-4 text-xs uppercase font-light text-gray-600">{category.name}</span>
                    </a>
                  ))}
                </TabList>
                <TabPanels as={Fragment}>
                  {categories.map((category) => (
                    <TabPanel key={category.category_id} className="space-y-10 px-4 pb-8 pt-10">
                      {category.children.map((section) => (
                        <div key={section.name}>
                          <p id={`${category.category_id}-${section.category_id}-heading-mobile`} className="font-medium text-gray-900">
                            {section.name}
                          </p>
                          {section.children.length > 0 && (
                            <ul role="list" aria-labelledby={`${category.name}-${section.category_id}-heading-mobile`} className="mt-6 flex flex-col space-y-6">
                              {section.children.map((item) => (
                                <li key={item.category_id} className="flow-root">
                                  <a href="#" className="-m-2 block p-2 text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </TabPanel>
                  ))}
                </TabPanels>
              </TabGroup>
            </div>

            <div className="cart-footer h-48 border-t  border-gray-300 px-4 spacy-y-4">
              <a href="/minha-conta" className="flex items-center bg-black/10 rounded-lg gap-4 h-12 justify-start px-4 py-2 my-4 text-sm text-gray-700 font-normal">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                  <path
                    d="M9 16.0019L8.24225 15.3174C6.61025 13.8264 5.26025 12.5501 4.19225 11.4886C3.12442 10.4269 2.2815 9.49069 1.6635 8.67986C1.0455 7.86902 0.61375 7.13536 0.36825 6.47886C0.12275 5.82252 0 5.16227 0 4.49811C0 3.22627 0.432084 2.15836 1.29625 1.29436C2.16025 0.430191 3.22817 -0.00189209 4.5 -0.00189209C5.3795 -0.00189209 6.2045 0.223108 6.975 0.673108C7.7455 1.12311 8.4205 1.77761 9 2.63661C9.5795 1.77761 10.2545 1.12311 11.025 0.673108C11.7955 0.223108 12.6205 -0.00189209 13.5 -0.00189209C14.7718 -0.00189209 15.8398 0.430191 16.7038 1.29436C17.5679 2.15836 18 3.22627 18 4.49811C18 5.16227 17.8773 5.82252 17.6318 6.47886C17.3863 7.13536 16.9545 7.86902 16.3365 8.67986C15.7185 9.49069 14.8787 10.4269 13.8173 11.4886C12.7558 12.5501 11.4026 13.8264 9.75775 15.3174L9 16.0019ZM9 14.6481C10.6 13.2019 11.9167 11.9632 12.95 10.9319C13.9833 9.90036 14.8 9.00544 15.4 8.24711C16 7.48878 16.4167 6.81702 16.65 6.23186C16.8833 5.64652 17 5.06861 17 4.49811C17 3.49811 16.6667 2.66477 16 1.99811C15.3333 1.33144 14.5 0.998108 13.5 0.998108C12.7038 0.998108 11.9692 1.22536 11.2962 1.67986C10.6231 2.13436 10.0205 2.81861 9.4885 3.73261H8.5115C7.96667 2.80577 7.36092 2.11827 6.69425 1.67011C6.02758 1.22211 5.29617 0.998108 4.5 0.998108C3.51283 0.998108 2.68267 1.33144 2.0095 1.99811C1.3365 2.66477 1 3.49811 1 4.49811C1 5.06861 1.11667 5.64652 1.35 6.23186C1.58333 6.81702 2 7.48878 2.6 8.24711C3.2 9.00544 4.01667 9.89711 5.05 10.9221C6.08333 11.9471 7.4 13.1891 9 14.6481Z"
                    fill="black"
                  ></path>
                </svg>
                Favoritos
              </a>
              <div className="flex justify-between gap-4 ">
                <button type="button" onClick={() => setOpen(false)} className="bg-primary-700 w-1/2 text-white px-4 py-2 h-12 rounded-lg">
                  Entar
                </button>
                <button type="button" onClick={() => setOpen(false)} className="border border-primary-700 w-1/2 text-primary-700 px-4 py-2 text-sm h-12 rounded-lg">
                  Cadastre-se
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      <button type="button" onClick={() => setOpen(true)} className="relative w-6 h-6 rounded-md overflow-y-hidden bg-white text-gray-400 lg:hidden">
        <span className="sr-only">Open menu</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black">
          <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" />
        </svg>
      </button>
    </>
  );
};

export default MobileCategories;
