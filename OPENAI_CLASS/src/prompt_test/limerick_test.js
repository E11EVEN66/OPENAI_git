import { gptPrompt } from "../shared/openai.js";
import { ask, say } from "../shared/cli.js";

main();

async function main() {
  say("Hello, GPT!");

  const name = await ask("What is your name?");
  const town = await ask("Where are you from?");

  say("");

  const prompt =
    `My name is ${name} and I am from ${town}. Create a haiku about me. Remember, a traditional haiku has a 5-7-5 syllable structure and often reflects on nature, though feel free to adapt it to reflect the personal details provided.`;

  const haiku = await gptPrompt(prompt, { temperature: 0.7 });
  say(`"""\n${haiku}\n"""`);
}