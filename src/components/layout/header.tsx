"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChefHat, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/submit", label: "Submit Recipe", icon: PlusCircle },
  ];

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-primary rounded-lg text-primary-foreground group-hover:bg-primary/90 transition-colors">
              <ChefHat className="h-6 w-6" />
            </div>
            <span className="text-xl font-headline font-semibold">
              Family Cookbook
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            {navLinks.map((link) => (
              <Button asChild key={link.href} variant={pathname === link.href ? "secondary" : "ghost"} size="sm">
                <Link href={link.href}>
                  <link.icon className="h-4 w-4 mr-2" />
                  {link.label}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
