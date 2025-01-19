"use client";

import { api } from "@/services/api";
import { CategoryInfo, ICategories } from "@/types/categories";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { MdClose } from "react-icons/md";

const loadCategories = async () => {
  if (!localStorage.getItem("apiToken")) return [];

  const token = localStorage.getItem("apiToken");

  const response = await api.get("/category", {
    headers: {
      authorization: token,
    },
  });

  if (response.status != 200) return [];

  const topCategories = response.data.data.filter(
    (category: CategoryInfo) => category.status && category.parent_id == 0
  );

  return topCategories;
};

export const Categories = () => {
  const [showCategory, setShowCategory] = useState(false);

  function handleToggleCategory() {
    setShowCategory(!showCategory);
  }

  const { data, isLoading } = useQuery<ICategories>({
    queryKey: ["categories"],
    queryFn: loadCategories,
  });

  return (
    <div
      className={`categories flex flex-col h-full w-full pt-20 fixed top-0 transition-all duration-500 bg-white z-20 pl-4 gap-0 ${
        showCategory ? "left-0" : "-left-full"
      } md:relative md:flex-row md:left-0 md:pt-0 md:bg-transparent md:justify-center md:items-center md:gap-6 md:p-1 md:w-full md:flex-wrap md:overflow-hidden md:gap-y-2`}
    >
      <div
        className={`close_categories absolute top-10 right-5 md:hidden ${
          showCategory ? "block" : "hidden"
        } `}
        onClick={() => handleToggleCategory()}
      >
        <MdClose size={24} color="#000" />
      </div>

      {isLoading && !data ? (
        <>
          <span className="w-max transition-all duration-200 border-primary-500 hover:border-b text-[#212121] text-base p-1">
            Masculino
          </span>
          <span className="w-max transition-all duration-200 border-primary-500 hover:border-b text-[#212121] text-base p-1">
            Feminino
          </span>
          <span className="w-max transition-all duration-200 border-primary-500 hover:border-b text-[#212121] text-base p-1">
            Infantil
          </span>
          <span className="w-max transition-all duration-200 border-primary-500 hover:border-b text-[#212121] text-base p-1">
            Casual
          </span>
          <span className="w-max transition-all duration-200 border-primary-500 hover:border-b text-[#212121] text-base p-1">
            Social
          </span>
        </>
      ) : (
        <>
          {data?.map((category: CategoryInfo) => (
            <Link
              key={category.category_id}
              href={`category/${category.category_description[0].name.toLowerCase()}`}
              className="w-max capitalize transition-all duration-200 border-primary-500 hover:border-b text-[#212121] text-base p-1"
            >
              {category.category_description[0].name}
            </Link>
          ))}
        </>
      )}
    </div>
  );
};
