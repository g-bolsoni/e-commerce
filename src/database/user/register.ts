"use server";

import { IUser } from "@/types/user";
import User from "../models/UserRegisterModel";

export async function createUser(data: IUser) {
  if (data.address) {
    data.address.firstname = data.firstname;
  }

  try {
    const verifyUser = await User.findOne({ email: data.email });

    if (verifyUser) {
      return {
        success: false,
        message: "Usuário possui cadastro",
      };
    }

    const user = await User.insertOne(data);

    if (!user) {
      return {
        success: false,
        message: "Algo deu errado, tente mais tarde!",
      };
    }

    return {
      success: true,
      message: "Usuário criado com sucesso!",
    };
  } catch (error) {
    console.log("aqui");
    return {
      success: false,
      message: "Algo deu errado, tente mais tarde!",
    };
    console.log(error);
  }
}
