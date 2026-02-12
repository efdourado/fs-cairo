"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import { ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { RestaurantWithDetails } from "@/persistence/daos/interfaces/i-restaurant.dao";
import { formatCurrency } from "@/helpers/format-currency";
import { CartContext } from "../contexts/cart";
import Products from "./products";
import CartSheet from "./cart-sheet";

type CategoryWithSubCategories = RestaurantWithDetails["categories"][number];

interface RestaurantCategoriesProps {
  restaurant: RestaurantWithDetails;
}

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryWithSubCategories | undefined>(
    restaurant.categories[0]
  );
  
  const { products, total, toggleCart, totalQuantity } = useContext(CartContext);

  const handleCategoryClick = (category: CategoryWithSubCategories) => {
    setSelectedCategory(category);
  };

  return (
    <div className="relative z-10 mt-[-1.5rem] rounded-t-3xl bg-background">
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12">
            <Image
              src={restaurant.logoUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">{restaurant.name}</h1>
            <p className="text-xs text-muted-foreground">{restaurant.description}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <ClockIcon size={14} />
          <p>Aberto agora</p>
        </div>
      </div>

      <ScrollArea className="w-full">
        <div className="flex w-max space-x-2 px-5 py-2">
          {restaurant.categories.map((category) => (
            <Button
              onClick={() => handleCategoryClick(category)}
              key={category.id}
              variant={selectedCategory?.id === category.id ? "default" : "secondary"}
              size="sm"
              className="shrink-0 rounded-full px-4 transition-all"
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="px-5" />
      </ScrollArea>

      <div className="mt-4 space-y-6 pb-24">
        {selectedCategory?.subCategories.map((subCategory) => (
          <div key={subCategory.id}>
            <h2 className="mb-2 px-5 text-lg font-semibold">{subCategory.name}</h2>
            <Products products={subCategory.products} />
          </div>
        ))}
      </div>

      {products.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 flex w-full products-center justify-between border-t bg-white px-5 py-3">
          <div>
            <p className="text-xs text-muted-foreground">Order Total</p>
            <p className="text-sm font-semibold">
              {formatCurrency(total)}
              <span className="text-xs font-normal text-muted-foreground">
                / {totalQuantity} {totalQuantity > 1 ? "products" : "product"}
              </span>
            </p>
          </div>
          <Button onClick={toggleCart}>View Cart</Button>
          <CartSheet />
        </div>
      )}
      <CartSheet />
    </div>
); };

export default RestaurantCategories;