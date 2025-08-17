import { notFound } from "next/navigation";
import ProductDetails from "./components/productDetails";
import { ProductController } from "@/controllers/product.controller";
import Image from "next/image";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const productController = new ProductController();

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params;

  const { success, product } = await productController.getProductById(productId);

  if (!success || !product) {
    return notFound();
  }

  if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
    return notFound();
  }

  return (
    <div className="flex h-full flex-col">
      <div className="relative min-h-[300px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <ProductDetails product={product} />
    </div>
); };

export default ProductPage;