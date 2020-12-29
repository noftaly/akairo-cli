import { Inhibitor } from 'discord-akairo';
import type { Command } from 'discord-akairo';
import type { Message } from 'discord.js';

class {CAPITALIZED_NAME}Inhibitor extends Inhibitor {
  constructor() {
    super('{LOWERCASE_NAME}', {
      reason: '{LOWERCASE_NAME}',
    });
  }

  public exec(message: Message, command: Command): boolean {
    // Return true to block the command.

    return false;
  }
}

export default {CAPITALIZED_NAME}Inhibitor;
