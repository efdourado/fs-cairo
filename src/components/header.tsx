"use client";

import {
  ChevronLeftIcon,
  MapPinIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useContext } from "react";
import { CartContext } from "@/app/[slug]/menu/contexts/cart";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { toggleCart, totalQuantity } = useContext(CartContext);

  const handleBackClick = () => router.back();
  const isHomePage = pathname === "/";

  return (
    <header className="px-6 py-4 rounded-b-3xl bg-background">
      <div className="flex items-center justify-between">
        {isHomePage ? (
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <MapPinIcon size={18} className="text-primary" />
              <span className="text-sm font-semibold">São Paulo, SP</span>
            </div>
            <span className="text-xs text-muted-foreground">
              Selecione seu endereço
            </span>
          </div>
        ) : (
          <Button
            onClick={handleBackClick}
            variant="secondary"
            size="icon"
            className="absolute left-4 top-4 z-50 rounded-full"
          >
            <ChevronLeftIcon />
          </Button>
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
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {totalQuantity}
            </span>
          )}
        </div>
      </div>
    </header>
); };

export default Header;