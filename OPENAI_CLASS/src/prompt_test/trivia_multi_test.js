import { ask, say } from "../shared/cli.js";
import { gptPrompt } from "../shared/openai.js";

main();

async function main() {
  say("Hello, Player!");

  const topic = await ask("What do you want to be quizzed on?");

  const questionsString = await gptPrompt(
    `
    Generate 4 questions for a trivia game. Do not provide answers.
    The topic is ${topic}.
    Provide the questions as a javascript array of strings like this:
    ["question 1", "question 2", "question 3", "question 4"]

    Include only the array, start with [ and end with ].
    `,
    { max_tokens: 1024, temperature: 0.3 },
  );

  let questions = [];
  try {
    questions = JSON.parse(questionsString);
  } catch (_e) {
    say(`Error parsing questions string: "${questionsString}"`);
    return; 
  }

  let correctAnswers = 0; 

  say("");

  for (const q of questions) {
    const userAnswer = await ask(q);
    const response = await gptPrompt(
      `
      The question was '${q}'.
      The provided answer was '${userAnswer}'.
      Was the answer correct?
      Be an easy grader. Accept answers that are close enough. Allow misspellings.
      Answer yes or no. If no, provide the correct answer.
      `,
      { max_tokens: 64, temperature: 0.1 },
    );

    if (response.trim().toLowerCase().startsWith("yes")) {
      correctAnswers++; 
    }

    say(response);
    say("");
  }

  say(`You got ${correctAnswers} out of ${questions.length} questions correct!`);
}
