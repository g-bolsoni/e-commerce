import { GetToken } from "@/types";
import axios from "axios";

let baseUrl = "https://sandbox.irroba.com.br/v1";

export const api = axios.create({
  baseURL: baseUrl,
});

export const tokenApi = async () => {
  try {
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
  } catch (error) {
    console.log(error);

    const responseError = {
      authorization: null,
      date_expire: null,
    };

    return responseError;
  }
};
