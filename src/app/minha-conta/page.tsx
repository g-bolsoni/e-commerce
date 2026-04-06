import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

import {
  MdEdit,
  MdCameraAlt,
  MdEmail,
  MdShoppingBasket,
  MdOutlineReviews,
  MdOutlineFavorite,
  MdOutlineAccountCircle,
} from "react-icons/md";
import ButtonLoggout from "./ButtonLoggout";
export default async function Login() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <div className="bg-white rounded-md flex flex-col items-center gap-4 p-6 mx-3 mt-6 md:grid md:grid-rows-[50px_1fr] md:grid-cols-[100px_1fr_200px] md:gap-2 md:container md:mx-auto">
        <div className="relative cursor-pointer md:row-span-full flex justify-center items-center">
          <Image
            src={session.user?.image || "/images/no_user_icon.avif"}
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full md:w-[100px] md:h-[100px]"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <MdCameraAlt size={20} color="#000" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 md:items-start md:justify-start md:gap-2 md:col-start-2 md:row-span-full md:ml-3">
          <span className="font-bold text-sm md:text-lg">
            Bem-vindo, {session?.user?.name}
          </span>
          <span className="flex gap-1 items-center text-xs">
            <MdEmail size={16} color="#000" className="md:w-5 md:h-5" />
            {session.user?.email}
          </span>
        </div>

        <div className="flex gap-2 w-full justify-center md:flex-col md:items-end md:row-span-full md:w-auto">
          <button
            type="button"
            className="flex items-center gap-2 py-1 px-3 h-10 bg-secondary-600 rounded-lg uppercase text-xs text-white font-semibold"
          >
            <MdEdit size={20} color="#fff" />
            Editar dados
          </button>
          <ButtonLoggout />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6 mx-3 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-8 md:container md:mx-auto">
        <a
          className="flex flex-col items-center justify-center px-3 py-4 gap-3 bg-white rounded-md h-32 md:flex-row md:px-4 md:h-[128px] lg:px-8 lg:gap-5"
          href="minha-conta/meus-pedidos"
        >
          <MdShoppingBasket className="text-3xl md:text-5xl" color="#000" />
          <span className="text-xs font-semibold uppercase text-black-800 text-center md:text-left md:text-sm md:max-w-[244px]">
            Meus pedidos
            <span className="hidden text-black-700 md:flex text-xs md:font-normal md:normal-case">
              Veja históricos e acompanhe suas compras.
            </span>
          </span>
        </a>
        <a
          className="flex flex-col items-center justify-center px-3 py-4 gap-3 bg-white rounded-md h-32 md:flex-row md:px-4 md:h-[128px] lg:px-8 lg:gap-5"
          href="minha-conta/meus-dados"
        >
          <MdOutlineAccountCircle
            className="text-3xl md:text-5xl"
            color="#000"
          />
          <span className="text-xs font-semibold uppercase text-black-800 text-center md:text-left md:text-sm md:max-w-[244px]">
            Meus dados
            <span className="hidden text-black-700 md:flex text-xs md:font-normal md:normal-case">
              Altere seus dados cadastrados.
            </span>
          </span>
        </a>
        <a
          className="flex flex-col items-center justify-center px-3 py-4 gap-3 bg-white rounded-md h-32 md:flex-row md:px-4 md:h-[128px] lg:px-8 lg:gap-5"
          href="/minha-conta/avaliacoes"
        >
          <MdOutlineReviews className="text-3xl md:text-5xl" color="#000" />
          <span className="text-xs font-semibold uppercase text-black-800 text-center md:text-left md:text-sm md:max-w-[244px]">
            Avaliações
            <span className="hidden text-black-700 md:flex text-xs md:font-normal md:normal-case">
              Avalie suas compras!
            </span>
          </span>
        </a>
        <a
          className="flex flex-col items-center justify-center px-3 py-4 gap-3 bg-white rounded-md h-32 md:flex-row md:px-4 md:h-[128px] lg:px-8 lg:gap-5"
          href="/minha-conta/favoritos"
        >
          <MdOutlineFavorite className="text-3xl md:text-5xl" color="#000" />
          <span className="text-xs font-semibold uppercase text-black-800 text-center md:text-left md:text-sm md:max-w-[244px]">
            Favoritos
            <span className="hidden text-black-700 md:flex text-xs md:font-normal md:normal-case">
              Consulte sua lista de produtos favoritados.
            </span>
          </span>
        </a>
      </div>
    </>
  );
}
