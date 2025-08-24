"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Product, Restaurant } from "@prisma/client";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

interface HeroCarouselProps {
  promotionalProducts: (Product & { restaurant: Restaurant })[];
}

export const HeroCarousel = ({ promotionalProducts }: HeroCarouselProps) => {
  return (
    <Carousel
      className="w-full px-5"
      plugins={[Autoplay({ delay: 5000 })]}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {promotionalProducts.map((product) => (
          <CarouselItem key={product.id}>
            <Link href={`/${product.restaurant.slug}/menu/${product.id}`}>
              <div className="relative h-40 w-full md:h-56">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="rounded-lg object-cover"
                />
                <div className="absolute inset-0 rounded-lg bg-black/50" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-sm">
                    em <span className="font-semibold">{product.restaurant.name}</span>
                  </p>
                </div>
                <div className="absolute right-2 top-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                  {product.discountPercentage}% OFF
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
); };