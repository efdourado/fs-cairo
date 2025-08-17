import { notFound } from "next/navigation";
import RestaurantCategories from "./components/categories";
import { RestaurantController } from "@/controllers/restaurant.controller";
import Image from "next/image";


interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ orderType: string }>;
}

const isOrderTypeValid = (orderType: string) => {
  return ["DINEIN", "TAKEAWAY"].includes(orderType.toUpperCase());
};

const restaurantController = new RestaurantController();

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { orderType } = await searchParams;

  if (!isOrderTypeValid(orderType)) {
    return notFound();
  }

  const { success, restaurant } = await restaurantController.getRestaurantWithCategories(slug);

  if (!success || !restaurant) {
    return notFound();
  }

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          src={restaurant.bannerUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <RestaurantCategories restaurant={restaurant} />
    </div>
); };

export default RestaurantMenuPage;