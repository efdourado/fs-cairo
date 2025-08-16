import { Restaurant } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Card } from "./ui/card";
import { StarIcon, TimerIcon } from "lucide-react";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <Link href={`/${restaurant.slug}`} className="min-w-[280px] max-w-[280px]">
      <Card className="w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
        <div className="relative h-36 w-full overflow-hidden rounded-t-lg">
          <Image
            src={restaurant.bannerUrl}
            alt={restaurant.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <div className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-semibold text-white">
            20% OFF
          </div>
        </div>
        <div className="p-3">
          <h3 className="truncate font-semibold">{restaurant.name}</h3>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            {/* Mock Data */}
            <div className="flex items-center gap-1">
              <StarIcon size={14} className="text-yellow-500" />
              <span>4.5</span>
            </div>
            <span>Burgers</span>
            <span>$$</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <TimerIcon size={14} />
            <span>15-25 min</span>
          </div>
        </div>
      </Card>
    </Link>
); };

export default RestaurantItem;