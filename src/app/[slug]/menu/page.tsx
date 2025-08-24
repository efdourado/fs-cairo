import { notFound } from "next/navigation";
import Image from "next/image";
import { AppRestaurantController } from "@/controllers";
import Menu from "./components/menu";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ orderType: string }>;
}

const isOrderTypeValid = (orderType: string) => {
  return ["DINEIN", "TAKEAWAY"].includes(orderType?.toUpperCase());
};

const RestaurantMenuPage = async ({ params, searchParams }: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { orderType } = await searchParams;

  if (!isOrderTypeValid(orderType)) {
    return notFound();
  }

  const { restaurant } = await AppRestaurantController.getRestaurantWithCategories(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <div className="relative h-64 w-full">
        <Image
          src={restaurant.bannerUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <Menu restaurant={restaurant} />
    </div>
); };

export default RestaurantMenuPage;