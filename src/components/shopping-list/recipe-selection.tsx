"use client";

import type { Recipe } from "@/lib/recipes";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

type RecipeSelectionProps = {
  allRecipes: Recipe[];
  selectedRecipes: Set<string>;
  onSelectionChange: (recipeId: string, isSelected: boolean) => void;
};

export function RecipeSelection({
  allRecipes,
  selectedRecipes,
  onSelectionChange,
}: RecipeSelectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-center">Select Recipes</h3>
      <ScrollArea className="h-72 w-full rounded-md border p-4">
        <div className="space-y-4">
          {allRecipes.map((recipe) => (
            <div key={recipe.id} className="flex items-center space-x-3">
              <Checkbox
                id={`recipe-${recipe.id}`}
                checked={selectedRecipes.has(recipe.id)}
                onCheckedChange={(checked) =>
                  onSelectionChange(recipe.id, !!checked)
                }
              />
              <Label
                htmlFor={`recipe-${recipe.id}`}
                className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {recipe.title}
              </Label>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
