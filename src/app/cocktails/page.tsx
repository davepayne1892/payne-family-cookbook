import { RecipeList } from "@/components/recipe-list";
import { ShoppingListGenerator } from "@/components/shopping-list/shopping-list-generator";
import { getCocktailRecipes } from "@/lib/recipes";
import { Martini } from "lucide-react";

export const metadata = {
  title: "Cocktail Bar | Payne Family Cookbook",
  description: "Handcrafted cocktails, seasonal sips, and classic drink recipes.",
};

export default function CocktailsPage() {
  const cocktailRecipes = getCocktailRecipes();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mb-1">
          <Martini className="h-8 w-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-headline text-primary">
          The Cocktail Bar
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Craft cocktails, seasonal sips, and bar classics for entertaining and unwinding.
        </p>
      </div>

      <div className="flex justify-center">
        <ShoppingListGenerator allRecipes={cocktailRecipes} />
      </div>

      <RecipeList allRecipes={cocktailRecipes} />
    </div>
  );
}
