import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

export const CategoryItem = ({ category }: CategoryItemProps) => {
  const categoryImages: { [key: string]: string } = {
    Lanches: "/fries.png",
  };

  const categoryImage =
    categoryImages[category.name] || "/default-category.png";

  return (
    <Link
      href={`/categories/${category.id}`}
      className="flex flex-col items-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
        <Image
          src={categoryImage}
          alt={category.name}
          height={40}
          width={40}
          className="object-contain"
        />
      </div>
      <span className="mt-2 text-xs font-medium">{category.name}</span>
    </Link>
); };