import { RecipeList } from "@/components/recipe-list";
import { getAllRecipes } from "@/lib/recipes";

export default function Home() {
  const allRecipes = getAllRecipes();
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-headline text-primary">
          Payne Family Cookbook
        </h1>
        <p className="text-lg text-muted-foreground">
          A collection of our favorite family recipes.
        </p>
      </div>
      <RecipeList allRecipes={allRecipes} />
    </div>
  );
}
