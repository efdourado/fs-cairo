"use client";

import { useState } from "react";
import Link from "next/link";
import { OrderType } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Utensils, Package, CheckIcon, ArrowRightIcon } from "lucide-react";
import OrderTypeOption from "./order-type-option";

interface OrderTypeSelectorProps {
  slug: string;
}

const OrderTypeSelector = ({ slug }: OrderTypeSelectorProps) => {
  const [selectedOption, setSelectedOption] = useState<OrderType | null>(null);
  const handleSelect = (option: OrderType) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-8 gap-8 max-w-4xl mx-auto w-full">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Como deseja receber sua refeição?
        </h2>
      </div>

      <div className="grid grid-cols-1 w-full gap-6 sm:grid-cols-2">
        <OrderTypeOption
          option="DINEIN"
          buttonText="Comer no Local"
          note="Serviço de mesa e ambiente climatizado"
          Icon={Utensils}
          isSelected={selectedOption === "DINEIN"}
          onSelect={handleSelect}
        />
        <OrderTypeOption
          option="TAKEAWAY"
          buttonText="Para Viagem"
          note="Embalagem segura para levar onde quiser"
          Icon={Package}
          isSelected={selectedOption === "TAKEAWAY"}
          onSelect={handleSelect}
        />
      </div>

      <div 
        className={`fixed bottom-16 left-0 right-0 w-full bg-background border-t border-border p-4 transition-transform duration-300 z-50 ${
          selectedOption ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <Button className="w-full h-12 text-md font-bold shadow-lg group rounded-full" asChild>
          <Link href={`/${slug}/menu?orderType=${selectedOption}`}>
            Começar meu Pedido
            <ArrowRightIcon className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
); };

export default OrderTypeSelector;