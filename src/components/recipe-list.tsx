"use client";

import { useState, useMemo } from "react";
import type { Recipe } from "@/lib/recipes";
import { Input } from "@/components/ui/input";
import { RecipeCard } from "@/components/recipe-card";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type RecipeListProps = {
  allRecipes: Recipe[];
};

export function RecipeList({ allRecipes }: RecipeListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrepTime, setMaxPrepTime] = useState("");
  const [maxIngredients, setMaxIngredients] = useState("");

  const filteredRecipes = useMemo(() => {
    let recipes = allRecipes;

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      recipes = recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(lowercasedTerm) ||
          recipe.author.toLowerCase().includes(lowercasedTerm) ||
          recipe.tags.some((tag) => tag.toLowerCase().includes(lowercasedTerm))
      );
    }
    
    if (maxPrepTime) {
        recipes = recipes.filter(recipe => recipe.prepTimeMinutes <= parseInt(maxPrepTime));
    }

    if (maxIngredients) {
        recipes = recipes.filter(recipe => recipe.ingredientCount <= parseInt(maxIngredients));
    }

    return recipes;

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

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 font-semibold">
                <SlidersHorizontal className="h-5 w-5 text-primary"/>
                <span>Filters</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="prep-time-filter" className="text-sm font-medium">Max Cook Time</Label>
                    <Select value={maxPrepTime} onValueChange={(value) => setMaxPrepTime(value === 'any' ? '' : value)}>
                        <SelectTrigger id="prep-time-filter" className="w-full sm:w-[180px] bg-background">
                            <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="90">1.5 hours</SelectItem>
                            <SelectItem value="any">Any</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="ingredient-count-filter" className="text-sm font-medium">Max Ingredients</Label>
                    <Select value={maxIngredients} onValueChange={(value) => setMaxIngredients(value === 'any' ? '' : value)}>
                        <SelectTrigger id="ingredient-count-filter" className="w-full sm:w-[180px] bg-background">
                            <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5 ingredients</SelectItem>
                            <SelectItem value="10">10 ingredients</SelectItem>
                            <SelectItem value="15">15 ingredients</SelectItem>
                            <SelectItem value="any">Any</SelectItem>
                        </SelectContent>
                    </Select>
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
