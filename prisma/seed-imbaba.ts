// const { PrismaClient } = require("@prisma/client");
// const prismaClient = new PrismaClient();

// const main = async () => {
//   const restaurantSlug = "imbaba";
//   const existingRestaurant = await prismaClient.restaurant.findUnique({
//     where: { slug: restaurantSlug },
//   });

//   if (existingRestaurant) {
//     await prismaClient.restaurant.delete({ where: { slug: restaurantSlug } });
//     console.log(`Deleted existing restaurant: ${existingRestaurant.name}`);
//   }

//   const restaurant = await prismaClient.restaurant.create({
//     data: {
//       name: "Imbaba",
//       slug: restaurantSlug,
//       description: "Freshly baked donuts every day!",
//       logoUrl: "/memphis-logo-grey.png",
//       bannerUrl: "/fb.jpg",
//     },
//   });

//   const createCategoryAndProducts = async (
//     categoryName: string,
//     products: any[]
//   ) => {
//     if (products.length === 0) return;

//     const category = await prismaClient.category.create({
//       data: {
//         name: categoryName,
//         restaurantId: restaurant.id,
//       },
//     });

//     await prismaClient.product.createMany({
//       data: products.map((p) => ({
//         ...p,
//         categoryId: category.id,
//         restaurantId: restaurant.id,
//       })),
//     });
//     console.log(
//       `Created category "${categoryName}" with ${products.length} products.`
//     );
//   };

//   await createCategoryAndProducts("Promotions", [
//     {
//       name: "Dozen Deal",
//       description: "A dozen of our classic glazed donuts for a special price.",
//       ingredients: [],
//       price: 25.0,
//       imageUrl:
//         "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202103_7002_4McNuggetsHappyMeal_AppleSlices_WhiteMilkJug_Left_2000x2000.png.coredownload.png",
//     },
//   ]);

//   await createCategoryAndProducts("Desserts", [
//     {
//       name: "Glazed Donut",
//       description: "A classic, sweet, and fluffy glazed donut.",
//       ingredients: ["Flour", "Sugar", "Yeast", "Glaze"],
//       price: 2.5,
//       imageUrl:
//         "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202208_0031_3HotCakes_2000x2000.png.coredownload.png",
//     },
//     {
//       name: "Chocolate Frosted",
//       description: "A rich chocolate frosted donut with sprinkles.",
//       ingredients: ["Flour", "Sugar", "Cocoa", "Sprinkles"],
//       price: 3.0,
//       imageUrl:
//         "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202302_0005-999_BigMac_2000x2000.png.coredownload.png",
//     },
//     {
//       name: "Jelly Filled",
//       description: "A fluffy donut filled with sweet raspberry jelly.",
//       ingredients: ["Flour", "Sugar", "Raspberry Jelly"],
//       price: 3.5,
//       imageUrl:
//         "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202208_3590_BigBreakfast_HotCakes_2000x2000.png.coredownload.png",
//     },
//     {
//       name: "Boston Cream",
//       description:
//         "A delicious donut with a creamy custard filling and chocolate glaze.",
//       ingredients: ["Flour", "Sugar", "Custard", "Chocolate Glaze"],
//       price: 3.75,
//       imageUrl:
//         "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/8932_MediumFries.uuid.png.coredownload.png",
//     },
//   ]);

//   await createCategoryAndProducts("Beverages", [
//     {
//       name: "Coffee",
//       description: "A hot cup of freshly brewed coffee.",
//       ingredients: ["Coffee Beans", "Water"],
//       price: 2.0,
//       imageUrl:
//         "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202112_0521_MediumCoke_Glass_2000x2000.png.coredownload.png",
//     },
//     {
//       name: "Orange Juice",
//       description: "A refreshing glass of orange juice.",
//       ingredients: ["Oranges"],
//       price: 2.5,
//       imageUrl:
//         "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202212_0721_MediumSprite_Glass_2000x2000.png.coredownload.png",
//     },
//   ]);
// };

// main()
//   .catch((e) => {
//     console.error("Seed failed:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prismaClient.$disconnect();
//     console.log("Imbaba seed completed successfully!");
//   });