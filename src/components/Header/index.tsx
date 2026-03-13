import { MdOutlineShoppingBag } from "react-icons/md";
import Image from "next/image";
import { Search } from "../Search";
import DesktopCategories from "./desktop_categories";
import MobileCategories from "./mobile_categories";
import Cart from "./cart";
import { getCategories } from "@/services/dummyjson";

interface Category {
  category_id: number;
  name: string;
  slug: string;
  children: Category[];
}

export default async function Header() {
  // Busca categorias da API DummyJSON
  const apiCategories = await getCategories();

  // Converte para o formato esperado pelos componentes
  const categories: Category[] = apiCategories
    .slice(0, 8)
    .map((cat, index) => ({
      category_id: index + 1,
      name: cat.name,
      slug: cat.slug,
      children: [],
    }));

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
                  <Image
                    src="/images/logo.png"
                    title="Salmon"
                    alt="Salmon"
                    width={100}
                    height={100}
                    className="flex items-center"
                    loading="lazy"
                  />
                </a>
              </div>

              <DesktopCategories categories={categories} />

              <div className="ml-auto flex items-center gap-2">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <a
                    href="/login"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Entrar
                  </a>
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  <a
                    href="/registro"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
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
