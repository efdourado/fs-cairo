import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

export const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link
      href={`/categories/${category.id}`}
      className="flex flex-col items-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
        <Image
          src="/default-category.png"
          alt={category.name}
          height={43}
          width={43}
          className="object-contain"
        />
      </div>

      <span className="mt-1 text-xs font-medium truncate max-w-[72px]">{category.name}</span>
    </Link>
); };