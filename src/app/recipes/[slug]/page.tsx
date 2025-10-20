import { getRecipeBySlug, recipes } from "@/lib/recipes";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, UserCircle } from "lucide-react";
import { RecipeContent } from "@/components/recipe-content";
import { HandsFreeMode } from "@/components/hands-free-mode";
import { Separator } from "@/components/ui/separator";

type RecipePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export default function RecipePage({ params }: RecipePageProps) {
  const recipe = getRecipeBySlug(params.slug);

  if (!recipe) {
    notFound();
  }
  
  const description = recipe.content.split('###')[0].trim();
  const instructions = recipe.content.split('### Instructions')[1]?.trim().split('\n').filter(line => /^\d+\./.test(line.trim())) || [];

  return (
    <article className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-64 md:h-96 w-full">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover"
          priority
          data-ai-hint={recipe.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-3xl md:text-5xl font-headline text-white">
            {recipe.title}
          </h1>
        </div>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-primary" />
            <span>{recipe.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <span>{recipe.prepTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <Separator />
        
        {description && (
          <p className="text-lg text-foreground/90 leading-relaxed">
            {description}
          </p>
        )}

        <div className="flex justify-center">
            <HandsFreeMode recipeTitle={recipe.title} steps={instructions} />
        </div>

        <RecipeContent content={recipe.content} />
      </div>
    </article>
  );
}
