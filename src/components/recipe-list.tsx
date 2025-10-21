
"use client";

import { useState, useMemo } from "react";
import type { Recipe } from "@/lib/recipes";
import { Input } from "@/components/ui/input";
import { RecipeCard } from "@/components/recipe-card";
import { Search, SlidersHorizontal } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type RecipeListProps = {
  allRecipes: Recipe[];
};

export function RecipeList({ allRecipes }: RecipeListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrepTime, setMaxPrepTime] = useState(180);
  const [maxIngredients, setMaxIngredients] = useState(20);

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter((recipe) => {
      if (searchTerm) {
        const lowercasedTerm = searchTerm.toLowerCase();
        const searchMatch =
          recipe.title.toLowerCase().includes(lowercasedTerm) ||
          recipe.author.toLowerCase().includes(lowercasedTerm) ||
          recipe.tags.some((tag) =>
            tag.toLowerCase().includes(lowercasedTerm)
          );
        if (!searchMatch) return false;
      }

      if (recipe.prepTimeMinutes > maxPrepTime) {
        return false;
      }

      if (recipe.ingredientCount > maxIngredients) {
        return false;
      }

      return true;
    });
  }, [searchTerm, allRecipes, maxPrepTime, maxIngredients]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by recipe, author, or tag..."
            className="pl-10 w-full max-w-lg mx-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4 justify-center p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 font-semibold justify-center">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            <span>Filters</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center px-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="prep-time-filter" className="text-sm font-medium">
                  Max Cook Time
                </Label>
                <span className="text-sm font-medium text-primary">{maxPrepTime} mins</span>
              </div>
              <Slider
                id="prep-time-filter"
                min={10}
                max={120}
                step={5}
                value={[maxPrepTime]}
                onValueChange={(value) => setMaxPrepTime(value[0])}
              />
            </div>
            <div className="space-y-3">
               <div className="flex justify-between items-center">
                <Label htmlFor="ingredient-count-filter" className="text-sm font-medium">
                  Max Ingredients
                </Label>
                <span className="text-sm font-medium text-primary">{maxIngredients}</span>
              </div>
              <Slider
                id="ingredient-count-filter"
                min={1}
                max={20}
                step={1}
                value={[maxIngredients]}
                onValueChange={(value) => setMaxIngredients(value[0])}
              />
            </div>
          </div>
        </div>
      </div>
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg font-medium">No recipes found</p>
          <p className="text-muted-foreground">
            Try adjusting your search or filters, or submit a new recipe!
          </p>
        </div>
      )}
    </div>
  );
}
