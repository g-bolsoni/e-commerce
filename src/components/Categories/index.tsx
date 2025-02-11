"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { MdClose } from "react-icons/md";

import { api } from "@/services/api";
import { ProcessedCategory } from "@/types/categories";
import { useToken } from "@/hooks/TokenProvider";
import { formatCategories } from "@/util/formatCategories";

const loadCategories = async (token: string | null) => {
  if (!token) return [];

  try {
    const response = await api.get("/category", {
      headers: {
        authorization: token,
      },
    });

    if (response.status !== 200) return [];

    const processedData = formatCategories(response.data.data);
    return processedData;
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
    return [];
  }
};

export const Categories = () => {
  const { token } = useToken();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => loadCategories(token),
    enabled: !!token, // Só busca se o token estiver disponível
    staleTime: 1000 * 60 * 60, // 1 hora
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div className={`categories flex flex-col h-full w-full pt-20 fixed top-0 transition-all duration-500 bg-white z-20 pl-4 gap-0 ${false ? "left-0" : "-left-full"} md:relative md:flex-row md:left-0 md:pt-0 md:bg-transparent md:justify-center md:items-center md:gap-6 md:p-1 md:w-full md:flex-wrap md:gap-y-2`}>
      <div className={`close_categories absolute top-10 right-5 md:hidden ${false ? "block" : "hidden"} `}>
        <MdClose size={24} color="#000" />
      </div>

      {categories?.map((category) => <CategoryItem key={category.category_id} category={category} />)}
    </div>
  );
};

const CategoryItem = ({ category }: { category: ProcessedCategory }) => (
  <div className="category-item relative">
    <Link href={`/${category.name.toLowerCase()}`} className="w-max capitalize transition-all duration-200 border-primary-500 hover:border-b text-[#212121] text-base p-1">
      {category.name}
    </Link>

    {category.children.length > 0 && (
      <div className="pl-2 absolute top-full flex flex-col rounded-lg gap-3 min-w-52 min-h-16 justify-center items-start bg-gray-200 z-10">
        {category.children.map((child) => (
          <CategoryItem key={child.category_id} category={child} />
        ))}
      </div>
    )}
  </div>
);
