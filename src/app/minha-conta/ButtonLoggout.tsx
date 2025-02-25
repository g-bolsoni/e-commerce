"use client";
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";

const ButtonLoggout = () => {
  return (
    <button type="button" className="flex items-center justify-end gap-2 py-1 px-3 h-10 w-max bg-secondary-800 rounded-lg uppercase text-xs md:text-xs text-white font-semibold md:max-w-[180px]" onClick={() => signOut()}>
      <MdLogout size={20} color="#fff" />
      Sair
    </button>
  );
};

export default ButtonLoggout;
