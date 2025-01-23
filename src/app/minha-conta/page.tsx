import Image from "next/image";
import {
  MdEdit,
  MdCameraAlt,
  MdEmail,
  MdShoppingBasket,
  MdOutlinePerson,
  MdOutlineReviews,
  MdOutlineFavorite,
} from "react-icons/md";
export default function Login() {
  return (
    <>
      <div className="bg-white rounded-md flex justify-between items-center p-6">
        <div className="user-info flex gap-4 justify-center items-center">
          <div className="image relative cursor-pointer">
            <Image
              src="/images/no_image.png"
              alt="Ninja"
              width="80"
              height="80"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <MdCameraAlt size={20} color="#000" />
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <span className="font-bold text-lg">
              Bem-vindo, Giovane Bolsoni
            </span>
            <span className="flex gap-2 items-baseline ">
              <MdEmail size={15} color="#000" />
              giovane.essado@gmail.com
            </span>
          </div>
        </div>
        <button
          type="button"
          className="flex items-center justify-center py-2 px-3 max-h-7 md:max-h-10 h-full w-full bg-secondary-500 rounded-lg uppercase text-xs md:text-xs text-white font-semibold [&_svg]:mr-6 md:max-w-[180px]"
        >
          <MdEdit size={20} color="#fff" />
          Editar dados
        </button>
      </div>
      <div className="grid grid-cols-2 gap-8 rounded-md lg:grid-cols-3 lg:gap-8 lg:mt-6 ">
        <a
          className="flex items-center justify-center bg-white rounded-md h-56 p-16 [_svg]:w-20 [_svg]:h-20 md:h-[128px] md:[_svg]:w-32 md:[_svg]:h-32"
          href="minha-conta/meus-pedidos"
        >
          <MdShoppingBasket size={36} color="#000" />
          <span className="ml-12 text-xs font-semibold uppercase text-black-800 md:text-base md:max-w-[244px] md:ml-20">
            Meus pedidos
            <span className="hidden text-black-700 md:flex md:text-sm md:font-normal md:normal-case">
              Veja históricos e acompanhe suas compras.
            </span>
          </span>
        </a>
        <a
          className="flex items-center justify-center bg-white rounded-md h-56 p-16 [_svg]:w-20 [_svg]:h-20 md:h-[128px] md:[_svg]:w-32 md:[_svg]:h-32"
          href="minha-conta/meus-dados"
        >
          <MdOutlinePerson size={36} color="#000" />
          <span className="ml-12 text-xs font-semibold uppercase text-black-800 md:text-base md:max-w-[244px] md:ml-20">
            Meus dados
            <span className="hidden text-black-700 md:flex md:text-sm md:font-normal md:normal-case">
              Altere seus dados cadastrados, endereços ou cadastre um novo
              endereço.
            </span>
          </span>
        </a>
        <a
          className="flex items-center justify-center bg-white rounded-md h-56 p-16 [_svg]:w-20 [_svg]:h-20 md:h-[128px] md:[_svg]:w-32 md:[_svg]:h-32"
          href="/minha-conta/avaliacoes"
        >
          <MdOutlineReviews size={36} color="#000" />
          <span className="ml-12 text-xs font-semibold uppercase text-black-800 md:text-base md:max-w-[244px] md:ml-20">
            Avaliações
            <span className="hidden text-black-700 md:flex md:text-sm md:font-normal md:normal-case">
              Avalie suas compras e visualize suas avaliações e comentários.
            </span>
          </span>
        </a>
        <a
          className="flex items-center justify-center bg-white rounded-md h-56 p-16 [_svg]:w-20 [_svg]:h-20 md:h-[128px] md:[_svg]:w-32 md:[_svg]:h-32"
          href="/minha-conta/favoritos"
        >
          <MdOutlineFavorite size={36} color="#000" />
          <span className="ml-12 text-xs font-semibold uppercase text-black-800 md:text-base md:max-w-[244px] md:ml-20">
            Favoritos
            <span className="hidden text-black-700 md:flex md:text-sm md:font-normal md:normal-case">
              Consulte sua lista de produtos favoritados.
            </span>
          </span>
        </a>
      </div>
    </>
  );
}
