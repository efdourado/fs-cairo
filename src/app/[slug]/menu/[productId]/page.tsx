import { notFound } from "next/navigation";
import { AppProductController } from "@/controllers";
import ProductDetails from "./components/product-details";
import Image from "next/image";

interface ProductPageProps {
  params: Promise<{
    slug: string;
    productId: string;
}>; }

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params;

  const { product } = await AppProductController.getProductById(productId);

  if (!product || product.restaurant.slug.toLowerCase() !== slug.toLowerCase()) {
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