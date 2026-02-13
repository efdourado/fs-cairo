"use client";

import { ChevronLeftIcon, MapPinIcon, ShoppingCartIcon } from "lucide-react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useState, useContext } from "react";
import { CartContext } from "@/app/[slug]/menu/contexts/cart";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const Header = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const { toggleCart, totalQuantity, products, setProducts } = useContext(CartContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const showCartButton = pathname.includes("/menu");

  const handleBackClick = () => {
    const isMenuPage = pathname.endsWith("/menu");

    if (products.length > 0 && isMenuPage) {
      setIsDrawerOpen(true);
    } else {
      router.back();
  } };
  
  const onConfirmBack = () => {
    setProducts([]);
    setIsDrawerOpen(false);
    router.back();
  };
  const isRestaurantPage = !!params.slug;

  return (
    <header
      className={cn(
        "absolute top-0 left-0 w-full z-10 flex items-center justify-between px-6 py-5",
        isRestaurantPage ? "bg-transparent text-white" : "bg-background text-foreground"
      )}
    >
      {isRestaurantPage ? (
        <Button
          onClick={handleBackClick}
          variant="secondary"
          size="icon"
          className="rounded-full h-11 w-11 bg-white text-black"
        >
          <ChevronLeftIcon size={24} />
        </Button>
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <MapPinIcon size={20} className="text-primary -ml-0.5" />
            <span className="text-sm font-semibold">São Paulo, SP</span>
          </div>
          <span className="text-xs text-muted-foreground">Selecione seu endereço</span>
        </div>
      )}

      {showCartButton && (
        <div className="relative">
          <Button
            onClick={toggleCart}
            variant="secondary"
            size="icon"
            className="rounded-full h-11 w-11"
          >
            <ShoppingCartIcon size={24} />
          </Button>
          {totalQuantity > 0 && (
            <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {totalQuantity}
            </span>
          )}
        </div>
      )}

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Sair?</DrawerTitle>
              <DrawerDescription>
                Seu carrinho tem itens! Se sair, os itens não serão salvos.
              </DrawerDescription>
            </DrawerHeader>

            <DrawerFooter>
              <Button 
                onClick={onConfirmBack} 
                variant="destructive"
                className="w-full rounded-full"
              >
                Sair mesmo assim
              </Button>

              <DrawerClose asChild>
                <Button variant="outline" className="w-full rounded-full">
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </header>
); };

export default Header;