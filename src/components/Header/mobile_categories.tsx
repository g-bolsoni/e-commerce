"use client";

import React, { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  MdClose,
  MdChevronRight,
  MdFavoriteBorder,
  MdPersonOutline,
  MdHelpOutline,
} from "react-icons/md";
import Link from "next/link";

interface Category {
  category_id: number;
  name: string;
  slug: string;
  children: Category[];
}

const MobileCategories = ({ categories }: { categories: Category[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Dialog */}
      <Dialog open={open} onClose={setOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-50 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-[280px] sm:max-w-xs transform flex-col bg-white shadow-2xl transition-all duration-300 ease-out data-[closed]:-translate-x-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <span className="text-lg font-semibold text-gray-900">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <MdClose className="w-5 h-5 text-gray-500" />
                <span className="sr-only">Fechar menu</span>
              </button>
            </div>

            {/* User Section */}
            <div className="px-4 py-4 bg-gradient-to-r from-primary-500 to-primary-600">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 text-white"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MdPersonOutline className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium">Olá, visitante!</p>
                  <p className="text-sm text-white/80">Entre ou cadastre-se</p>
                </div>
                <MdChevronRight className="w-5 h-5 ml-auto" />
              </Link>
            </div>

            {/* Categories */}
            <div className="flex-1 overflow-y-auto">
              <div className="py-2">
                <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Categorias
                </p>
                <nav className="space-y-0.5">
                  {categories.map((category) => (
                    <Link
                      key={category.category_id}
                      href={`/categoria/${category.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    >
                      <span className="capitalize">{category.name}</span>
                      <MdChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Quick Links */}
              <div className="py-2 border-t border-gray-100">
                <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Atalhos
                </p>
                <Link
                  href="/minha-conta/favoritos"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <MdFavoriteBorder className="w-5 h-5 text-gray-400" />
                  <span>Meus Favoritos</span>
                </Link>
                <Link
                  href="/ajuda"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <MdHelpOutline className="w-5 h-5 text-gray-400" />
                  <span>Central de Ajuda</span>
                </Link>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center h-11 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 active:scale-[0.98] transition-all"
                >
                  Entrar
                </Link>
                <Link
                  href="/registro"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center h-11 border-2 border-primary-500 text-primary-500 text-sm font-medium rounded-lg hover:bg-primary-50 active:scale-[0.98] transition-all"
                >
                  Cadastrar
                </Link>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Hamburger Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="p-2 -ml-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors lg:hidden"
        aria-label="Abrir menu"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </>
  );
};

export default MobileCategories;
