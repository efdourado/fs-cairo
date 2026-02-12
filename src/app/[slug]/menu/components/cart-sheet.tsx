import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";
import { CartContext } from "../contexts/cart";
import CartProductItem from "./cart-product-item";
import FinishOrderDialog from "./finish-order-dialog";

const CartSheet = () => {
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);
  const { isOpen, toggleCart, products, total } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%] flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-left">Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex-grow overflow-auto space-y-5">
          {products.map((product) => (
            <CartProductItem key={product.id} product={product} />
          ))}
        </div>

        <div className="sticky bottom-0 bg-white py-4">
          <Card className="mb-3">
            <CardContent className="p-5">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-sm font-semibold">{formatCurrency(total)}</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-1">
            <Button className="w-full rounded-full" onClick={() => setFinishOrderDialogIsOpen(true)}>Prosseguir</Button>
            
            <Button variant="outline" className="w-full rounded-full" onClick={toggleCart}>Continuar Pedindo</Button>
          </div>
        </div>

        <FinishOrderDialog open={finishOrderDialogIsOpen} onOpenChange={setFinishOrderDialogIsOpen} />
      </SheetContent>
    </Sheet>
); };

export default CartSheet;