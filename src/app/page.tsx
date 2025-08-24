import { db } from "@/lib/prisma";
import { CategoryList } from "./components/category-list";
import { HeroCarousel } from "./components/hero-carousel";
import { RestaurantList } from "@/components/restaurant-list";
import { Search } from "./components/search";

const getPromotionalProducts = () => {
  return db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
    }, },
    include: {
      restaurant: true,
    },
    take: 5,
}); };

const HomePage = async () => {
  const promotionalProducts = await getPromotionalProducts();

  return (
    <div className="space-y-6 py-6">
      <div className="px-5">
        <Search />
      </div>

      <HeroCarousel promotionalProducts={promotionalProducts} />
      
      <CategoryList />

      <RestaurantList title="Restaurantes Recomendados" />
    </div>
); };

export default HomePage;