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

  if (response.status != 200) return "";

  return response.data.data.authorization;
};
