"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

export const HeroCarousel = () => {
  const images = [
    { src: "/banner-mcdonalds.jpg", alt: "Delicious Burgers" },
    { src: "/banner-mcdonalds.jpg", alt: "Fresh Pizza" },
    { src: "/banner-mcdonalds.jpg", alt: "Healthy Salads" },
  ];

  return (
    <Carousel
      className="w-full"
      plugins={[Autoplay({ delay: 4000 })]}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative h-48 w-full md:h-64">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="rounded-lg object-cover"
              />
              <div className="absolute inset-0 rounded-lg bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                <h2 className="text-2xl font-bold md:text-4xl">
                  Discover the Best Restaurants Near You
                </h2>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
) }