import { MdOutlineShoppingBag } from "react-icons/md";
import Image from "next/image";
import { Search } from "../Search";
import DesktopCategories from "./desktop_categories";
import MobileCategories from "./mobile_categories";
import Cart from "./cart";

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
  return (
    <div className="bg-white">
      <header className="relative mx-auto container bg-white">
        <nav aria-label="Top" className="border-b border-gray-200">
          <div className="px-2">
            <div className="flex h-16 items-center">
              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <Image src="/images/logo.png" title="Salmon" alt="Salmon" width={100} height={100} className="flex items-center" loading="lazy" />
                </a>
              </div>

              <DesktopCategories categories={categories} />

              <div className="ml-auto flex items-center gap-2">
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
                <Cart />
                <MobileCategories categories={categories} />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
