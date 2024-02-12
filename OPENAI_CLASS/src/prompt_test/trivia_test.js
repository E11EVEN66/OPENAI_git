import { ask, say } from "../shared/cli.js";
import { gptPrompt } from "../shared/openai.js";

main();

async function main() {
  say("Hello, Player!");

  const topic = await ask("What do you want to be quizzed on?");

  // Use a higher temperature for generating questions to encourage creativity.
  const questionsString = await gptPrompt(
    `
    Generate 4 questions for a trivia game. Do not provide answers.
    The topic is ${topic}.
    Provide the questions as a JavaScript array of strings like this:
    ["question 1", "question 2", "question 3", "question 4"]

    Include only the array, start with [ and end with ].
    `,
    { max_tokens: 1024, temperature: 0.6 }, // Adjusted temperature for question generation
  );

  let questions = [];
  try {
    questions = JSON.parse(questionsString);
  } catch (_e) {
    say(`Error parsing questions string: "${questionsString}"`);
    return; // Removed end() as it's not defined in the given code snippet
  }

  say("");

  for (const q of questions) {
    const a = await ask(q);
    
    // Use a lower temperature for evaluating answers to prioritize accuracy.
    const response = await gptPrompt(
      `
    The question was '${q}'.
    The provided answer was '${a}'.
    Was the answer correct?
    Be an easy grader. Accept answers that are close enough. Allow misspellings.
    Answer yes or no. If no, provide the correct answer.
    `,
      { max_tokens: 64, temperature: 0.1 }, // Lower temperature for answer evaluation
    );
    say(response);
    say("");
  }
}