import { db } from "@/lib/prisma";
import { Restaurant } from "@prisma/client";
import { IRestaurantDAO, RestaurantWithDetails } from "../interfaces/i-restaurant.dao";

export class RestaurantDAO implements IRestaurantDAO {
  async findMany(): Promise<Restaurant[]> {
    return db.restaurant.findMany({});
  }

  async findUniqueBySlug(slug: string): Promise<Restaurant | null> {
    return db.restaurant.findUnique({
      where: { slug },
  }); }

  async findUniqueWithCategories(slug: string): Promise<RestaurantWithDetails | null> {
    return db.restaurant.findUnique({
      where: { slug },
      include: {
        categories: {
          include: {
            subCategories: {
              include: {
                products: true,
}, }, }, }, }, }); } }