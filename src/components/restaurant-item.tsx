import { Restaurant } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Card } from "./ui/card";
import { StarIcon, TimerIcon } from "lucide-react";
import { formatCurrency } from "@/helpers/format-currency";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <Link
      href={`/${restaurant.slug}`}
      className="block min-w-[250px] max-w-[250px] transition-transform duration-300 hover:scale-105"
    >
      <Card className="w-full overflow-hidden rounded-lg">
        <div className="relative h-36 w-full">
          <Image
            src={restaurant.bannerUrl}
            alt={restaurant.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div className="relative p-4">
          <div className="absolute -top-8 left-4 h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
            <Image
              src={restaurant.logoUrl}
              alt={restaurant.name}
              fill
              className="object-contain"
              sizes="96px"
            />
          </div>

          <div className="mt-6 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-base font-semibold">
                {restaurant.name}
              </h3>
              <div className="ml-auto flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white">
                <StarIcon size={12} className="fill-white" />
                <span>{restaurant.rating.toFixed(1)}</span>
              </div>
            </div>

            <p className="truncate text-sm text-muted-foreground">
              {restaurant.description}
            </p>

            <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>Entrega: {formatCurrency(restaurant.deliveryFee)}</span>
              <div className="flex items-center gap-1">
                <TimerIcon size={14} />
                <span>{restaurant.deliveryTimeMinutes} min</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
); };

export default RestaurantItem;