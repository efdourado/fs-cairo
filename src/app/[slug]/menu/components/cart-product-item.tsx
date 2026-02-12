import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";
import { CartContext, CartProduct } from "../contexts/cart";

interface CartItemProps { product: CartProduct; }

const CartProductItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } = useContext(CartContext);
  return (
    <div className="flex items-center justify-between min-w-0">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative h-20 w-20 rounded-xl flex-shrink-0">
          <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>

        <div className="space-y-1 min-w-0">
          <p className="truncate text-ellipsis text-xs">{product.name}</p>
          <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>

          <div className="flex items-center gap-1 text-center">
            <Button
              className="h-7 w-7 rounded-lg"
              variant="outline"
              onClick={() => decreaseProductQuantity(product.id)}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-7 text-xs">{product.quantity}</p>
            <Button
              className="h-7 w-7 rounded-lg"
              variant="destructive"
              onClick={() => increaseProductQuantity(product.id)}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
      <Button
        className="h-7 w-7 rounded-lg flex-shrink-0"
        variant="outline"
        onClick={() => removeProduct(product.id)}
      >
        <TrashIcon />
      </Button>
    </div>
); };

export default CartProductItem;