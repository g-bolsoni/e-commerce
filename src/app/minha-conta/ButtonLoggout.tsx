"use client";
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";

const ButtonLoggout = () => {
  return (
    <button
      type="button"
      className="flex items-center justify-center py-2 px-3 max-h-7 md:max-h-10 h-full w-full bg-secondary-800 rounded-lg uppercase text-xs md:text-xs text-white font-semibold [&_svg]:mr-6 md:max-w-[180px]"
      onClick={() => signOut()}
    >
      <MdLogout size={20} color="#fff" />
      Sair
    </button>
  );
};

export default ButtonLoggout;
