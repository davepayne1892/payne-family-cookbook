# Payne Family Cookbook

This is a digital cookbook application for the Payne family to store, view, and share their favorite recipes.

The application is built with [Next.js](https://nextjs.org/) and [React](https://react.dev/), and styled with [Tailwind CSS](https://tailwindcss.com/) and [ShadCN UI](https://ui.shadcn.com/).

## How It Works

Recipes are managed as individual Markdown (`.md`) files located in the `src/recipes` directory. This approach keeps the recipes version-controlled alongside the application code, making it easy to manage and update.

The application automatically reads all the files from this directory and makes them available to browse, search, and filter on the website.

## How to Add a New Recipe

To add a new recipe, you simply need to create a new Markdown file in the `src/recipes` directory.

1.  **Create a new file**: Add a new file with a `.md` extension inside `src/recipes`. The name of the file will become the URL for the recipe (e.g., `grandmas-apple-pie.md` will be available at `/recipes/grandmas-apple-pie`).

2.  **Add the frontmatter**: At the very top of your new file, you must include a "frontmatter" section. This section contains all the key details about your recipe. Copy and paste the template below and fill in the values for your recipe.

    ```yaml
    ---
    title: "Your Recipe Title"
    author: "Your Name"
    prepTime: "e.g., 45 Minutes"
    servings: "e.g., 4"
    image: "https://picsum.photos/seed/your-seed/600/400"
    imageHint: "e.g., apple pie"
    tags:
      - "Tag One"
      - "Tag Two"
      - "Dessert"
    ---
    ```

3.  **Write the recipe content**: Below the frontmatter, write the rest of your recipe content in Markdown format.

    - Start with a short, one-paragraph description of the dish.
    - Add an `### Ingredients` section with a bulleted list of ingredients. Each ingredient should start with `- `.
    - Add an `### Instructions` section with a numbered list of steps.

    Here is a complete example:

    ```markdown
    ---
    title: "Grandma's Apple Pie"
    author: "Grandma Payne"
    prepTime: "1 Hour 30 Minutes"
    servings: "8"
    image: "https://picsum.photos/seed/applepie/600/400"
    imageHint: "apple pie"
    tags:
      - "Dessert"
      - "Baking"
      - "Fruit"
      - "Classic"
    ---
    A classic apple pie just like grandma used to make. The perfect combination of sweet and tart, with a flaky, buttery crust.

    ### Ingredients
    - 1 recipe for a double-crust pie
    - 6-7 cups thinly sliced and peeled apples
    - 3/4 cup sugar
    - 2 tbsp all-purpose flour
    - 1 tsp ground cinnamon
    - 1/4 tsp ground nutmeg
    - 1 tbsp lemon juice
    - 1 tbsp butter

    ### Instructions
    1. Preheat oven to 425°F (220°C).
    2. Place the bottom crust in your pie plate.
    3. In a large bowl, toss the apple slices with sugar, flour, cinnamon, nutmeg, and lemon juice.
    4. Pour the apple mixture into the crust and dot with pieces of butter.
    5. Place the top crust over the filling. Trim, seal, and flute the edges. Cut slits in the top crust to allow steam to escape.
    6. Bake for 15 minutes. Reduce oven temperature to 375°F (190°C) and bake for another 35-45 minutes, until the crust is golden and the filling is bubbly.
    ```

Once you commit the new file to the repository and the site is redeployed, the new recipe will automatically appear in the cookbook.
