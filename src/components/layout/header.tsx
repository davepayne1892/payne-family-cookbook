"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChefHat, Utensils, Martini } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  const isMealsActive = pathname === "/" || (pathname.startsWith("/recipes/") && !pathname.includes("cocktail"));
  const isCocktailsActive = pathname.startsWith("/cocktails");

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-primary rounded-lg text-primary-foreground group-hover:bg-primary/90 transition-colors">
              <ChefHat className="h-6 w-6" />
            </div>
            <span className="text-xl font-headline font-semibold">
              Payne Family Cookbook
            </span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                isMealsActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Utensils className="h-4 w-4" />
              <span>Meals</span>
            </Link>
            <Link
              href="/cocktails"
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                isCocktailsActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Martini className="h-4 w-4" />
              <span>Cocktails</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
