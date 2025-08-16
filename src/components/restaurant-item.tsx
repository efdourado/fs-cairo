import { Restaurant } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <Link href={`/${restaurant.slug}`}>
      <Card className="min-w-full max-w-full rounded-lg border-none shadow-md transition-transform duration-300 hover:scale-105">
        <CardContent className="p-0">
          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
            <Image
              src={restaurant.bannerUrl}
              alt={restaurant.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-3">
            <h3 className="font-semibold">{restaurant.name}</h3>
          </div>
        </CardContent>
      </Card>
    </Link>
); };

export default RestaurantItem;