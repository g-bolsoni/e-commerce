"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createUser } from "@/database/user/register";
import { toast } from "react-toastify";

const createUserSchema = z.object({
  type_person: z.enum(["F", "J"], {
    errorMap: () => ({ message: "O tipo deve ser 'F' ou 'J'" }),
  }),
  firstname: z.string().min(1, "O nome é obrigatório"),
  lastname: z.string().min(1, "O sobrenome é obrigatório"),
  email: z.string().email("Endereço de email inválido"),
  cpf_cnpj: z.string().min(1, "CPF/CNPJ é obrigatório"),
  rg_ie: z.string().min(1, "RG/IE é obrigatório").optional(),
  birthday: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "A data de nascimento deve estar no formato DD/MM/AAAA")
    .refine((val) => {
      const [day, month, year] = val.split("/").map(Number);
      const date = new Date(year, month - 1, day);
      return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
    }, "Data de nascimento inválida"),
  sex: z.enum(["M", "F"], {
    errorMap: () => ({ message: "O sexo deve ser 'M' ou 'F'" }),
  }),
  cellphone: z.string().min(1, "O celular é obrigatório"),
  telephone: z.string().min(1, "O telefone é obrigatório").optional(),
  status: z.enum(["1", "0"], {
    errorMap: () => ({ message: "O status deve ser '1' ou '0'" }),
  }),
  customer_attacked: z
    .enum(["1", "0"], {
      errorMap: () => ({ message: "Cliente atacado deve ser '1' ou '0'" }),
    })
    .optional(),
  limit_credit: z.number().min(0, "O limite de crédito deve ser um número positivo").optional(),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  address: z
    .object({
      firstname: z.string().optional(),
      address_1: z.string().min(1, "O endereço linha 1 é obrigatório"),
      number_home: z.string().min(1, "O número da residência é obrigatório"),
      neighborhood: z.string().min(1, "O bairro é obrigatório"),
      city: z.string().min(1, "A cidade é obrigatória"),
      postcode: z.string().min(1, "O CEP é obrigatório"),
      zone_id: z.string().min(1, "O ID da zona é obrigatório"),
    })
    .optional(),
});

type FormData = z.infer<typeof createUserSchema>;

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(createUserSchema),
  });

  const [showAddressFields, setShowAddressFields] = useState(false);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setValue("address.address_1", data.logradouro || "");
          setValue("address.neighborhood", data.bairro || "");
          setValue("address.city", data.localidade || "");
          setValue("address.zone_id", data.uf || "");
          setValue("address.postcode", cep);
          setShowAddressFields(true);
        } else {
          setShowAddressFields(false);
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        setShowAddressFields(false);
      }
    } else {
      setShowAddressFields(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log("====================================");
    console.log("Dados do formulário:");
    console.log("====================================");
    const user = await createUser(data);
    if (user.success) {
      console.log("Usuário criado com sucesso!");
      toast.success(user.message);
    } else {
      toast.error(user.message);
      console.error("Erro ao criar usuário:", user.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 grid md:grid-cols-2 gap-4">
      <input type="hidden" {...register("type_person")} value="F" />
      <input type="hidden" {...register("status")} value="1" />
      <input type="hidden" {...register("customer_attacked")} value="0" />

      {errors.type_person && <p className="text-xs text-danger-600">{errors.type_person.message}</p>}
      {errors.status && <p className="text-xs text-danger-600">{errors.status.message}</p>}

      <div>
        <label htmlFor="firstname">Nome</label>
        <input id="firstname" {...register("firstname")} placeholder="Nome" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-primary-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-primary-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        {errors.firstname && <p className="text-xs text-danger-600">{errors.firstname.message}</p>}
      </div>

      <div>
        <label htmlFor="lastname">Sobrenome</label>
        <input id="lastname" {...register("lastname")} placeholder="Sobrenome" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-primary-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-primary-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        {errors.lastname && <p className="text-xs text-danger-600">{errors.lastname.message}</p>}
      </div>

      <div>
        <label htmlFor="email">E-mail</label>
        <input id="email" {...register("email")} placeholder="E-mail" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-primary-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-primary-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        {errors.email && <p className="text-xs text-danger-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="cpf_cnpj">CPF</label>
        <input id="cpf_cnpj" {...register("cpf_cnpj")} placeholder="CPF" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-primary-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-primary-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        {errors.cpf_cnpj && <p className="text-xs text-danger-600">{errors.cpf_cnpj.message}</p>}
      </div>

      <div>
        <label htmlFor="birthday">Data de nascimento</label>
        <input id="birthday" {...register("birthday")} placeholder="DD/MM/AAAA" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-primary-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-primary-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        {errors.birthday && <p className="text-xs text-danger-600">{errors.birthday.message}</p>}
      </div>

      <div>
        <label htmlFor="sex">Sexo</label>
        <select id="sex" {...register("sex")} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-primary-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-primary-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <option value="">Selecione o sexo</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
        {errors.sex && <p className="text-xs text-danger-600">{errors.sex.message}</p>}
      </div>

      <div>
        <label htmlFor="cellphone">Celular</label>
        <input id="cellphone" {...register("cellphone")} placeholder="(11) 11111-1111" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-primary-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-primary-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        {errors.cellphone && <p className="text-xs text-danger-600">{errors.cellphone.message}</p>}
      </div>

      <div>
        <label htmlFor="postcode">CEP</label>
        <input id="postcode" {...register("address.postcode")} placeholder="Digite o CEP" onChange={handleCepChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-primary-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-primary-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        {errors.address?.postcode && <p className="text-xs text-danger-600">{errors.address.postcode.message}</p>}
      </div>

      {showAddressFields && (
        <>
          <div>
            <label htmlFor="address_1">Endereço</label>
            <input id="address_1" {...register("address.address_1")} placeholder="Endereço" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-primary-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-primary-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            {errors.address?.address_1 && <p className="text-xs text-danger-600">{errors.address.address_1.message}</p>}
          </div>

          <div>
            <label htmlFor="number_home">Número</label>
            <input id="number_home" {...register("address.number_home")} placeholder="Número" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-primary-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-primary-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            {errors.address?.number_home && <p className="text-xs text-danger-600">{errors.address.number_home.message}</p>}
          </div>

          <div>
            <label htmlFor="neighborhood">Bairro</label>
            <input id="neighborhood" {...register("address.neighborhood")} placeholder="Bairro" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-primary-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-primary-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            {errors.address?.neighborhood && <p className="text-xs text-danger-600">{errors.address.neighborhood.message}</p>}
          </div>

          <div>
            <label htmlFor="city">Cidade</label>
            <input id="city" {...register("address.city")} placeholder="Cidade" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-primary-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-primary-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            {errors.address?.city && <p className="text-xs text-danger-600">{errors.address.city.message}</p>}
          </div>

          <div>
            <label htmlFor="zone_id">Estado (UF)</label>
            <input id="zone_id" {...register("address.zone_id")} placeholder="UF" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-primary-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-primary-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            {errors.address?.zone_id && <p className="text-xs text-danger-600">{errors.address.zone_id.message}</p>}
          </div>
        </>
      )}

      <div>
        <label htmlFor="password">Senha</label>
        <input id="password" {...register("password")} placeholder="**********" type="password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-primary-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-primary-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        {errors.password && <p className="text-xs text-danger-600">{errors.password.message}</p>}
      </div>

      <button type="submit" className="grid col-span-full w-full justify-center rounded-md bg-primary-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
        Criar conta
      </button>
    </form>
  );
};

export default RegisterForm;
