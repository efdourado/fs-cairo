import { db } from "@/lib/prisma";
import RestaurantItem from "./restaurant-item";
import { Title } from "@/app/components/title";

interface RestaurantListProps {
  title: string;
}

export const RestaurantList = async ({ title }: RestaurantListProps) => {
  const restaurants = await db.restaurant.findMany({ take: 10 });

  return (
    <div className="space-y-3">
      <div className="px-5">
        <Title text={title} />
      </div>
      <div className="flex gap-4 overflow-x-scroll px-5 py-3 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        {restaurants.map((restaurant) => (
          <RestaurantItem key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
); };