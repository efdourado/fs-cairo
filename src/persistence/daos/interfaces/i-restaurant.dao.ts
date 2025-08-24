import { Prisma, Restaurant } from "@prisma/client";

export type RestaurantWithDetails = Prisma.RestaurantGetPayload<{
  include: {
    categories: {
      include: {
        subCategories: {
          include: {
            products: true;
} } }; }; }; }>;

export interface IRestaurantDAO {
  findMany(): Promise<Restaurant[]>;
  findUniqueBySlug(slug: string): Promise<Restaurant | null>;
  findUniqueWithCategories(slug: string): Promise<RestaurantWithDetails | null>;
}