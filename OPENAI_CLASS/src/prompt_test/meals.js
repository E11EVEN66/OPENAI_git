import { ask, say } from "../shared/cli.js";
import { gptPrompt } from "../shared/openai.js";

async function generateMealPlan() {
    say("Welcome to the Weekly Meal Planner!");

    const dietaryRestrictions = await ask("Do you have any allergies? (e.g., vegetarian, gluten-free) If none, type 'no': ");
    const preferredCuisine = await ask("What is your preferred cuisine? (e.g., Italian, Asian, Mexican): ");

    const mealPlanPrompt = `
        Given the dietary restrictions: ${dietaryRestrictions === 'no' ? 'none' : dietaryRestrictions}, and preferred cuisine: ${preferredCuisine},
        create a structured weekly meal plan including breakfast, lunch, and dinner for each day. Include the meal's name and approximate calorie counts. Please format the meal plan as detailed text following the example format provided.
    `;

    const mealPlanResponse = await gptPrompt(mealPlanPrompt, { max_tokens: 1500, temperature: 0.5 });
    say("Your Weekly Meal Plan:");
    say(mealPlanResponse);

    const shoppingListPrompt = `
        Given the dietary restrictions: ${dietaryRestrictions === 'no' ? 'none' : dietaryRestrictions}, and preferred cuisine: ${preferredCuisine},
        list all the ingredients needed for the week with practical quantities for purchasing at a grocery store. Use common units like pounds for meat, boxes for pasta, bunches for vegetables, and liters or gallons for liquids. Format the shopping list as a simple text list.
    `;

    const shoppingListResponse = await gptPrompt(shoppingListPrompt, { max_tokens: 800, temperature: 0.5 });
    say("Your Practical Shopping List:");
    say(shoppingListResponse);

    const budgetPrompt = `
    Given a typical shopping list with common ingredients such as meat, vegetables, grains, and pantry staples, provide a rough estimate of the total cost for a week's groceries for one person in the United States, assuming average prices and a balanced diet.
    `;

    const budgetResponse = await gptPrompt(budgetPrompt, { max_tokens: 1000, temperature: 0.5 });
    say("Estimated Total Cost:");
    say(budgetResponse);
}

generateMealPlan().catch(err => {
    say("An error occurred:");
    console.error(err);
});
