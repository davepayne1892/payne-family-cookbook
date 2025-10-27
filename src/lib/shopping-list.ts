import type { Recipe } from "./recipes";
import pluralize from 'pluralize';

type Ingredient = {
    quantity: number;
    unit: string | null;
    name: string;
};

type ParsedIngredient = {
    quantity: number | null;
    unit: string | null;
    name: string;
};

// A list of common units to help with parsing
const UNITS = [
    'cup', 'cups', 'c',
    'tablespoon', 'tablespoons', 'tbsp',
    'teaspoon', 'teaspoons', 'tsp',
    'ounce', 'ounces', 'oz',
    'pound', 'pounds', 'lb', 'lbs',
    'gram', 'grams', 'g',
    'kilogram', 'kilograms', 'kg',
    'milliliter', 'milliliters', 'ml',
    'liter', 'liters', 'l',
    'pinch', 'dash',
    'clove', 'cloves',
];

function parseIngredientString(line: string): ParsedIngredient | null {
    if (!line) return null;
    line = line.replace(/-\s*/, '').trim().toLowerCase();

    // Regex to capture quantity (including fractions), unit, and name
    const regex = /^((\d*\s*)?(\d+\/\d+|\d+(\.\d+)?))?\s*([a-z]+)?\s*(.*)$/;
    const match = line.match(regex);
    
    if (!match) return { quantity: null, unit: null, name: line };

    let quantityStr = match[1]?.trim();
    let unit = match[5]?.trim();
    let name = match[6]?.trim();

    let quantity: number | null = null;
    if (quantityStr) {
        if (quantityStr.includes('/')) {
            const [num, den] = quantityStr.split('/').map(Number);
            quantity = num / den;
        } else {
            quantity = parseFloat(quantityStr);
        }
    }

    // Check if the parsed unit is a valid unit
    if (unit && !UNITS.includes(unit)) {
        name = `${unit} ${name}`.trim();
        unit = null;
    }
    
    // Handle cases where no quantity is specified (e.g., "Salt to taste")
    if (quantity === null && unit === null && !/^\d/.test(line)) {
      return { quantity: null, unit: null, name: line };
    }

    // Clean up name
    name = name.replace(/,.*$/, '').trim(); // Remove anything after a comma
    
    return { quantity, unit, name };
}


export function generateShoppingList(selectedRecipes: Recipe[]): string {
    const combinedIngredients: Map<string, Omit<Ingredient, 'name'>> = new Map();

    for (const recipe of selectedRecipes) {
        const ingredientsSection = recipe.content.split('### Ingredients')[1];
        if (!ingredientsSection) continue;
        
        const ingredientsList = ingredientsSection.split('###')[0];
        const lines = ingredientsList.split('\n').filter(line => line.trim().startsWith('-'));

        for (const line of lines) {
            const parsed = parseIngredientString(line);
            if (!parsed || !parsed.name) continue;

            const { quantity, unit, name } = parsed;
            const singularName = pluralize.singular(name);
            const key = unit ? `${singularName}::${unit}` : singularName;

            if (quantity === null) {
                // For ingredients without quantities, just ensure they are on the list
                if (!combinedIngredients.has(key)) {
                    combinedIngredients.set(key, { quantity: Infinity, unit });
                }
            } else {
                const existing = combinedIngredients.get(key);
                if (existing) {
                    // Don't add quantities if one is Infinity (e.g. "to taste")
                    if(existing.quantity !== Infinity) {
                        existing.quantity += quantity;
                    }
                } else {
                    combinedIngredients.set(key, { quantity, unit });
                }
            }
        }
    }

    if (combinedIngredients.size === 0) {
        return "No ingredients found for the selected recipes.";
    }

    let list = '';
    for (const [key, { quantity, unit }] of combinedIngredients.entries()) {
        const [name] = key.split('::');
        
        if (quantity === Infinity || quantity === null) {
            list += `- ${name.charAt(0).toUpperCase() + name.slice(1)}\n`;
        } else {
            const roundedQuantity = Math.ceil(quantity * 4) / 4; // Round up to nearest 0.25
            const finalQuantity = roundedQuantity > 1 ? pluralize(String(roundedQuantity)) : String(roundedQuantity);
            const finalUnit = unit ? (roundedQuantity > 1 ? pluralize(unit) : unit) : '';

            list += `- ${finalQuantity} ${finalUnit} ${name.charAt(0).toUpperCase() + name.slice(1)}\n`;
        }
    }

    return list.trim();
}
