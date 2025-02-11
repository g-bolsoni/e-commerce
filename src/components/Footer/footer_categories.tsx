import Link from "next/link";

const FooterCategories = () => {
  interface Category {
    category_id: number;
    name: string;
    meta_title: string;
    meta_description: string;
    meta_keyword: string;
    children: Category[];
  }

  const categories: Category[] = [
    {
      category_id: 7,
      name: "Social",
      meta_title: "Social",
      meta_description: "Social",
      meta_keyword: "Social",
      children: [],
    },
    {
      category_id: 6,
      name: "Esporte",
      meta_title: "Esporte",
      meta_description: "Esporte",
      meta_keyword: "Esporte",
      children: [
        {
          category_id: 9,
          name: "Natação",
          meta_title: "Natação",
          meta_description: "Natação",
          meta_keyword: "Natação",
          children: [],
        },
        {
          category_id: 8,
          name: "Futebol",
          meta_title: "Futebol",
          meta_description: "Futebol",
          meta_keyword: "Futebol",
          children: [],
        },
      ],
    },
    {
      category_id: 1,
      name: "Masculino",
      meta_title: "Categoria 1",
      meta_description: "",
      meta_keyword: "",
      children: [],
    },
    {
      category_id: 2,
      name: "Feminino",
      meta_title: "Categoria 2",
      meta_description: "",
      meta_keyword: "",
      children: [],
    },
    {
      category_id: 3,
      name: "Infantil",
      meta_title: "Categoria 3",
      meta_description: "",
      meta_keyword: "",
      children: [],
    },
    {
      category_id: 4,
      name: "Casual",
      meta_title: "Categoria 4",
      meta_description: "",
      meta_keyword: "",
      children: [],
    },
  ];

  return (
    <ul className="flex flex-col gap-2 items-center md:items-start">
      {categories.map((category) => (
        <li key={category.category_id}>
          <Link href={`/${category.name.toLowerCase()}`}> {category.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default FooterCategories;
