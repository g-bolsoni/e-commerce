import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";

import { MdEdit, MdCameraAlt, MdEmail, MdShoppingBasket, MdOutlineReviews, MdOutlineFavorite, MdOutlineAccountCircle } from "react-icons/md";
import ButtonLoggout from "./ButtonLoggout";
export default async function Login() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <div className="bg-white rounded-md grid grid-rows-[50px_1fr] grid-cols-[100px_1fr] md:grid-cols-[100px_1fr_200px] gap-2 p-6 mx-3 mt-6 md:container md:mx-auto">
        <div className="image flex justify-center items-center relative cursor-pointer row-span-full">
          <Image src="/images/no_image.png" alt="Profile" width={100} height={100} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <MdCameraAlt size={20} color="#000" />
          </div>
        </div>

        <div className="flex flex-col items-end justify-start gap-2 md:column-start-2 md:row-span-full md:items-start md:ml-3">
          <span className="font-bold text-sm md:text-lg">Bem-vindo,{session?.user?.name}</span>
          <span className="flex gap-1 items-center text-xs ">
            <MdEmail size={20} color="#000" />
            {session.user?.email}
          </span>
        </div>

        <div className="buttons flex flex-col items-end gap-2 row-start-2 md:row-span-full">
          <button type="button" className="flex items-center justify-end gap-2 py-1 px-3 h-10 w-max bg-secondary-600 rounded-lg uppercase text-xs md:text-xs text-white font-semibold md:max-w-[180px]">
            <MdEdit size={20} color="#fff" />
            Editar dados
          </button>
          <ButtonLoggout />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-md lg:grid-cols-3 lg:gap-8 mt-6 mx-3 md:container md:mx-auto">
        <a className="flex flex-col md:flex-row items-center justify-center px-4 lg:px-8 gap-4 lg:gap-5 bg-white rounded-md h-56 md:h-[128px]" href="minha-conta/meus-pedidos">
          <MdShoppingBasket size={50} color="#000" />
          <span className="text-xs font-semibold uppercase text-black-800 md:text-sm md:max-w-[244px]">
            Meus pedidos
            <span className="hidden text-black-700 md:flex text-xs md:font-normal md:normal-case">Veja históricos e acompanhe suas compras.</span>
          </span>
        </a>
        <a className="flex flex-col md:flex-row items-center justify-center px-4 lg:px-8 gap-4 lg:gap-5 bg-white rounded-md h-56 md:h-[128px]" href="minha-conta/meus-dados">
          <MdOutlineAccountCircle size={50} color="#000" />
          <span className="text-xs font-semibold uppercase text-black-800 md:text-sm md:max-w-[244px]">
            Meus dados
            <span className="hidden text-black-700 md:flex text-xs md:font-normal md:normal-case">Altere seus dados cadastrados.</span>
          </span>
        </a>
        <a className="flex flex-col md:flex-row items-center justify-center px-4 lg:px-8 gap-4 lg:gap-5 bg-white rounded-md h-56 md:h-[128px]" href="/minha-conta/avaliacoes">
          <MdOutlineReviews size={50} color="#000" />
          <span className="text-xs font-semibold uppercase text-black-800 md:text-sm md:max-w-[244px]">
            Avaliações
            <span className="hidden text-black-700 md:flex text-xs md:font-normal md:normal-case">Avalie suas compras!</span>
          </span>
        </a>
        <a className="flex flex-col md:flex-row items-center justify-center px-4 lg:px-8 gap-4 lg:gap-5 bg-white rounded-md h-56 md:h-[128px]" href="/minha-conta/favoritos">
          <MdOutlineFavorite size={50} color="#000" />
          <span className="text-xs font-semibold uppercase text-black-800 md:text-sm md:max-w-[244px]">
            Favoritos
            <span className="hidden text-black-700 md:flex md:text-sm md:font-normal md:normal-case">Consulte sua lista de produtos favoritados.</span>
          </span>
        </a>
      </div>
    </>
  );
}
