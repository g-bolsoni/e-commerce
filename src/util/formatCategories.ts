import { CategoryInfo, ProcessedCategory } from "@/types/categories";

/**
 * Organiza as categorias em uma estrutura hierárquica, adicionando subcategorias no array `children`
 * @param categories Lista de categorias obtida da API
 * @returns Lista de categorias formatadas com subcategorias aninhadas
 */
export const formatCategories = (categories: CategoryInfo[]): ProcessedCategory[] => {
  const categoryMap: Record<number, ProcessedCategory> = {};
  const newCategories: ProcessedCategory[] = [];

  for (const category of categories) {
    // Se a categoria ainda não existe no mapa, criamos ela
    if (!categoryMap[category.category_id]) {
      categoryMap[category.category_id] = {
        category_id: category.category_id,
        name: category.category_description?.[0]?.name || "",
        meta_title: category.category_description?.[0]?.meta_title || "",
        meta_description: category.category_description?.[0]?.meta_description || "",
        meta_keyword: category.category_description?.[0]?.meta_keyword || "",
        children: [],
      };
    } else {
      // Se o objeto já existir, atualize as informações caso estejam vazias
      categoryMap[category.category_id].name ||= category.category_description?.[0]?.name || "";
      categoryMap[category.category_id].meta_title ||= category.category_description?.[0]?.meta_title || "";
      categoryMap[category.category_id].meta_description ||= category.category_description?.[0]?.meta_description || "";
      categoryMap[category.category_id].meta_keyword ||= category.category_description?.[0]?.meta_keyword || "";
    }

    // Se a categoria tem um pai, adicionamos ao array children do pai
    if (category.parent_id !== 0) {
      if (!categoryMap[category.parent_id]) {
        categoryMap[category.parent_id] = {
          category_id: category.parent_id,
          name: "", // Placeholder
          meta_title: "",
          meta_description: "",
          meta_keyword: "",
          children: [],
        };
      }
      categoryMap[category.parent_id].children.push(categoryMap[category.category_id]);
    } else {
      // Se for uma categoria raiz, adicionamos ao array final
      newCategories.push(categoryMap[category.category_id]);
    }
  }

  return newCategories;
};
