"use client";

import { useState } from "react";
import { Modal } from "flowbite-react";
import Image from "next/image";
import { MdClose, MdSearch } from "react-icons/md";

export const Search = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleClearSearch = () => {
    setSearchText("");
  };

  return (
    <li className="search w-6 h-6 justify-start items-start flex relative fill-white md:fill-black lg:ml-6">
      <button className="js-search_click" type="button" aria-label="Search" onClick={() => setOpenModal(true)}>
        <MdSearch size={24} color="#000" />
      </button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} className="fixed top-2 left-0 right-0 p-4 overflow-x-hidden md:inset-0 h-screen w-screen max-h-full justify-center items-start [&>div>div]:!bg-transparent [&>div>div]:!shadow-none">
        <div className="flex items-center w-full">
          <label htmlFor="search" className="sr-only">
            Pesquisar
          </label>
          <div className="relative w-full flex">
            <input type="text" id="search" className="js-search bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg outline-none focus:border-secondary-900 block w-full pl-10 p-2.5" placeholder="Pesquisar ..." required autoFocus autoComplete="off" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <div className="js-containerIcons absolute right-2.5 h-full">
              <button type="submit" className={`js-iconSearch p-2.5 ml-2 text-md font-medium text-black bg-transparent h-full ${searchText.length > 0 ? "hidden" : "block"}`}>
                <MdSearch size={18} color="#000" />
                <span className="sr-only">Search</span>
              </button>
              <button type="button" className={`js-clearSearch p-2.5 ml-2 text-md font-medium text-black fill-black h-full ${searchText.length > 0 ? "block" : "hidden"}`} onClick={handleClearSearch}>
                <MdClose size={18} color="#000" />
              </button>
            </div>
          </div>
        </div>
        <div className="results">
          <ul className="flex flex-col bg-white p-8 rounded-xl mt-2.5 overflow-y-auto max-h-calc">
            <li className="h-20 my-2 block">
              <a href="https://www.sapatoretro.com.br/p-sapato-boneca-preto-milao-400-03-preto" className="flex items-center justify-start gap-2 h-20">
                <div className="h-20 w-20">
                  <Image src="https://img.irroba.com.br/fit-in/80x80/filters:fill(fff):quality(80)/sapatore/catalog/lancamentos-2024/sapato-boneca-milao-preto-40003.jpg " alt="Sapato Boneca - MILÃO - Preto - 400.03" className="h-full" width={80} height={80} />
                </div>
                <div className="flex flex-col gap-2 w-full h-20">
                  <span className="line-clamp-1 text-md lg:text-md">Sapato Boneca - MILÃO - Preto - 400.03</span>
                  <div className="flex gap-2.5 items-center">
                    <span className="text-md text-fontSecundary-800 font-medium">R$ 279,90</span>
                  </div>
                </div>
              </a>
            </li>
            <li className="h-20 my-2 block">
              <a href="https://www.sapatoretro.com.br/p-lixeira-de-carro-de-couro-legitimo-preta" className="flex items-center justify-start gap-2 h-20">
                <div className="h-20 w-20">
                  <Image src="https://img.irroba.com.br/fit-in/80x80/filters:fill(fff):quality(80)/sapatore/catalog/lixeira-sr.jpg " alt="Lixeira de Carro de Couro Legítimo - Preta" width={80} height={80} className="h-full" />
                </div>
                <div className="flex flex-col gap-2 w-full h-20">
                  <span className="line-clamp-1 text-md lg:text-md">Lixeira de Carro de Couro Legítimo - Preta</span>
                  <div className="flex gap-2.5 items-center">
                    <span className="text-md text-fontSecundary-800 font-medium">R$ 89,90</span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </Modal>
    </li>
  );
};
