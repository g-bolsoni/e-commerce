"use client";

import React, { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { MdClose, MdShoppingCart, MdRemoveShoppingCart } from "react-icons/md";

const Cart = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Cart Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors group"
        aria-label="Abrir carrinho"
      >
        <MdShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-primary-500 transition-colors" />
        {/* Badge - mostra quando tiver itens */}
        {/* <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          2
        </span> */}
      </button>

      {/* Cart Drawer */}
      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-50 flex justify-end">
          <DialogPanel
            transition
            className="relative flex w-full max-w-[320px] sm:max-w-sm transform flex-col bg-white shadow-2xl transition-all duration-300 ease-out data-[closed]:translate-x-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <MdShoppingCart className="w-5 h-5 text-primary-500" />
                <span className="text-lg font-semibold text-gray-900">
                  Carrinho
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <MdClose className="w-5 h-5 text-gray-500" />
                <span className="sr-only">Fechar carrinho</span>
              </button>
            </div>

            {/* Cart Body - Empty State */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <MdRemoveShoppingCart className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Carrinho vazio
              </h3>
              <p className="text-sm text-gray-500 text-center">
                Adicione produtos ao seu carrinho para continuar comprando
              </p>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 p-4 space-y-4">
              {/* Subtotal */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">R$ 0,00</span>
              </div>

              {/* Frete info */}
              <p className="text-xs text-gray-500 text-center">
                Frete grátis para compras acima de R$ 299
              </p>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full h-11 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  Finalizar Compra
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full h-11 border-2 border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] transition-all"
                >
                  Continuar Comprando
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Cart;
