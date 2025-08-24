const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();

const main = async () => {
  console.log("Start seeding...");
  await prismaClient.restaurant.deleteMany({});
  await prismaClient.category.deleteMany({});
  await prismaClient.subCategory.deleteMany({});
  await prismaClient.product.deleteMany({});

  const darelsalam = await prismaClient.restaurant.create({
    data: {
      name: "Dar El Salam",
      slug: "darelsalam",
      description: "Oferecemos SANDUÍCHES frescos e saborosos, feitos com ingredientes de qualidade. Um lugar acolhedor para aproveitar refeições rápidas e combinações exclusivas que agradam todos os gostos",
      logoUrl: "/memphis-logo-grey.png",
      bannerUrl: "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
      deliveryFee: 5.99,
      deliveryTimeMinutes: 30,
      rating: 4.8,
  }, });

  const lanchesCategory = await prismaClient.category.create({
    data: { name: "Lanches", restaurantId: darelsalam.id },
  });

  const darelsalamClassicosSubCategory = await prismaClient.subCategory.create({
      data: { name: "Clássicos", categoryId: lanchesCategory.id }
  });
  const darelsalamEspeciaisSubCategory = await prismaClient.subCategory.create({
      data: { name: "Especiais", categoryId: lanchesCategory.id }
  });
  const darelsalamDocesSubCategory = await prismaClient.subCategory.create({
      data: { name: "Doces", categoryId: lanchesCategory.id }
  });

  await prismaClient.product.create({
    data: {
      name: "Cheddar Bacon",
      description: "Um clássico irresistível: suculento hambúrguer com cheddar derretido e bacon crocante, perfeito para quem ama sabor intenso",
      price: 29.9,
      discountPercentage: 15,
      imageUrl: "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
      restaurantId: darelsalam.id,
      subCategoryId: darelsalamClassicosSubCategory.id,
      ingredients: ["Pão Brioche", "Hambúrguer 150g", "Queijo Cheddar", "Bacon", "Alface", "Tomate", "Maionese Especial"],
  }, });
  await prismaClient.product.create({
    data: {
      name: "Mediterrâneo",
      description: "Uma explosão de sabores frescos e sofisticados: frango grelhado, queijo feta e molho especial em um pão ciabatta leve e crocante",
      price: 34.90,
      discountPercentage: 10,
      imageUrl: "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
      restaurantId: darelsalam.id,
      subCategoryId: darelsalamEspeciaisSubCategory.id,
      ingredients: ["Pão Ciabatta", "Frango Grelhado", "Queijo Feta", "Rúcula", "Tomate Seco", "Molho de Iogurte com Ervas"],
  }, });
  await prismaClient.product.create({
    data: {
      name: "Brownie com Sorvete",
      description: "Delicioso brownie de chocolate servido com uma bola de sorvete de baunilha e calda de chocolate",
      price: 19.9,
      discountPercentage: 5,
      imageUrl: "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
      restaurantId: darelsalam.id,
      subCategoryId: darelsalamDocesSubCategory.id,
      ingredients: ["Brownie de chocolate", "Sorvete de Baunilha", "Calda de Chocolate"],
  }, });



  const shubra = await prismaClient.restaurant.create({
    data: {
      name: "Shubra",
      slug: "shubra",
      description: "Delicie-se com nossos DONUTS irresistíveis, feitos para alegrar seu dia! Temos sabores para todos os gostos e momentos!",
      logoUrl: "/memphis-logo-grey.png",
      bannerUrl: "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
      deliveryFee: 4.5,
      deliveryTimeMinutes: 25,
      rating: 4.9,
  }, });

  const docesCategory = await prismaClient.category.create({
    data: { name: "Doces", restaurantId: shubra.id },
  });

  const shubraClassicosSubCategory = await prismaClient.subCategory.create({
      data: { name: "Clássicos", categoryId: docesCategory.id }
  });
  const shubraRecheadosSubCategory = await prismaClient.subCategory.create({
      data: { name: "Recheados", categoryId: docesCategory.id }
  });

  await prismaClient.product.create({
    data: {
      name: "Glazed Original",
      description: "Simples, fofinho e delicioso",
      price: 12.9,
      discountPercentage: 10,
      imageUrl: "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
      restaurantId: shubra.id,
      subCategoryId: shubraClassicosSubCategory.id,
      ingredients: ["Farinha", "Açúcar", "Fermento"],
  }, });
  await prismaClient.product.create({
    data: {
      name: "Doce de Leite Cremoso",
      description: "Donut recheado com doce de leite cremoso, irresistível a cada mordida",
      price: 16.5,
      discountPercentage: 0,
      imageUrl: "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
      restaurantId: shubra.id,
      subCategoryId: shubraRecheadosSubCategory.id,
      ingredients: ["Farinha", "Ovos", "Manteiga", "Doce de Leite", "Açúcar"],
  }, });
  await prismaClient.product.create({
    data: {
      name: "Chocolate Belga",
      description: "Donut recheado com ganache de chocolate belga, para um sabor sofisticado e intenso",
      price: 18.90,
      discountPercentage: 6,
      imageUrl: "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
      restaurantId: shubra.id,
      subCategoryId: shubraRecheadosSubCategory.id,
      ingredients: ["Farinha", "Ovos", "Manteiga", "Chocolate Belga", "Creme de Chocolate"],
  }, });



  const imbaba = await prismaClient.restaurant.create({
    data: {
      name: "Imbaba",
      slug: "imbaba",
      description: "Refeições completas, saborosas e nutritivas, preparadas para o dia a dia corrido. Marmitex com variedade de pratos e acompanhamentos para todos os gostos",
      logoUrl: "/memphis-logo-grey.png",
      bannerUrl: "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
      deliveryFee: 8,
      deliveryTimeMinutes: 8,
      rating: 5,
  }, });

  const pratofeitoCategory = await prismaClient.category.create({
    data: { name: "Prato Feito", restaurantId: imbaba.id },
  });

  const imbabaCarnesSubCategory = await prismaClient.subCategory.create({
      data: { name: "Carnes", categoryId: pratofeitoCategory.id }
  });
  const imbabaVegetarianosSubCategory = await prismaClient.subCategory.create({
      data: { name: "Vegetarianos", categoryId: pratofeitoCategory.id }
  });
  const imbabaCombinadosSubCategory = await prismaClient.subCategory.create({
      data: { name: "Combinados", categoryId: pratofeitoCategory.id }
  });
  const imbabaEspeciaisSubCategory = await prismaClient.subCategory.create({
      data: { name: "Especiais do Dia", categoryId: pratofeitoCategory.id }
  });

  await prismaClient.product.create({
    data: {
      name: "Frango Grelhado com Arroz e Salada",
      description: "Frango suculento grelhado, servido com arroz soltinho, salada fresca e molho especial",
      price: 22.90,
      discountPercentage: 10,
      imageUrl: "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
      restaurantId: imbaba.id,
      subCategoryId: imbabaCarnesSubCategory.id,
      ingredients: ["Frango Grelhado", "Arroz", "Salada", "Molho Especial"],
  }, });
  await prismaClient.product.create({
    data: {
      name: "Bife Acebolado com Batata Frita",
      description: "Bife macio acebolado, acompanhado de batatas fritas crocantes e arroz branco",
      price: 25.90,
      discountPercentage: 5,
      imageUrl: "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
      restaurantId: imbaba.id,
      subCategoryId: imbabaCarnesSubCategory.id,
      ingredients: ["Bife", "Cebola", "Batata Frita", "Arroz"],
  }, });
  await prismaClient.product.create({
    data: {
      name: "Strogonoff de Palmito",
      description: "Clássico strogonoff feito com palmito, acompanhado de arroz e batata palha crocante",
      price: 21.90,
      discountPercentage: 0,
      imageUrl: "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
      restaurantId: imbaba.id,
      subCategoryId: imbabaVegetarianosSubCategory.id,
      ingredients: ["Palmito", "Creme de Leite", "Arroz", "Batata Palha"],
  }, });
  await prismaClient.product.create({
    data: {
      name: "Legumes ao Curry com Arroz Integral",
      description: "Deliciosos legumes salteados com tempero curry, servidos com arroz integral saudável e saboroso",
      price: 23.90,
      discountPercentage: 0,
      imageUrl: "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
      restaurantId: imbaba.id,
      subCategoryId: imbabaVegetarianosSubCategory.id,
      ingredients: ["Abobrinha", "Cenoura", "Ervilhas", "Arroz Integral", "Curry"],
  }, });
  await prismaClient.product.create({
    data: {
      name: "Frango + Carne + Arroz e Salada",
      description: "O melhor dos dois mundos: frango grelhado, carne suculenta, arroz soltinho e salada fresca",
      price: 29.90,
      discountPercentage: 10,
      imageUrl: "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
      restaurantId: imbaba.id,
      subCategoryId: imbabaCombinadosSubCategory.id,
      ingredients: ["Frango Grelhado", "Carne Bovina", "Arroz", "Salada"],
  }, });
  await prismaClient.product.create({
    data: {
      name: "Feijoada Completa",
      description: "Nossa feijoada especial, servida com arroz branco, farofa, couve e laranja.",
      price: 32.90,
      discountPercentage: 0,
      imageUrl: "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
      restaurantId: imbaba.id,
      subCategoryId: imbabaEspeciaisSubCategory.id,
      ingredients: ["Feijão Preto", "Carne Suína", "Arroz", "Farofa", "Couve", "Laranja"],
  }, });



  const mohandessin = await prismaClient.restaurant.create({
    data: {
      name: "Mohandessin",
      slug: "mohandessin",
      description: "Bem-vindo à nossa cafeteria. Selecionamos os melhores grãos, preparamos com cuidado e oferecemos sabores que aquecem o corpo e a alma. Do espresso clássico às bebidas especiais, temos algo para todos os amantes de café",
      logoUrl: "/memphis-logo-grey.png",
      bannerUrl: "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
      deliveryFee: 48,
      deliveryTimeMinutes: 88,
      rating: 2,
  }, });

  const cafesCategory = await prismaClient.category.create({
    data: { name: "Cafés", restaurantId: mohandessin.id },
  });

  const mohandessinEspressoSubCategory = await prismaClient.subCategory.create({
      data: { name: "Espresso & Clássicos", categoryId: cafesCategory.id }
  });
  const mohandessinEspeciaisSubCategory = await prismaClient.subCategory.create({
      data: { name: "Cafés Especiais", categoryId: cafesCategory.id }
  });

  await prismaClient.product.create({
    data: {
      name: "Espresso Tradicional",
      description: "Café intenso e encorpado, preparado com grãos selecionados, servido na medida perfeita",
      price: 9.90,
      discountPercentage: 0,
      imageUrl: "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
      restaurantId: mohandessin.id,
      subCategoryId: mohandessinEspressoSubCategory.id,
      ingredients: ["Café", "Água"],
  }, });
  await prismaClient.product.create({
    data: {
      name: "Cappuccino Clássico",
      description: "Espresso com leite vaporizado e espuma cremosa, polvilhado com cacau em pó",
      price: 14.90,
      discountPercentage: 0,
      imageUrl: "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
      restaurantId: mohandessin.id,
      subCategoryId: mohandessinEspressoSubCategory.id,
      ingredients: ["Café Espresso", "Leite Vaporizado", "Cacau em Pó"],
  }, });
  await prismaClient.product.create({
    data: {
      name: "Mocha Chocolate",
      description: "Uma deliciosa mistura de espresso e chocolate, finalizada com chantilly cremoso",
      price: 17.90,
      discountPercentage: 5,
      imageUrl: "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
      restaurantId: mohandessin.id,
      subCategoryId: mohandessinEspeciaisSubCategory.id,
      ingredients: ["Café Espresso", "Leite", "Chocolate", "Chantilly"],
  }, });
  await prismaClient.product.create({
    data: {
      name: "Latte Caramelo",
      description: "Espresso suave com leite vaporizado e um toque de caramelo, perfeito para adoçar o dia",
      price: 16.90,
      discountPercentage: 5,
      imageUrl: "https://od.lk/s/OThfNDE4NDU0MzJf/fb.jpg",
      restaurantId: mohandessin.id,
      subCategoryId: mohandessinEspeciaisSubCategory.id,
      ingredients: ["Café Espresso", "Leite Vaporizado", "Caramelo"],
  }, });

  console.log("Seeding finished.");
};

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });