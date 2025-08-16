import Image from "next/image";
import Link from "next/link";

interface PromoBannerProps {
  src: string;
  alt: string;
  href: string;
}

export const PromoBanner = ({ src, alt, href }: PromoBannerProps) => {
  return (
    <Link href={href} className="block px-5">
      <div className="relative h-32 w-full overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={100}
        />
      </div>
    </Link>
); };