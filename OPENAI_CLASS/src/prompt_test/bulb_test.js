import { ask, say } from "../shared/cli.js";
import { gptPrompt } from "../shared/openai.js";

main();

async function main() {
  say("Hello, Player!");

  const topic = await ask("What subject would you like a light bulb joke about?");

  const joke = await gptPrompt(
    `
    Create a light bulb joke about the subject: ${topic}. The joke should follow the classic format of "How many X does it take to change a light bulb?" followed by a humorous punchline.
    `,
    { max_tokens: 1024, temperature: 0.7 },
  );

  say(`Here's your joke about ${topic}:\n${joke}`);
}
