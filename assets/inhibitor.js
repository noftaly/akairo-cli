import { Inhibitor } from 'discord-akairo';

class {CAPITALIZED_NAME}Inhibitor extends Inhibitor {
  constructor() {
    super('{LOWERCASE_NAME}', {
      reason: '{LOWERCASE_NAME}',
    });
  }

  exec(message, command) {
    // Return true to block the command.

    return false;
  }
}

export default {CAPITALIZED_NAME}Inhibitor;
