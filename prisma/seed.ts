const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

const PRODUCT_IMAGES = [
  "/memphis-logo-grey.png",
];

const BANNER_IMAGES = [
  "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
];

const LOGO_IMAGES = [
  "/memphis-logo-grey.png",
];

const TOTAL_RESTAURANTS = 3;
const CATEGORIES_PER_RESTAURANT = 8;
const SUBCATEGORIES_PER_CATEGORY = 6;
const PRODUCTS_PER_SUBCATEGORY = 5;

const main = async () => {
  console.log("\n\nIniciando...");

  await prismaClient.orderProduct.deleteMany({});
  await prismaClient.order.deleteMany({});
  await prismaClient.product.deleteMany({});
  await prismaClient.subCategory.deleteMany({});
  await prismaClient.category.deleteMany({});
  await prismaClient.restaurant.deleteMany({});
  
  console.log("BD limpo.\n");

  let globalProductCounter = 0;

  for (let i = 1; i <= TOTAL_RESTAURANTS; i++) {
    const bannerIndex = (i - 1) % BANNER_IMAGES.length;
    const logoIndex = (i - 1) % LOGO_IMAGES.length;

    const restaurant = await prismaClient.restaurant.create({
      data: {
        name: `Restaurante Exemplar ${i}`,
        slug: `restaurante-exemplar-${i}`,
        description: `Restaurante focado em testes de visual. Ambiente ${i}, com pratos variados.`,
        logoUrl: LOGO_IMAGES[logoIndex],
        bannerUrl: BANNER_IMAGES[bannerIndex],
        deliveryFee: i * 1.5,
        deliveryTimeMinutes: 30 + i,
        rating: 4.5,
    }, });

    console.log(`Restaurante Criado: ${restaurant.name}`);

    for (let j = 1; j <= CATEGORIES_PER_RESTAURANT; j++) {
      const category = await prismaClient.category.create({
        data: {
          name: `Categoria ${j}`,
          restaurantId: restaurant.id,
      }, });

      for (let k = 1; k <= SUBCATEGORIES_PER_CATEGORY; k++) {
        const subCategory = await prismaClient.subCategory.create({
          data: {
            name: `Subcategoria ${k}`,
            categoryId: category.id,
        }, });

        const productsData = [];

        for (let l = 1; l <= PRODUCTS_PER_SUBCATEGORY; l++) {
          const imageIndex = globalProductCounter % PRODUCT_IMAGES.length;
          globalProductCounter++;

          const basePrice = 20 + l * 2;
          
          productsData.push({
            name: `Produto ${l} (C${j}-S${k})`,
            description: `Descrição detalhada para o produto ${l}. Feito com ingredientes selecionados e imagem manual ${imageIndex + 1}.`,
            price: basePrice,
            imageUrl: PRODUCT_IMAGES[imageIndex],
            restaurantId: restaurant.id,
            subCategoryId: subCategory.id,
            discountPercentage: l % 2 === 0 ? 10 : 0,
            ingredients: [
              `Ingrediente Principal`,
              `Acompanhamento ${l}`,
              `Molho Especial`,
        ], }); }

        await prismaClient.product.createMany({
          data: productsData,
  }); } } }

  console.log("\nFim!");
  console.log(`Total (Produtos Gerados): ${globalProductCounter}`);
};

main()
  .catch((e) => {
    console.error("Erro:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });