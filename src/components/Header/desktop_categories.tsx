import Link from "next/link";

interface Category {
  category_id: number;
  name: string;
  slug: string;
  children: Category[];
}

interface DesktopCategoriesProps {
  categories: Category[];
}

const DesktopCategories = ({ categories }: DesktopCategoriesProps) => {
  return (
    <nav className="flex items-center gap-1">
      {categories.map((category) => (
        <Link
          href={`/categoria/${category.slug}`}
          key={category.category_id}
          className="relative px-3 py-2 text-sm font-medium text-gray-700 capitalize transition-colors duration-200 hover:text-primary-500 group"
        >
          {category.name}
          {/* Underline animado */}
          <span className="absolute -bottom-0.5 left-3 right-3 h-0.5 bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
        </Link>
      ))}
    </nav>
  );
};

export default DesktopCategories;
