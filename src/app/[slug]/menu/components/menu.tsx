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

// Extraindo o tipo de uma única subcategoria com seus produtos
type SubCategoryWithProducts = RestaurantWithDetails["categories"][number]["subCategories"][number];

interface MenuProps {
  restaurant: RestaurantWithDetails;
}

const Menu = ({ restaurant }: MenuProps) => {
  // 1. Criamos uma lista única com TODAS as subcategorias do restaurante.
  const allSubCategories = restaurant.categories.flatMap(category => category.subCategories);

  // 2. O estado agora controla a subcategoria selecionada.
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryWithProducts | undefined>(
    allSubCategories[0] // Começa com a primeira subcategoria da lista selecionada
  );
  
  const { products, total, toggleCart, totalQuantity } = useContext(CartContext);
  const isCartVisible = products.length > 0;

  const handleSubCategoryClick = (subCategory: SubCategoryWithProducts) => {
    setSelectedSubCategory(subCategory);
  };

  return (
    <div className="relative z-10 mt-[-2rem] rounded-t-3xl bg-background pt-5">
      {/* Info do Restaurante (permanece igual) */}
      <div className="px-5">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 flex-shrink-0">
            <Image
              src={restaurant.logoUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{restaurant.name}</h1>
            <p className="text-sm text-muted-foreground">{restaurant.description}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <ClockIcon size={16} />
          <span>Aberto</span>
        </div>
      </div>

      {/* 3. Seletor de SUBCATEGORIAS */}
      <ScrollArea className="mt-6 w-full">
        <div className="flex w-max space-x-3 px-5">
          {allSubCategories.map((subCategory) => (
            <Button
              onClick={() => handleSubCategoryClick(subCategory)}
              key={subCategory.id}
              variant={selectedSubCategory?.id === subCategory.id ? "default" : "secondary"}
              className="shrink-0 rounded-full px-4 shadow-sm"
            >
              {subCategory.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>

      {/* 4. Lista de Produtos da subcategoria selecionada */}
      <div className={`mt-6 space-y-6 ${isCartVisible ? 'pb-32' : 'pb-6'}`}>
        {selectedSubCategory ? (
          <Products products={selectedSubCategory.products} />
        ) : (
          <p className="px-5 text-muted-foreground">Selecione uma categoria para ver os produtos.</p>
        )}
      </div>

      {/* Barra "Ver Carrinho" (permanece igual) */}
      {isCartVisible && (
        <div className="fixed bottom-0 left-0 z-20 w-full border-t bg-background p-5 shadow-t-md">
          <div className="mx-auto flex max-w-lg items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Total do Pedido</p>
              <p className="text-base font-semibold">
                {formatCurrency(total)}
                <span className="text-xs font-normal text-muted-foreground">
                  {" "}
                  / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
                </span>
              </p>
            </div>
            <Button onClick={toggleCart}>Ver carrinho</Button>
          </div>
        </div>
      )}
      
      <CartSheet />
    </div>
  );
};

export default Menu;