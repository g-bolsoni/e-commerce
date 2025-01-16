import { GetToken } from "@/types";
import axios from "axios";

// // let baseUrl = "http://localhost:3333";
// // let baseUrl = "https://fakestoreapi.com";
let baseUrl = "https://api.irroba.com.br/v1";

export const api = axios.create({
  baseURL: baseUrl,
});

export const tokenApi = async () => {
  const response = await api.post<GetToken>("getToken", {
    username: "mydevsto_giovane1",
    password: "YV8b8Dat8W0FAqKNW20QFoAUvCdETgG6ySk82Aa",
  });

  if (response.status != 200) {
    return {
      authorization: "",
      date_expire: "",
    };
  }

  return response.data.data;
};

export const customerLogin = async (email: string, password: string) => {
  if (!localStorage.getItem("apiToken")) return false;

  const token = localStorage.getItem("apiToken");

  const response = await api.post(
    "customer/login",
    {
      email,
      password,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );

  if (response.data.success == "false") {
    return response.data;
  }

  return response.data.data;
};
