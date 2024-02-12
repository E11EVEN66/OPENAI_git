import { gptPrompt } from "../shared/openai.js";
import { ask, say } from "../shared/cli.js";

main();

async function main() {
  say("Hello, brave soul!");

  const context = [];
  let playing = true;
  const location = "enchanted forest"; // Changed to fit the fairy tale theme
  const player = {};
  player.name = await ask("By what name shall the bards know you?");
  player.class = await ask("What is your destined path? A mighty warrior, a cunning sorcerer, or perhaps a wise ranger?");

  say("The air is filled with the scent of adventure and mystery...");

  while (playing) {
    const command = await ask("What daring deed shall you attempt?");
    if (command === "quit") {
      playing = false;
      say("Farewell, hero. May your tales be told for generations.");
      break;
    }

    const prompt = `
  In the realm of the ${location}, tales of ${player.name} the ${player.class} are beginning to spread far and wide.
  This enchanted land is alive, filled with ancient mysteries and whispered secrets.
  
  Recently: ${context.slice(-3).join(" ")}

  Guide them, oh wise one. What happens next on their quest?
  Let your words paint the path they tread, amidst the shadows and the light.
  
  Their latest endeavor: '${command}'.
  `;

    const response = await gptPrompt(prompt, {
      max_tokens: 128,
      temperature: 0.7, // Adjusted for more creativity
    });
    context.push(response);
    say(`\n"${response}"\n`);
  }
}