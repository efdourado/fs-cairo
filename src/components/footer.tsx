"use client";

import { LayoutList, HeartIcon, HomeIcon, ScrollTextIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Footer = () => {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { href: "/", label: "Início", icon: HomeIcon },
    { href: "/favourites", label: "Salvos", icon: HeartIcon },
    { href: "/mcdonaldsmodel/orders", label: "Pedidos", icon: ScrollTextIcon, badge: 2 },
    { href: "/profile", label: "Perfil", icon: UserIcon },
  ];

  return (
    <footer className="fixed bottom-0 z-50 w-full border-t border-border/50 bg-background shadow-t-md">
      <nav className="flex h-[65px] items-center justify-around">
        {NAV_ITEMS.map(({ href, label, icon: Icon, badge }) => {
          const isActive = pathname === href;

          return (
            <Link href={href} key={label} className="relative">
              <Button
                variant="ghost"
                className={cn(
                  "flex h-auto flex-col gap-1 rounded-lg p-2 transition-all duration-300 active:scale-95",
                  isActive ? "text-primary" : "text-footer-inactive"
                )}
              >
                <Icon
                  size={24}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={cn(
                    "transition-all",
                    isActive ? "scale-110" : "scale-100"
                  )}
                />
                <span className="text-xs font-semibold">{label}</span>
              </Button>

              {badge && (
                <span className="absolute -right-1 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                  {badge}
                </span>
              )}
            </Link>
        ); })}
      </nav>
    </footer>
); };

export default Footer;