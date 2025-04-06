"use client";

import React, { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { MdClose } from "react-icons/md";

const Cart = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="relative w-6 h-6 group flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="black">
          <path d="M14.9997 4.99999H13.333C13.333 3.15832 11.8413 1.66666 9.99967 1.66666C8.15801 1.66666 6.66634 3.15832 6.66634 4.99999H4.99967C4.08301 4.99999 3.33301 5.74999 3.33301 6.66666V16.6667C3.33301 17.5833 4.08301 18.3333 4.99967 18.3333H14.9997C15.9163 18.3333 16.6663 17.5833 16.6663 16.6667V6.66666C16.6663 5.74999 15.9163 4.99999 14.9997 4.99999ZM9.99967 3.33332C10.9163 3.33332 11.6663 4.08332 11.6663 4.99999H8.33301C8.33301 4.08332 9.08301 3.33332 9.99967 3.33332ZM14.9997 16.6667H4.99967V6.66666H6.66634V8.33332C6.66634 8.79166 7.04134 9.16666 7.49967 9.16666C7.95801 9.16666 8.33301 8.79166 8.33301 8.33332V6.66666H11.6663V8.33332C11.6663 8.79166 12.0413 9.16666 12.4997 9.16666C12.958 9.16666 13.333 8.79166 13.333 8.33332V6.66666H14.9997V16.6667Z" />
        </svg>
        <span className="sr-only">items in cart, view bag</span>
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop transition className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0" />

        <div className="fixed inset-0 z-40 w-11/12 flex">
          <DialogPanel transition className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white rounded-r-2xl shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full">
            <div className="cart-header border-b border-gray-300">
              <div className="p-4">
                <div className="flex justify-between px-7 py-4 rounded-lg bg-black/10">
                  <span>Carrinho</span>
                  <button type="button" onClick={() => setOpen(false)} className="relative -m-2 overflow-y-hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <MdClose size={24} color="#000" />
                  </button>
                </div>
              </div>
            </div>

            <div className="cart-body px-4 h-full">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-gray-500">Seu carrinho está vazio</p>
                </div>
              </div>
            </div>

            <div className="cart-footer h-80 border-t border-gray-300">
              <div className="flex justify-between px-4 py-2 mb-4">
                <span className="text-gray-700 text-sm">Total:</span>
                <span className="text-gray-700 text-sm">R$ 0,00</span>
              </div>
              <div className="flex flex-col justify-between gap-4 px-4">
                <button type="button" onClick={() => setOpen(false)} className="bg-primary-700 text-white px-4 py-2 h-12 rounded-lg">
                  Finalizar compra
                </button>
                <button type="button" onClick={() => setOpen(false)} className="border border-primary-700 text-primary-700 px-4 py-2 text-sm h-12 rounded-lg">
                  Continuar comprando
                </button>
              </div>
            </div>

            {/* Links */}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Cart;
