import { Command } from 'discord-akairo';
import { Permissions } from 'discord.js';

class {CAPITALIZED_NAME}Command extends Command {
  constructor() {
    super('{LOWERCASE_NAME}', {
      aliases: ['alias1', 'alias2'],
      description: 'Description of command {CAPITALIZED_NAME}',
      args: [{
        id: 'argumentId',
        type: 'ArgumentType',
        match: 'content',
      }],
      clientPermissions: Permissions.FLAGS.SEND_MESSAGES,
      userPermissions: Permissions.FLAGS.SEND_MESSAGES,
      channel: 'guild',
    });
  }

  async exec(message, args) {
    // </>
  }
}

export default {CAPITALIZED_NAME}Command;
