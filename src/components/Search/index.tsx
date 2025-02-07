import { useState, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import { searchProductsByName } from "@/database/search";
import Image from "next/image";
import { MdClose, MdSearch } from "react-icons/md";
import { Modal } from "flowbite-react";
import Link from "next/link";
import { ProductDescription } from "@/types/product";

interface IProductsSearch {
  product_description: ProductDescription[];
  price: string;
  image: string;
  product_id: number;
}

export const Search = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<IProductsSearch[]>([]);

  // Cria a função debounced apenas uma vez
  const debouncedSearch = useRef(
    debounce(async (query: string) => {
      if (query.length > 1) {
        const results = await searchProductsByName(query);
        setResults(results);
      } else {
        setResults([]);
      }
    }, 500)
  );

  // Chama a função debounced sempre que searchText mudar
  useEffect(() => {
    debouncedSearch.current(searchText);
  }, [searchText]);

  // Cancela o debounce ao desmontar o componente
  useEffect(() => {
    return () => {
      debouncedSearch.current.cancel();
    };
  }, []);

  const handleClearSearch = () => {
    setSearchText("");
    setResults([]);
  };

  return (
    <li className="search w-6 h-6 justify-start items-start flex relative fill-white md:fill-black lg:ml-6">
      <button type="button" aria-label="Search" onClick={() => setOpenModal(true)}>
        <MdSearch size={24} color="#000" />
      </button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} className="fixed top-2 left-0 right-0 p-4 overflow-x-hidden md:inset-0 h-screen w-screen max-h-full justify-center items-start [&>div>div]:!bg-transparent [&>div]:max-w-none [&>div]:w-9/12 [&>div>div]:!shadow-none">
        <div className="flex items-center w-full">
          <label htmlFor="search" className="sr-only">
            Pesquisar
          </label>
          <div className="relative w-full flex">
            <input type="text" id="search" className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg outline-none focus:border-secondary-900 block w-full pl-10 p-2.5" placeholder="Pesquisar ..." required autoFocus autoComplete="off" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <div className="absolute right-2.5 h-full">
              {searchText.length > 0 ? (
                <button type="button" className="p-2.5 ml-2 text-md font-medium text-black" onClick={handleClearSearch}>
                  <MdClose size={18} color="#000" />
                </button>
              ) : (
                <button type="submit" className="p-2.5 ml-2 text-md font-medium text-black">
                  <MdSearch size={18} color="#000" />
                  <span className="sr-only">Search</span>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="results">
          {results.length > 0 && (
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 bg-white p-8 rounded-xl mt-2.5 overflow-y-auto max-h-calc">
              {results.map((product) => {
                const imageUrl = product.image ? product.image : "/images/no_image";
                return (
                  <li key={product.product_id} className="block my-2">
                    <Link href={`product/${product.product_description[0].name}`} className="flex flex-col items-center justify-start gap-2 ">
                      <div className="w-full h-full bg-secondary-100 rounded-xl flex items-center justify-center py-5">
                        <Image src={imageUrl} alt={product.product_description[0].name} className="w-full h-full max-w-80 max-h-80 object-contain rounded-lg" width={320} height={320} />
                      </div>
                      <div className="flex flex-col gap-2 w-full h-20">
                        <span className="line-clamp-1 text-md lg:text-md font-semibold">{product.product_description[0].name}</span>
                        <div className="flex gap-2.5 items-center">
                          <span className="text-md text-fontSecundary-800 font-medium">R$ {product.price}</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Modal>
    </li>
  );
};
