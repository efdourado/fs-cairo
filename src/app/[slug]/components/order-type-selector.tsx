"use client";

import { useState } from "react";
import Link from "next/link";
import { OrderType } from "@prisma/client";
import { Button } from "@/components/ui/button";
import OrderTypeOption from "./order-type-option";
import { Separator } from "@/components/ui/separator";

interface OrderTypeSelectorProps {
  slug: string;
}

const OrderTypeSelector = ({ slug }: OrderTypeSelectorProps) => {
  const [selectedOption, setSelectedOption] = useState<OrderType | null>(null);

  return (
    <>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-center text-lg font-semibold">
          Como você quer receber seu pedido?
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <OrderTypeOption
            option="DINEIN"
            buttonText="Consumir no Local"
            note="Peça e pague sem filas"
            icon="🍽️"
            isSelected={selectedOption === "DINEIN"}
            onClick={() => setSelectedOption("DINEIN")}
          />
          <OrderTypeOption
            option="TAKEAWAY"
            buttonText="Para Viagem"
            note="Retire no balcão ou receba em casa"
            icon="🚀"
            isSelected={selectedOption === "TAKEAWAY"}
            onClick={() => setSelectedOption("TAKEAWAY")}
          />
        </div>

        <div className="mt-6 flex-1">
          {selectedOption === "DINEIN" && (
            <div className="rounded-lg bg-secondary p-4 text-center">
              <h3 className="font-semibold">Pagamento direto pelo app</h3>
              <p className="text-sm text-muted-foreground">
                Evite filas! Faça seu pedido e pague diretamente por aqui.
              </p>
            </div>
          )}
          {selectedOption === "TAKEAWAY" && (
            <div className="rounded-lg bg-secondary p-4 text-center">
              <h3 className="font-semibold">Opções de Retirada e Entrega</h3>
              <p className="text-sm text-muted-foreground">
                Você pode retirar seu pedido no balcão ou optar pela entrega.
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedOption && (
        <div className="sticky bottom-0 mt-auto bg-background p-5 shadow-t-md">
          <Button className="w-full" asChild>
            <Link href={`/${slug}/menu?orderType=${selectedOption}`}>
              Ir para o Cardápio
            </Link>
          </Button>
        </div>
      )}
    </>
); };

export default OrderTypeSelector;