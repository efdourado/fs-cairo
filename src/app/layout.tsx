import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";
import { CartProvider } from "./[slug]/menu/contexts/cart";
import Footer from "@/components/footer";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cairo Eats",
  description: "Taste the Difference",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-muted antialiased`}>
        <CartProvider>
          <div className="flex h-full flex-col">
            <Header />
            <main className="flex-1 overflow-y-auto bg-background pb-20 shadow-lg">
              {children}
            </main>
            <Footer />
            <Toaster />
          </div>
        </CartProvider>
      </body>
    </html>
); }