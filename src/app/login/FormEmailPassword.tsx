"use client";

import { useToken } from "@/hooks/TokenProvider";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const FormEmailPassword = () => {
  const { token } = useToken();
  const searchParams = useSearchParams();

  const error = searchParams?.get("error");

  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      console.error("Email or password is invalid");
      toast.error("Email ou senha é inválido");
      return;
    }

    const data = {
      email: email,
      password: password,
      token: token,
    };

    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Erro ao tentar fazer o login");
    } else {
      toast.success("Login realizado com sucesso");
      setTimeout(() => {
        window.location.href = "/minha-conta";
      }, 2000);
    }
  };
  return (
    <form action={handleLogin} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-primary-900"
        >
          Insira seu e-mail
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-primary-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-primary-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm/6 font-medium text-primary-900"
        >
          Password
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-primary-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-primary-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div className="flex h-6 shrink-0 items-center">
            <div className="group grid size-4 grid-cols-1">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
              />
              <svg
                fill="none"
                viewBox="0 0 14 14"
                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-has-[:checked]:opacity-100"
                />
                <path
                  d="M3 7H11"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                />
              </svg>
            </div>
          </div>
          <label
            htmlFor="remember-me"
            className="block text-sm/6 text-primary-900"
          >
            Lembrar de mim
          </label>
        </div>

        <div className="text-sm/6">
          <a
            href="#"
            className="font-semibold text-primary-500 hover:text-primary-200"
          >
            Esqueceu sua senha?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-primary-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          Entrar
        </button>
        {error === "CredentialsSignin" && (
          <span className="text-sm text-red-800">
            Erro ao tentar fazer o login;
          </span>
        )}
      </div>
    </form>
  );
};

export default FormEmailPassword;
