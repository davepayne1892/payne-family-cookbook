import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Recipe = {
  id: string;
  slug: string;
  title: string;
  author: string;
  prepTime: string;
  prepTimeMinutes: number;
  servings: string;
  image: string;
  imageHint: string;
  tags: string[];
  content: string;
  ingredientCount: number;
};

const recipesDirectory = path.join(process.cwd(), 'src/recipes');

const getIngredientCount = (content: string): number => {
    const ingredientsSection = content.split('### Ingredients')[1];
    if (!ingredientsSection) return 0;
    const ingredientsList = ingredientsSection.split('###')[0];
    return (ingredientsList.match(/-\s/g) || []).length;
};

const parsePrepTime = (prepTime: string): number => {
    const timeParts = prepTime.toLowerCase().split(' ');
    let totalMinutes = 0;
    const hourIndex = timeParts.findIndex(part => part.includes('hour'));
    if (hourIndex > -1 && hourIndex > 0) {
        totalMinutes += parseInt(timeParts[hourIndex - 1]) * 60;
    }
    const minuteIndex = timeParts.findIndex(part => part.includes('minute'));
    if (minuteIndex > -1 && minuteIndex > 0) {
        totalMinutes += parseInt(timeParts[minuteIndex - 1]);
    }
    if (totalMinutes === 0) {
        const firstNum = prepTime.match(/\d+/);
        if (firstNum) {
            return parseInt(firstNum[0]);
        }
    }
    return totalMinutes;
};

export function getAllRecipes(): Recipe[] {
  const fileNames = fs.readdirSync(recipesDirectory);
  const allRecipesData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(recipesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      id: slug,
      slug,
      title: data.title,
      author: data.author,
      prepTime: data.prepTime,
      prepTimeMinutes: parsePrepTime(data.prepTime),
      servings: data.servings,
      image: data.image,
      imageHint: data.imageHint,
      tags: data.tags,
      content,
      ingredientCount: getIngredientCount(content),
    };
  });

  return allRecipesData.sort((a, b) => (a.title > b.title ? 1 : -1));
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  const allRecipes = getAllRecipes();
  return allRecipes.find(recipe => recipe.slug === slug);
}
