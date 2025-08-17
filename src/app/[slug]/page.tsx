"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import { OrderType, Restaurant } from "@prisma/client";
import useSWR from "swr";
import Image from "next/image";
import OrderTypeOption from "./components/order-type-option";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const RestaurantPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedOption, setSelectedOption] = useState<OrderType | null>(null);

  const { data: restaurant, isLoading } = useSWR<Restaurant>(
    `/api/restaurants/${slug}`,
    fetcher
  );

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
  ); }

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="relative flex h-full flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={restaurant.bannerUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <p className="text-sm opacity-80">{restaurant.description}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-center text-lg font-semibold">
          Como você quer seu pedido?
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <OrderTypeOption
            option="DINEIN"
            buttonText="Consumir no Local"
            note="Reserve uma mesa"
            icon="🍽️"
            isSelected={selectedOption === "DINEIN"}
            onClick={() => setSelectedOption("DINEIN")}
          />
          <OrderTypeOption
            option="TAKEAWAY"
            buttonText="Para Viagem"
            note="Retire ou receba em casa"
            icon="🚀"
            isSelected={selectedOption === "TAKEAWAY"}
            onClick={() => setSelectedOption("TAKEAWAY")}
          />
        </div>

        <div className="mt-6 flex-1">
          {selectedOption === "DINEIN" && (
            <div className="rounded-lg bg-secondary p-4">
              <h3 className="font-semibold">Reserva de Mesa (Em breve)</h3>
            </div>
          )}
          {selectedOption === "TAKEAWAY" && (
            <div className="rounded-lg bg-secondary p-4">
              <h3 className="font-semibold">Opções de Entrega (Em breve)</h3>
            </div>
          )}
        </div>
      </div>

      {selectedOption && (
        <div className="sticky bottom-0 bg-white p-5 shadow-md">
          <Button className="w-full" asChild>
            <Link href={`/${slug}/menu?orderType=${selectedOption}`}>
              Ir para o Cardápio
            </Link>
          </Button>
        </div>
      )}
    </div>
); };

export default RestaurantPage;