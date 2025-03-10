"use client";

import { Fragment, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { MdClose, MdMenu, MdOutlineShoppingBag } from "react-icons/md";
import Image from "next/image";
import { Search } from "../Search";
import DesktopCategories from "./desktop_categories";

interface Category {
  category_id: number;
  name: string;
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
  children: Category[];
}

const categories: Category[] = [
  {
    category_id: 7,
    name: "Social",
    meta_title: "Social",
    meta_description: "Social",
    meta_keyword: "Social",
    children: [],
  },
  {
    category_id: 6,
    name: "Esporte",
    meta_title: "Esporte",
    meta_description: "Esporte",
    meta_keyword: "Esporte",
    children: [
      {
        category_id: 9,
        name: "Natação",
        meta_title: "Natação",
        meta_description: "Natação",
        meta_keyword: "Natação",
        children: [],
      },
      {
        category_id: 8,
        name: "Futebol",
        meta_title: "Futebol",
        meta_description: "Futebol",
        meta_keyword: "Futebol",
        children: [],
      },
    ],
  },
  {
    category_id: 1,
    name: "Masculino",
    meta_title: "Categoria 1",
    meta_description: "",
    meta_keyword: "",
    children: [],
  },
  {
    category_id: 2,
    name: "Feminino",
    meta_title: "Categoria 2",
    meta_description: "",
    meta_keyword: "",
    children: [],
  },
  {
    category_id: 3,
    name: "Infantil",
    meta_title: "Categoria 3",
    meta_description: "",
    meta_keyword: "",
    children: [],
  },
  {
    category_id: 4,
    name: "Casual",
    meta_title: "Categoria 4",
    meta_description: "",
    meta_keyword: "",
    children: [],
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop transition className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0" />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel transition className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full">
            <div className="flex px-4 pb-2 pt-5">
              <button type="button" onClick={() => setOpen(false)} className="relative -m-2 overflow-y-hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <MdClose size={24} color="#000" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {categories.map((category) => (
                    <Tab key={category.category_id} className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600">
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
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

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                  Entar
                </a>
              </div>
              <div className="flow-root">
                <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                  Cadastre-se
                </a>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative mx-auto container bg-white">
        <nav aria-label="Top" className="px-4 sm:px-0">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button type="button" onClick={() => setOpen(true)} className="relative rounded-md overflow-y-hidden bg-white p-2 text-gray-400 lg:hidden">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <MdMenu size={24} color="#000" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <Image src="/images/logo.png" title="Salmon" alt="Salmon" width={100} height={100} className="flex items-center" loading="lazy" />
                </a>
              </div>

              <DesktopCategories categories={categories} />

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <a href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Entrar
                  </a>
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  <a href="/registro" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Cadastre-se
                  </a>
                </div>

                {/* Search */}
                <Search />

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="/carrinho" className="group -m-2 flex items-center p-2">
                    <MdOutlineShoppingBag size={24} color="#000" className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
