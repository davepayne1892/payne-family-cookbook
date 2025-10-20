"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  author: z.string().min(2, "Author name is required."),
  prepTime: z.string().min(3, "Please enter a preparation time."),
  servings: z.string().min(1, "Please enter the number of servings."),
  tags: z.string().min(3, "Please add at least one tag."),
  content: z.string().min(50, "Recipe content must be at least 50 characters."),
});

const markdownPlaceholder = `
Start with a brief introduction to your recipe.

### Ingredients
- 1 cup of love
- 2 tbsp of patience
- A pinch of magic

### Instructions
1. First, do this.
2. Then, do that.
3. Finally, enjoy!
`;

export function SubmitRecipeForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      prepTime: "",
      servings: "",
      tags: "",
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Recipe Submitted!",
      description: `Thank you for sharing "${values.title}". It's now in our collection.`,
      className: "bg-primary text-primary-foreground",
    });
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">New Recipe Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Grandma's Apple Pie" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Dessert, Baking, Quick" {...field} />
                    </FormControl>
                    <FormDescription>
                      Separate tags with commas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="prepTime"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Prep Time</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., 45 Minutes" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="servings"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Servings</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., 8" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={markdownPlaceholder}
                      className="min-h-[300px] font-mono text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Use Markdown format. Use `### Ingredients` and `### Instructions` for sections.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full">Submit Recipe</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
