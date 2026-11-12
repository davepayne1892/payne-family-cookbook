import { RecipeList } from "@/components/recipe-list";
import { ShoppingListGenerator } from "@/components/shopping-list/shopping-list-generator";
import { getFoodRecipes } from "@/lib/recipes";

export default function Home() {
  const foodRecipes = getFoodRecipes();
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-headline text-primary">
          Payne Family Cookbook
        </h1>
        <p className="text-lg text-muted-foreground">
          A collection of our favorite family meals and recipes.
        </p>
      </div>

      <div className="flex justify-center">
        <ShoppingListGenerator allRecipes={foodRecipes} />
      </div>

      <RecipeList allRecipes={foodRecipes} />
    </div>
  );
}
