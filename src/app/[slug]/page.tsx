import { notFound } from "next/navigation";
import Image from "next/image";
import { AppRestaurantController } from "@/controllers";
import { StarIcon, TimerIcon } from "lucide-react";
import { formatCurrency } from "@/helpers/format-currency";
import OrderTypeSelector from "./components/order-type-selector";

interface RestaurantPageProps {
  params: {
    slug: string;
}; }

const RestaurantPage = async ({ params: { slug } }: RestaurantPageProps) => {
  const { restaurant } = await AppRestaurantController.getRestaurantBySlug(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex h-full flex-col">
      {/* HERO SECTION APRIMORADO */}
      <div className="relative h-48 w-full">
        <Image
          src={restaurant.bannerUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center text-white">
          <div className="relative h-16 w-16">
            <Image
              src={restaurant.logoUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <p className="text-sm opacity-80">{restaurant.description}</p>
        </div>
      </div>

      {/* INFORMAÇÕES ADICIONAIS */}
      <div className="flex justify-around border-b border-border bg-card p-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <StarIcon className="fill-yellow-400 text-yellow-500" size={16} />
            <span className="font-semibold">{restaurant.rating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-muted-foreground">Avaliações</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold">
            {formatCurrency(restaurant.deliveryFee)}
          </span>
          <span className="text-xs text-muted-foreground">Entrega</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <TimerIcon size={16} />
            <span className="font-semibold">{restaurant.deliveryTimeMinutes} min</span>
          </div>
          <span className="text-xs text-muted-foreground">Tempo estimado</span>
        </div>
      </div>

      <OrderTypeSelector slug={restaurant.slug} />
    </div>
); };

export default RestaurantPage;