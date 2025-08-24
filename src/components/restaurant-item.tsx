import { Restaurant } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Card } from "./ui/card";
import { StarIcon, TimerIcon, SparklesIcon } from "lucide-react";
import { formatCurrency } from "@/helpers/format-currency";

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
          <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 text-xs font-bold backdrop-blur-sm">
            <StarIcon size={14} className="fill-yellow-400 text-yellow-500" />
            <span>{restaurant.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="p-3">
          <h3 className="truncate text-base font-semibold">{restaurant.name}</h3>
          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <TimerIcon size={14} />
              <span>{restaurant.deliveryTimeMinutes} min</span>
            </div>
            <div className="flex items-center gap-1">
              <SparklesIcon size={14} className="text-primary" />
              <span>{formatCurrency(restaurant.deliveryFee)}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
); };

export default RestaurantItem;