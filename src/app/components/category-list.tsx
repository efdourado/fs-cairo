import { db } from "@/lib/prisma";
import { CategoryItem } from "./category-item";

export const CategoryList = async () => {
  const categories = await db.category.findMany({
    distinct: ["name"],
  });

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
); };