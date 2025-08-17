const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();

const main = async () => {
  const restaurantSlug = "shubra";
  const existingRestaurant = await prismaClient.restaurant.findUnique({
    where: { slug: restaurantSlug },
  });

  if (existingRestaurant) {
    await prismaClient.restaurant.delete({ where: { slug: restaurantSlug } });
    console.log(`Deleted existing restaurant: ${existingRestaurant.name}`);
  }

  const restaurant = await prismaClient.restaurant.create({
    data: {
      name: "Shubra",
      slug: restaurantSlug,
      description: "Authentic Middle Eastern Cuisine.",
      logoUrl: "/memphis-logo-grey.png",
      bannerUrl: "/fb.jpg",
    },
  });

  const createCategoryAndProducts = async (
    categoryName: string,
    products: any[]
  ) => {
    if (products.length === 0) return;

    const category = await prismaClient.category.create({
      data: {
        name: categoryName,
        restaurantId: restaurant.id,
      },
    });

    await prismaClient.product.createMany({
      data: products.map((p) => ({
        ...p,
        categoryId: category.id,
        restaurantId: restaurant.id,
      })),
    });
    console.log(
      `Created category "${categoryName}" with ${products.length} products.`
    );
  };

  await createCategoryAndProducts("Promotions", [
    {
      name: "Family Feast",
      description:
        "A complete meal for four, including mixed grill, hummus, tabbouleh, and fresh bread.",
      ingredients: [],
      price: 85.0,
      imageUrl:
        "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202103_7002_4McNuggetsHappyMeal_AppleSlices_WhiteMilkJug_Left_2000x2000.png.coredownload.png",
    },
  ]);

  await createCategoryAndProducts("Main Courses", [
    {
      name: "Chicken Shawarma Plate",
      description:
        "Marinated and slow-roasted chicken, served with garlic sauce, pickles, and fries.",
      ingredients: ["Chicken", "Garlic Sauce", "Pita Bread", "Pickles"],
      price: 22.5,
      imageUrl:
        "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202302_0005-999_BigMac_2000x2000.png.coredownload.png",
    },
    {
      name: "Lamb Kebab",
      description:
        "Tender cubes of grilled lamb, seasoned with a blend of traditional spices. Served with rice and grilled vegetables.",
      ingredients: ["Lamb", "Spices", "Rice", "Tomato", "Onion"],
      price: 28.0,
      imageUrl:
        "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202201_4308-005_DoubleQuarterPounderCheeseDeluxe_Shredded_2000x2000.png.coredownload.png",
    },
    {
      name: "Falafel Wrap",
      description:
        "Crispy falafel balls with tahini sauce, lettuce, and tomatoes, all wrapped in a warm pita.",
      ingredients: ["Chickpeas", "Tahini", "Lettuce", "Tomato", "Pita Bread"],
      price: 15.0,
      imageUrl:
        "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202302_5926-999_Filet-O-Fish_HalfSlice_2000x2000.png.coredownload.png",
    },
  ]);

  await createCategoryAndProducts("Sides", [
    {
      name: "Hummus with Pita",
      description: "A creamy blend of chickpeas, tahini, lemon, and garlic.",
      ingredients: [],
      price: 10.0,
      imageUrl:
        "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/8932_MediumFries.uuid.png.coredownload.png",
    },
    {
      name: "Tabbouleh Salad",
      description:
        "A refreshing mix of parsley, mint, bulgur, tomatoes, and lemon dressing.",
      ingredients: [],
      price: 12.0,
      imageUrl:
        "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202002_2794_AppleSlices_NoBag_2000x2000.png.coredownload.png",
    },
  ]);

  await createCategoryAndProducts("Desserts", [
    {
      name: "Baklava",
      description: "Sweet pastry made of layers of filo filled with chopped nuts and sweetened with syrup.",
      ingredients: [],
      price: 8.0,
      imageUrl:
        "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202004_1852_ChocolateChipCookie_Broken_2000x2000.png.coredownload.png",
    },
    {
      name: "Knafeh",
      description: "A traditional Middle Eastern dessert made with spun pastry, soaked in sweet syrup, and layered with cheese.",
      ingredients: [],
      price: 14.0,
      imageUrl:
        "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/3832_OreoMcFlurry.uuid%20(1).png.coredownload.png",
    },
  ]);

  await createCategoryAndProducts("Beverages", [
    {
      name: "Mint Lemonade",
      description: "A refreshing and tangy homemade lemonade with fresh mint.",
      ingredients: [],
      price: 7.0,
      imageUrl:
        "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202212_0721_MediumSprite_Glass_2000x2000.png.coredownload.png",
    },
    {
      name: "Turkish Coffee",
      description: "Strong, unfiltered coffee brewed in a traditional pot.",
      ingredients: [],
      price: 6.0,
      imageUrl:
        "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/newsroom/menu-items-2023/NR_202112_0521_MediumCoke_Glass_2000x2000.png.coredownload.png",
    },
  ]);
};

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
    console.log("Shubra seed completed successfully!");
  });