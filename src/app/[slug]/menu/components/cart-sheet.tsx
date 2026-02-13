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
import { Frown } from "lucide-react";

const CartSheet = () => {
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);
  const { isOpen, toggleCart, products, total } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%] flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-left">Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex-grow overflow-y-auto pb-32 px-1 scrollbar-hide">
          {products.length > 0 ? (
            products.map((product) => (
              <CartProductItem key={product.id} product={product} />
            ))
          ) : (
            <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-muted p-6">
                <Frown className="h-10 w-10 text-muted-foreground" />
              </div>
              <div>
                <p className="text-lg font-semibold">Seu carrinho não tem itens!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Selecione itens do menu para fazer um pedido.
                </p>
              </div>
            </div>
          )}
        </div>

        {products.length > 0 && (
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
        )}

        <FinishOrderDialog open={finishOrderDialogIsOpen} onOpenChange={setFinishOrderDialogIsOpen} />
      </SheetContent>
    </Sheet>
); };

export default CartSheet;