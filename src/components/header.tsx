"use client";

import {
  ChevronLeftIcon,
  MapPinIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "./ui/button";
import { useContext } from "react";
import { CartContext } from "@/app/[slug]/menu/contexts/cart";
import { cn } from "@/lib/utils";

const Header = () => {
  const router = useRouter();
  const params = useParams();
  const { toggleCart, totalQuantity } = useContext(CartContext);

  const handleBackClick = () => router.back();
  const handleOrdersClick = () => router.push(`/${params.slug}/orders`);

  const isRestaurantPage = params.slug;

  return (
    <header
      className={cn("absolute top-0 left-0 w-full z-10 flex items-center justify-between px-6 py-5",
        isRestaurantPage ? "bg-transparent text-white" : "bg-background text-foreground"
      )}
    >
      {isRestaurantPage ? (
        <Button
          onClick={handleBackClick}
          variant="secondary"
          size="icon"
          className="rounded-full"
        >
          <ChevronLeftIcon />
        </Button>
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <MapPinIcon size={20} className="text-primary -ml-0.5" />
            <span className="text-sm font-semibold">São Paulo, SP</span>
          </div>
          
          <span className="text-xs text-muted-foreground">
            Selecione seu endereço
          </span>
        </div>
      )}

      <div className="relative">
        <Button
          onClick={toggleCart}
          variant="secondary"
          size="icon"
          className="rounded-full"
        >
          <ShoppingCartIcon />
        </Button>
        {totalQuantity > 0 && (
          <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            {totalQuantity}
          </span>
        )}
      </div>
    </header>
); };

export default Header;