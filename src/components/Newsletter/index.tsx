"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { toast } from "react-toastify";

const newsletterSchema = z.object({
  email: z
    .string()
    .email("Informe um e-mail válido!")
    .min(3, "Informe um e-mail válido!")
    .max(255),
});

type INewsletterSchema = z.infer<typeof newsletterSchema>;

const Newsletter = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const submitForm = (data: INewsletterSchema) => {
    if (data.email.length === 0) {
      toast.error("Falha ao enviar o email!");
      return;
    }
    toast.success("Email cadastrado com sucesso!");
  };

  return (
    <section className="px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] h-full w-full bg-white rounded-2xl sm:rounded-3xl my-4 sm:my-6 flex items-center justify-center flex-col gap-4 sm:gap-6">
      <div className="text-center flex flex-col gap-2 sm:gap-4 max-w-lg">
        <h2 className="text-zinc-800 text-xl sm:text-2xl md:text-3xl font-bold">
          Receba nossas ofertas
        </h2>
        <p className="text-zinc-500 text-sm sm:text-base px-2">
          Informe seu e-mail para sempre ficar por dentro das nossas ofertas e
          promoções
        </p>
      </div>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 w-full max-w-md px-2"
      >
        <div className="relative flex-1">
          <input
            type="email"
            {...register("email")}
            placeholder="Informe seu e-mail"
            className="w-full h-11 sm:h-10 px-4 border border-zinc-300 rounded-lg sm:rounded-md text-base focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
          />
          {errors.email && (
            <p className="absolute -bottom-5 left-0 text-red-600 text-xs">
              {errors.email.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="rounded-lg sm:rounded-md h-11 sm:h-10 px-6 sm:px-4 flex items-center justify-center bg-primary-500 transition-all duration-300 ease-linear text-white text-base font-medium hover:brightness-110 active:scale-[0.98] whitespace-nowrap"
        >
          Enviar
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
