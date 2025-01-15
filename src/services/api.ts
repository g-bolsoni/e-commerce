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
    username: "lojademo_vieiragv",
    password: "MxSit2ZQySeAiiTCRLs8BzPDI5rYkMXc1FjJXAZ",
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
    console.log(response.data);
    
    return response.data;
  }


  

  console.log(JSON.stringify(response.data.data));
};
