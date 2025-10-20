import { SubmitRecipeForm } from "@/components/submit-recipe-form";

export default function SubmitPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline text-primary">
          Share a Recipe
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Add your favorite recipe to the family collection.
        </p>
      </div>
      <SubmitRecipeForm />
    </div>
  );
}
