import type { LucideIcon } from "lucide-react";
import { Clock, Users, ChefHat } from "lucide-react";

export type Tag = {
  label: string;
  icon: LucideIcon;
};

export type Recipe = {
  id: string;
  slug: string;
  title: string;
  author: string;
  prepTime: string;
  servings: string;
  image: string;
  imageHint: string;
  tags: string[];
  content: string;
};

export const recipes: Recipe[] = [
  {
    id: "1",
    slug: "classic-spaghetti-carbonara",
    title: "Classic Spaghetti Carbonara",
    author: "Grandma Maria",
    prepTime: "30 Minutes",
    servings: "4",
    image: "https://picsum.photos/seed/pasta/600/400",
    imageHint: "pasta carbonara",
    tags: ["Pasta", "Italian", "Dinner", "Quick"],
    content: `
A timeless Italian classic that's quicker to make than you think. The key is to use high-quality ingredients.

### Ingredients
- 200g spaghetti
- 100g pancetta or guanciale, diced
- 2 large free-range eggs
- 50g Pecorino Romano cheese, freshly grated
- 50g Parmesan cheese, freshly grated
- Freshly ground black pepper
- Salt to taste

### Instructions
1. Bring a large pot of salted water to a boil. Cook the spaghetti according to package directions until al dente.
2. While the pasta is cooking, heat a large skillet over medium heat. Add the pancetta and cook until crisp and golden, about 5-7 minutes. Remove from heat.
3. In a medium bowl, whisk together the eggs and grated cheeses. Season generously with black pepper.
4. Once the pasta is cooked, drain it, reserving about 1/2 cup of the pasta water.
5. Immediately add the hot pasta to the skillet with the pancetta. Toss to combine.
6. Quickly pour the egg and cheese mixture over the pasta, stirring vigorously to create a creamy sauce. If the sauce is too thick, add a splash of the reserved pasta water.
7. Serve immediately, garnished with more grated cheese and a final crack of black pepper.
`,
  },
  {
    id: "2",
    slug: "creamy-tomato-soup",
    title: "Creamy Tomato Soup",
    author: "Aunt Carol",
    prepTime: "45 Minutes",
    servings: "6",
    image: "https://picsum.photos/seed/soup/600/400",
    imageHint: "tomato soup",
    tags: ["Soup", "Vegetarian", "Lunch", "Comfort Food"],
    content: `
The ultimate comfort food. Perfect with a grilled cheese sandwich for dipping.

### Ingredients
- 2 tbsp olive oil
- 1 large onion, chopped
- 2 cloves garlic, minced
- 2 (28-ounce) cans of whole peeled tomatoes, undrained
- 1 cup vegetable broth
- 1/2 cup heavy cream
- 1 tsp sugar
- Salt and freshly ground black pepper to taste
- Fresh basil for garnish

### Instructions
1. Heat the olive oil in a large pot or Dutch oven over medium heat. Add the chopped onion and cook until softened, about 5 minutes.
2. Add the minced garlic and cook for another minute until fragrant.
3. Pour in the canned tomatoes (with their juices) and the vegetable broth. Use a spoon to break up the tomatoes.
4. Bring the soup to a simmer, then reduce the heat to low, cover, and let it cook for at least 20 minutes to allow the flavors to meld.
5. Use an immersion blender to blend the soup until smooth. Alternatively, carefully transfer the soup in batches to a regular blender.
6. Stir in the heavy cream and sugar. Season with salt and pepper to taste.
7. Gently heat the soup for a few more minutes, but do not let it boil.
8. Serve hot, garnished with fresh basil leaves.
`,
  },
  {
    id: "3",
    slug: "ultimate-chocolate-fudge-cake",
    title: "Ultimate Chocolate Fudge Cake",
    author: "Cousin David",
    prepTime: "1 Hour 20 Minutes",
    servings: "12",
    image: "https://picsum.photos/seed/cake/600/400",
    imageHint: "chocolate cake",
    tags: ["Dessert", "Baking", "Chocolate", "Celebration"],
    content: `
A rich, decadent chocolate cake that's surprisingly easy to make. This will be the star of any celebration.

### Ingredients
- 2 cups all-purpose flour
- 2 cups sugar
- 3/4 cup unsweetened cocoa powder
- 2 tsp baking soda
- 1 tsp baking powder
- 1 tsp salt
- 1 cup buttermilk
- 1/2 cup vegetable oil
- 2 large eggs
- 1 tsp vanilla extract
- 1 cup boiling water

### Instructions
1. Preheat oven to 350°F (175°C). Grease and flour two 9-inch round cake pans.
2. In a large bowl, whisk together flour, sugar, cocoa powder, baking soda, baking powder, and salt.
3. In a separate bowl, combine buttermilk, oil, eggs, and vanilla extract.
4. Pour the wet ingredients into the dry ingredients and beat on medium speed for 2 minutes.
5. Carefully stir in the boiling water. The batter will be thin.
6. Pour the batter evenly into the prepared pans.
7. Bake for 30-35 minutes, or until a wooden skewer inserted into the center comes out clean.
8. Let the cakes cool in the pans for 10 minutes before inverting them onto a wire rack to cool completely before frosting.
`,
  },
  {
    id: "4",
    slug: "refreshing-greek-salad",
    title: "Refreshing Greek Salad",
    author: "Mom",
    prepTime: "15 Minutes",
    servings: "4",
    image: "https://picsum.photos/seed/salad/600/400",
    imageHint: "greek salad",
    tags: ["Salad", "Greek", "Healthy", "Side Dish"],
    content: `
A quick and healthy salad that's packed with flavor. Perfect for a light lunch or as a side dish for grilled chicken or fish.

### Ingredients
- 1 English cucumber, chopped
- 1 pint cherry tomatoes, halved
- 1 red onion, thinly sliced
- 1/2 cup Kalamata olives, pitted
- 4 ounces feta cheese, crumbled
- For the dressing:
- 1/4 cup extra virgin olive oil
- 2 tbsp red wine vinegar
- 1 tsp dried oregano
- Salt and freshly ground black pepper to taste

### Instructions
1. In a large salad bowl, combine the chopped cucumber, cherry tomatoes, sliced red onion, and Kalamata olives.
2. In a small bowl or jar, whisk together the olive oil, red wine vinegar, and dried oregano. Season with salt and pepper.
3. Pour the dressing over the vegetables and toss gently to combine.
4. Just before serving, sprinkle the crumbled feta cheese over the top.
5. For best flavor, let the salad sit for about 10 minutes to allow the flavors to marinate.
6. Serve chilled or at room temperature.
`,
  },
];

export const getRecipeBySlug = (slug: string) => {
  return recipes.find((recipe) => recipe.slug === slug);
};
