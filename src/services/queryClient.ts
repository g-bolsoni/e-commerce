"use client";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false, // Não refaz ao trocar o foco da janela
      refetchOnReconnect: false, // Não refaz ao reconectar
      refetchOnMount: false, // Não refaz ao montar o componente
    },
  },
});
