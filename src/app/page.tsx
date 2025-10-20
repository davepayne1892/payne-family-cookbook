import { RecipeList } from "@/components/recipe-list";
import { recipes } from "@/lib/recipes";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-headline text-primary">
          Family Cookbook
        </h1>
        <p className="text-lg text-muted-foreground">
          A collection of our favorite family recipes.
        </p>
      </div>
      <RecipeList allRecipes={recipes} />
    </div>
  );
}
