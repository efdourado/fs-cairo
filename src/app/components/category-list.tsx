import { db } from "@/lib/prisma";
import { CategoryItem } from "./category-item";

export const CategoryList = async () => {
  const categories = await db.category.findMany({});

  return (
    <div className="flex gap-3 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
); };