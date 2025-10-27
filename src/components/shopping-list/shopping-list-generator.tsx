"use client";

import { useState, useMemo } from "react";
import type { Recipe } from "@/lib/recipes";
import { generateShoppingList } from "@/lib/shopping-list";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ListPlus, ArrowRight } from "lucide-react";
import { RecipeSelection } from "./recipe-selection";
import { ShoppingListDisplay } from "./shopping-list-display";
import { Separator } from "../ui/separator";

type ShoppingListGeneratorProps = {
  allRecipes: Recipe[];
};

export function ShoppingListGenerator({
  allRecipes,
}: ShoppingListGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState<Set<string>>(new Set());
  const [showList, setShowList] = useState(false);

  const handleSelectionChange = (recipeId: string, isSelected: boolean) => {
    setSelectedRecipes((prev) => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(recipeId);
      } else {
        newSet.delete(recipeId);
      }
      return newSet;
    });
  };

  const shoppingList = useMemo(() => {
    if (!showList) return "";
    const recipesToProcess = allRecipes.filter((r) => selectedRecipes.has(r.id));
    return generateShoppingList(recipesToProcess);
  }, [showList, selectedRecipes, allRecipes]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset state on close
      setSelectedRecipes(new Set());
      setShowList(false);
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <ListPlus className="mr-2" /> Create Shopping List
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-headline">
            Shopping List Generator
          </DialogTitle>
          <DialogDescription className="text-center">
            {showList
              ? "Your combined ingredient list is ready."
              : "Select recipes to generate a shopping list."}
          </DialogDescription>
        </DialogHeader>

        {!showList ? (
          <RecipeSelection
            allRecipes={allRecipes}
            selectedRecipes={selectedRecipes}
            onSelectionChange={handleSelectionChange}
          />
        ) : (
          <ShoppingListDisplay shoppingList={shoppingList} />
        )}

        <DialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-0">
          {showList ? (
            <Button variant="outline" onClick={() => setShowList(false)}>
              Back to Recipes
            </Button>
          ) : <div />}
          <Button
            onClick={() => {
              if (showList) {
                handleOpenChange(false);
              } else {
                setShowList(true);
              }
            }}
            disabled={!showList && selectedRecipes.size === 0}
          >
            {showList ? "Done" : (
              <>
                Generate List
                <ArrowRight className="ml-2" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
