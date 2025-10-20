"use client";

import { useState, useMemo } from "react";
import type { Recipe } from "@/lib/recipes";
import { Input } from "@/components/ui/input";
import { RecipeCard } from "@/components/recipe-card";
import { Search } from "lucide-react";

type RecipeListProps = {
  allRecipes: Recipe[];
};

export function RecipeList({ allRecipes }: RecipeListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = useMemo(() => {
    if (!searchTerm) return allRecipes;

    const lowercasedTerm = searchTerm.toLowerCase();
    return allRecipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(lowercasedTerm) ||
        recipe.author.toLowerCase().includes(lowercasedTerm) ||
        recipe.tags.some((tag) => tag.toLowerCase().includes(lowercasedTerm))
    );
  }, [searchTerm, allRecipes]);

  return (
    <div className="space-y-6">
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
            Try adjusting your search or submit a new recipe!
          </p>
        </div>
      )}
    </div>
  );
}
