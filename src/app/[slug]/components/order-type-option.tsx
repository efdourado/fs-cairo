"use client";

import { OrderType } from "@prisma/client";
import { LucideIcon, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface OrderTypeOptionProps {
  option: OrderType;
  buttonText: string;
  note: string;
  Icon: LucideIcon;
  isSelected: boolean;
  onSelect: (type: OrderType) => void;
}

const OrderTypeOption = ({
  option,
  buttonText,
  note,
  Icon,
  isSelected,
  onSelect,
}: OrderTypeOptionProps) => {
  return (
    <Card
      onClick={() => onSelect(option)}
      className={cn(
        "relative cursor-pointer transition-all duration-300 overflow-hidden",
        isSelected
          ? "border-2 border-primary bg-primary/5 shadow-lg scale-[1.02]"
          : "border-border hover:bg-muted/40 hover:border-primary/50",
      )}
    >
      {isSelected && (
        <div className="absolute right-3 top-3 text-primary animate-in fade-in zoom-in">
          <CheckCircle2 size={24} className="fill-primary/10" />
        </div>
      )}

      <CardContent className="flex flex-col items-center gap-4 p-4 text-center">
        <div 
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-full transition-colors duration-300",
            isSelected 
              ? "bg-primary text-white shadow-md" 
              : "bg-muted text-muted-foreground group-hover:bg-muted/80"
          )}
        >
          <Icon size={32} strokeWidth={1.5} />
        </div>
        
        <div className="space-y-1">
          <h3 className={cn(
            "text-xl font-bold transition-colors",
            isSelected ? "text-foreground" : "text-muted-foreground"
          )}>
            {buttonText}
          </h3>
          <p className="text-sm font-medium text-muted-foreground max-w-[200px] mx-auto leading-snug">
            {note}
          </p>
        </div>
      </CardContent>
    </Card>
); };

export default OrderTypeOption;