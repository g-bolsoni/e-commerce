"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { tokenApi } from "@/services/api";

interface TokenContextProps {
  token: string | null;
  isTokenReady: boolean;
}

const TokenContext = createContext<TokenContextProps>({
  token: null,
  isTokenReady: false,
});

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isTokenReady, setIsTokenReady] = useState(false);

  useEffect(() => {
    const getApiToken = async () => {
      const { authorization, date_expire } = await tokenApi();
      if (authorization) {
        localStorage.setItem("apiToken", authorization);
        localStorage.setItem("apiTokenExpiration", date_expire);
        setToken(authorization);
      }
      setIsTokenReady(true);
    };

    const checkTokenExpiration = () => {
      const apiTokenExpiration = localStorage.getItem("apiTokenExpiration");
      const apiToken = localStorage.getItem("apiToken");

      if (apiTokenExpiration && new Date() < new Date(apiTokenExpiration)) {
        setToken(apiToken);
        setIsTokenReady(true);
      } else {
        getApiToken();
      }
    };

    checkTokenExpiration();
  }, []);

  return <TokenContext.Provider value={{ token, isTokenReady }}>{isTokenReady ? children : <div>Carregando...</div>}</TokenContext.Provider>;
};

export const useToken = () => useContext(TokenContext);
