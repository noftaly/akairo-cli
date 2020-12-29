import { Listener } from 'discord-akairo';

class {CAPITALIZED_NAME}Listener extends Listener {
  constructor() {
    super('{LOWERCASE_NAME}', {
      event: '{EMITTER_NAME}{CAPITALIZED_NAME}',
      emitter: '{EMITTER_NAME}',
    });
  }

  exec(/* Signature to be implemented */) {
    // </>
  }
}

export default {CAPITALIZED_NAME}Listener;
