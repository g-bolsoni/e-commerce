import { MdMenu, MdOutlinePerson, MdOutlineShoppingBag } from "react-icons/md";

import Image from "next/image";
import { Categories } from "../Categories";
import { Search } from "../Search";

const Header = () => {
  return (
    <header className="bg-transparent w-full flex justify-between items-center h-20 px-4">
      <nav className="w-full flex justify-between items-center z-10 px-3xs py-3xs md:px-2xs lg:container">
        {/* LOGO */}
        <div className="flex items-center justify-center gap-xs">
          <div
            className="js-header_hamburguer w-6 h-6 justify-start items-start gap-2 fill-white transition-transform duration-300 transform md:fill-black flex md:hidden z-20 cursor-pointer"
            // onClick={() => handleCategories()}
          >
            <MdMenu size={24} color="#000" />
          </div>
          <a href="/" aria-label="Back to Home page">
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
        {/* LOGO */}
        {/* Categorias */}
        <Categories />

        {/* Categorias */}
        {/* Icones */}

        <ul className="css-icons justify-center items-center gap-x-2xs flex">
          <Search />
          <li className="w-6 h-6 flex justify-start items-start relative md:fill-black">
            <a
              href="/login"
              className="justify-center items-center md:fill-black flex fill-white"
              aria-label="Go to cart page"
            >
              <MdOutlinePerson size={24} color="#000" />
            </a>
          </li>
          <li className="w-6 h-6 flex justify-start items-start relative md:fill-black">
            <a
              href="/carrinho"
              className="justify-center items-center md:fill-black flex fill-white"
              aria-label="Go to cart page"
            >
              <MdOutlineShoppingBag size={24} color="#000" />
            </a>
          </li>
        </ul>
      </nav>
      {/* Icones */}
    </header>
  );
};

export default Header;
