"use client";
import { useEffect, useState } from "react";
import Cart from "./cart";
import { MdPersonOutline } from "react-icons/md";
import Link from "next/link";
import DesktopCategories from "./desktop_categories";
import MobileCategories from "./mobile_categories";
interface Category {
  category_id: number;
  name: string;
  slug: string;
  children: Category[];
}
import { Search } from "../Search";
import Image from "next/image";
import { getCategories } from "@/services/dummyjson";
import { useSession } from "next-auth/react";

export default function Header() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(
        data.slice(0, 8).map((cat: any, index: number) => ({
          category_id: index + 1,
          name: cat.name,
          slug: cat.slug,
          children: [],
        })),
      );
    });
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar - apenas desktop */}
      <div className="hidden lg:block bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-9 text-xs">
            <span>Frete grátis para compras acima de R$ 299</span>
            <div className="flex items-center gap-6">
              <Link href="/rastreio" className="min-h-0">
                Rastrear Pedido
              </Link>
              <Link href="/ajuda" className="min-h-0">
                Central de Ajuda
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <nav className="border-b border-gray-100">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex h-14 sm:h-16 lg:h-[72px] items-center gap-2 sm:gap-4">
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <MobileCategories categories={categories} />
            </div>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/desktop_logo.svg"
                title="GBEcommerce"
                alt="GBEcommerce"
                width={160}
                height={60}
                className="block h-16 md:h-20 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Categories - centralizado */}
            <div className="hidden lg:flex flex-1 justify-center">
              <DesktopCategories categories={categories} />
            </div>

            {/* Spacer para mobile - empurra ações para direita */}
            <div className="flex-1 lg:hidden" />

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
              {/* Search */}
              <Search />

              {/* Account - desktop */}
              <div className="hidden lg:flex items-center">
                {session?.user ? (
                  <Link
                    href="/minha-conta"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-500 transition-colors rounded-lg hover:bg-gray-50"
                  >
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt="Perfil"
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                    ) : (
                      <MdPersonOutline className="w-5 h-5" />
                    )}
                    <span>Olá, {session.user.name?.split(" ")[0]}</span>
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-500 transition-colors rounded-lg hover:bg-gray-50"
                  >
                    <MdPersonOutline className="w-5 h-5" />
                    <span>Entrar</span>
                  </Link>
                )}
              </div>

              {/* Cart */}
              <Cart />
            </div>
          </div>
        </div>
      </nav>

      {/* Categories bar - tablets e desktop pequeno (opcional) */}
      <div className="hidden md:block lg:hidden border-b border-gray-100 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 py-2 overflow-x-auto scrollbar-hide">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.category_id}
                href={`/categoria/${category.slug}`}
                className="text-xs font-medium text-gray-600 hover:text-primary-500 whitespace-nowrap transition-colors capitalize"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
