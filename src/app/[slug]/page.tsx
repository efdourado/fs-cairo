import { notFound } from "next/navigation";
import Image from "next/image";
import { AppRestaurantController } from "@/controllers";
import { StarIcon, TimerIcon, Helicopter } from "lucide-react";
import { formatCurrency } from "@/helpers/format-currency";
import OrderTypeSelector from "./components/order-type-selector";

interface RestaurantPageProps {
  params: Promise<{
    slug: string;
}>; }

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const { restaurant } = await AppRestaurantController.getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="relative h-[250px] w-full shrink-0">
        <Image
          src={restaurant.bannerUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center text-white p-4">
          <div className="relative h-24 w-24 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden">
            <Image
              src={restaurant.logoUrl}
              alt={restaurant.name}
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold drop-shadow-md">{restaurant.name}</h1>
          <p className="text-sm font-medium opacity-90 max-w-[80%] drop-shadow-md">
            {restaurant.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-border border-b border-border bg-card py-5 shadow-sm shrink-0">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="flex items-center gap-1 text-yellow-500">
            <StarIcon className="fill-yellow-400" size={20} />
            <span className="text-base font-bold">{restaurant.rating.toFixed(1)}</span>
          </div>
          <span className="text-xs font-medium text-muted-foreground tracking-wide">Média (Avaliações)</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="flex items-center gap-1 text-primary">
            <Helicopter size={20} />
            <span className="text-base font-bold">{formatCurrency(restaurant.deliveryFee)}</span>
          </div>
          <span className="text-xs font-medium text-muted-foreground tracking-wide">Taxa de Entrega</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="flex items-center gap-1 text-primary">
            <TimerIcon size={20} />
            <span className="text-base font-bold">{restaurant.deliveryTimeMinutes} min</span>
          </div>
          <span className="text-xs font-medium text-muted-foreground tracking-wide">Tempo de Preparo</span>
        </div>
      </div>
      
      <OrderTypeSelector slug={restaurant.slug} />
    </div>
); };

export default RestaurantPage;