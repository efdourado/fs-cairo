// const { PrismaClient } = require("@prisma/client");
// const prismaClient = new PrismaClient();

// const main = async () => {
//   const restaurantSlug = "darelsalam";
//   const existingRestaurant = await prismaClient.restaurant.findUnique({
//     where: { slug: restaurantSlug },
//   });

//   if (existingRestaurant) {
//     await prismaClient.restaurant.delete({ where: { slug: restaurantSlug } });
//     console.log(`Deleted existing restaurant: ${existingRestaurant.name}`);
//   }

//   const restaurant = await prismaClient.restaurant.create({
//     data: {
//       name: "Dar El Salam",
//       slug: restaurantSlug,
//       description: "Taste the Difference",
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

//   // New Generalized Categories
//   await createCategoryAndProducts("Promotions", [
//     {
//       name: "4 pc. Chicken McNugget® Happy Meal®",
//       description:
//         "Pieces of chicken, covered in crispy bread crumbs, and a drink will serve as a great meal for the youngest visitors of McDonald's!",
//       ingredients: [
//         "Chicken McNuggets (4 pc);",
//         "A toy or a book of your choice;",
//         "Small fries / Cucumber Sticks / Melon fruit bag;",
//         "A drink of your choice.",
//       ],
//       price: 28.4,
//       imageUrl:
//         "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202103_7002_4McNuggetsHappyMeal_AppleSlices_WhiteMilkJug_Left_2000x2000.png.coredownload.png",
//     },
//     {
//       name: "Big Breakfast® with Hotcakes",
//       description:
//         "McDonald's Big Breakfast® with Hotcakes satisfies with both sweet and savory breakfast favorites.",
//       ingredients: ["Hotcakes;", "Scrambled Eggs;", "Biscuit;"],
//       price: 43.8,
//       imageUrl:
//         "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202208_3590_BigBreakfast_HotCakes_2000x2000.png.coredownload.png",
//     },
//   ]);

//   await createCategoryAndProducts("Main Courses", [
//     {
//       name: "Hotcakes",
//       description:
//         "If you love hot pancakes, you've got to try McDonald's Hotcakes with a side of real butter and sweet maple flavored Hotcake syrup.",
//       ingredients: ["3 Hotcakes;", "Hotcake Syrup;", "Salted Whipped Butter."],
//       price: 6.5,
//       imageUrl:
//         "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202208_0031_3HotCakes_2000x2000.png.coredownload.png",
//     },
//     {
//       name: "Big Mac",
//       description:
//         "This double layered burger is a McDonald's classic! Two perfectly fried patties with a special sauce.",
//       ingredients: ["Sesame bun;", "Beef patties (2 pc);", "Iceberg lettuce;"],
//       price: 18.9,
//       imageUrl:
//         "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202302_0005-999_BigMac_2000x2000.png.coredownload.png",
//     },
//     {
//       name: "Filet-O-Fish®",
//       description:
//         "A delicious burger with fried white fish fillet and a lot of piquant sauce.",
//       ingredients: ["Fish Fillet patty;", "Bun;", "Cheddar cheese;"],
//       price: 16.9,
//       imageUrl:
//         "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202302_5926-999_Filet-O-Fish_HalfSlice_2000x2000.png.coredownload.png",
//     },
//   ]);

//   await createCategoryAndProducts("Sides", [
//     {
//       name: "Fries",
//       description: "Thin deep-fried potato stripes.",
//       ingredients: [],
//       price: 2.9,
//       imageUrl:
//         "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/8932_MediumFries.uuid.png.coredownload.png",
//     },
//     {
//       name: "Apple Slices",
//       description: "A wholesome, tasty side made from real apples.",
//       ingredients: [],
//       price: 1.5,
//       imageUrl:
//         "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202002_2794_AppleSlices_NoBag_2000x2000.png.coredownload.png",
//     },
//   ]);

//   await createCategoryAndProducts("Desserts", [
//     {
//       name: "Chocolate Cookies",
//       description: "A soft and chewy Chocolate Cookie.",
//       ingredients: [],
//       price: 1.6,
//       imageUrl:
//         "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202004_1852_ChocolateChipCookie_Broken_2000x2000.png.coredownload.png",
//     },
//     {
//       name: "OREO® McFlurry®",
//       description:
//         "Creamy vanilla soft serve with crunchy pieces of OREO® cookies!",
//       ingredients: [],
//       price: 12.8,
//       imageUrl:
//         "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/3832_OreoMcFlurry.uuid%20(1).png.coredownload.png",
//     },
//   ]);

//   await createCategoryAndProducts("Beverages", [
//     {
//       name: "Coke®",
//       description: "The original, refreshing ice-cold cola.",
//       ingredients: [],
//       price: 6.9,
//       imageUrl:
//         "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202112_0521_MediumCoke_Glass_2000x2000.png.coredownload.png",
//     },
//     {
//       name: "Chocolate Shake",
//       description:
//         "Our chocolate shake features delicious soft serve and chocolate syrup.",
//       ingredients: ["Vanilla Ice Cream;", "Chocolate Syrup;", "Whipped Cream."],
//       price: 9.9,
//       imageUrl:
//         "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/1509_MediumChocolateShake_Glass_A1.uuid.png.coredownload.png",
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
//     console.log("Main seed completed successfully!");
//   });