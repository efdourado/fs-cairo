"use client";

import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";

interface OrderListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: {
            name: true;
            logoUrl: true;
        }; };
        orderProducts: {
          include: {
            product: true;
}; }; }; }> >; }

const getStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "READY": return "Ready";
    case "PREPARING": return "Preparing";
    case "PENDING": return "Pending";
    case "PAYMENT_CONFIRMED": return "Payment Confirmed";
    case "PAYMENT_FAILED": return "Payment Failed";
    default: return "";
} };

const getStatusClass = (status: OrderStatus) => {
    switch (status) {
      case "PAYMENT_CONFIRMED":
      case "READY":
        return "bg-green-500 text-white";
      case "PAYMENT_FAILED":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-200 text-gray-500";
    }
};

const OrderList = ({ orders }: OrderListProps) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const slug = pathname.split("/")[1];
  const orderType = searchParams.get("orderType");
  const handleBackClick = () => {
    if (orderType) {
      router.push(`/${slug}/menu?orderType=${orderType}`);
    } else {
      router.back();
  } };
  
  return (
    <div className="space-y-6 p-6">
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">My Order</h2>
      </div>
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="space-y-4 p-5">
            <div
              className={`w-fit rounded-full px-2 py-1 text-xs font-semibold ${getStatusClass(order.status)}`}
            >
              {getStatusLabel(order.status)}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5">
                <Image
                  src={order.restaurant.logoUrl}
                  alt={order.restaurant.name}
                  className="rounded-sm"
                  fill
                />
              </div>
              <p className="text-sm font-semibold">{order.restaurant.name}</p>
            </div>
            <Separator />
            <div className="space-y-2">
              {order.orderProducts.map((orderProduct) => (
                <div key={orderProduct.id} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                    {orderProduct.quantity}
                  </div>
                  <p className="text-sm">{orderProduct.product.name}</p>
                </div>
              ))}
            </div>
            <Separator />
            <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
); };

export default OrderList;