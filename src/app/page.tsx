import { Search } from "./components/search";
import { CategoryList } from "./components/category-list";
import { RestaurantList } from "@/components/restaurant-list";
import { HeroCarousel } from "./components/hero-carousel";

const HomePage = () => {
  return (
    <div className="space-y-6 py-6">
      <div className="px-5">
        <HeroCarousel />
      </div>

      <div className="px-5">
        <Search />
      </div>

      <CategoryList />

      <RestaurantList title="Ofertas Especiais" />
      
      <RestaurantList title="Restaurantes Recomendados" />
    </div>
); };

export default HomePage;