"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdShoppingBasket,
  MdOutlineReviews,
  MdOutlineFavorite,
  MdOutlineAccountCircle,
  MdArrowBack,
} from "react-icons/md";

const navItems = [
  {
    href: "/minha-conta/meus-pedidos",
    label: "Meus Pedidos",
    icon: MdShoppingBasket,
  },
  {
    href: "/minha-conta/meus-dados",
    label: "Meus Dados",
    icon: MdOutlineAccountCircle,
  },
  {
    href: "/minha-conta/avaliacoes",
    label: "Avaliações",
    icon: MdOutlineReviews,
  },
  {
    href: "/minha-conta/favoritos",
    label: "Favoritos",
    icon: MdOutlineFavorite,
  },
];

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      <Link
        href="/minha-conta"
        className="flex items-center gap-2 text-sm text-secondary-600 hover:text-primary-500 mb-3 transition-colors"
      >
        <MdArrowBack size={18} />
        Voltar para Minha Conta
      </Link>

      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary-500 text-white"
                : "text-secondary-700 hover:bg-secondary-100"
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
