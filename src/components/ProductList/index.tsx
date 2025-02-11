"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";
import { ProductListInfo, IProductList } from "@/types/product_list";
import { useToken } from "@/hooks/TokenProvider";
import { Products } from "../Product";

const loadProducts = async (token: string | null) => {
  if (!token) return [];

  try {
    const response = await api.get<IProductList>("/product/lists", {
      headers: {
        authorization: token,
      },
    });

    if (response.status !== 200) return [];

    return response.data.data;
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
    return [];
  }
};

export function ProductList() {
  const { token } = useToken();
  const { data, isLoading } = useQuery<ProductListInfo[]>({
    queryKey: ["products"],
    queryFn: () => loadProducts(token),
    enabled: !!token, // Só busca se o token estiver disponível
    staleTime: 1000 * 60 * 60, // 1 hora
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  if (isLoading) return <div>Carregando...</div>;

  if (!data || data.length === 0) return <div>Sem produtos para mostrar.</div>;

  return (
    <>
      {data.map((list, index) => {
        if (list.products.length <= 0) return;
        return (
          <div className="list-products" key={index}>
            <span className="list_title flex w-full flex-col items-center my-4 font-bold text-lg lg:text-xl">{list.name}</span>
            <div className="products w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center lg:justify-items-center gap-16 md:gap-16 px-4 py-4 md:px-0">
              <Products products={list.products} />
            </div>
          </div>
        );
      })}
    </>
  );
}
