import { OrderType } from "@prisma/client/edge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface OrderTypeOptionProps {
  option: OrderType;
  buttonText: string;
  note: string;
  icon: string;
  isSelected: boolean;
  onClick: () => void;
}

const OrderTypeOption = ({
  buttonText,
  note,
  icon,
  isSelected,
  onClick,
}: OrderTypeOptionProps) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer transform transition-all duration-300",
        isSelected
          ? "border-2 border-primary ring-2 ring-primary/20"
          : "border-border",
        "hover:scale-105"
      )}
    >
      <CardContent className="flex flex-col items-center gap-2 p-6 text-center">
        <span className="text-4xl">{icon}</span>
        <h3 className="font-bold">{buttonText}</h3>
        <p className="text-xs text-muted-foreground">{note}</p>
      </CardContent>
    </Card>
); };

export default OrderTypeOption;