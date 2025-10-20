import Link from "next/link";
import Image from "next/image";
import type { Recipe } from "@/lib/recipes";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ListChecks } from "lucide-react";

type RecipeCardProps = {
  recipe: Recipe;
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.slug}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover"
              data-ai-hint={recipe.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4 space-y-2">
          <CardTitle className="text-xl font-headline leading-tight">
            {recipe.title}
          </CardTitle>
          <div className="flex flex-wrap gap-2 pt-2">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 bg-muted/50 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-2">
                <ListChecks className="h-4 w-4" />
                <span>{recipe.ingredientCount} ingredients</span>
            </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
