#!/usr/bin/env node

const fsSync = require('fs');
const fs = require('fs').promises;
const path = require('path');
const inquirer = require('inquirer');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');
const meow = require('meow');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

const capitalize = str => str[0].toUpperCase() + str.slice(1);

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);
updateNotifier({ pkg }).notify({ isGlobal: true });

const cli = meow(
  `
    Usage
      $ akairo <template>
    Arguments
      template  Has to be one of "command", "inhibitor" or "listener".
    Flags
      --ts  Specify that you are using TypeScript, and will create the template accordingly.
    Examples
      $ akairo inhibitor --ts
      $ akairo listener
  `,
  {
    pkg,
    flags: {
      ts: { type: 'boolean', default: false },
      h: { type: 'boolean', default: false },
      v: { type: 'boolean', default: false },
    },
  },
);

const template = cli.input[0];
const ext = cli.flags.ts ? 'ts' : 'js';

const questions = [
  {
    type: 'file-tree-selection',
    name: 'path',
    onlyShowDir: true,
    message: 'Where do you want to create this module?',
  },
  {
    type: 'input',
    name: 'name',
    message: 'How is your new module called?',
    validate: (input, answers) => new Promise((resolve, _reject) => {
      if (input.length === 0)
        resolve("The module's name has to contain at least 1 character.");
      else if (fsSync.existsSync(path.join(answers.path, `${input.toLowerCase()}.${ext}`)))
        resolve('This file already exist.');
      else
        resolve(true);
    }),
  },
  {
    type: 'input',
    name: 'eventEmitter',
    message: 'What is the name of the event emitter?',
    when: () => template === 'listener',
    validate: input => input.length > 0 || 'The event emitter name has to contain at least 1 character.',
  },
];

void (async () => {
  if (cli.flags.v) {
    cli.showVersion();
    return;
  }
  if (cli.flags.h || !['command', 'inhibitor', 'listener'].includes(template)) {
    cli.showHelp();
    return;
  }

  const responses = await inquirer.prompt(questions);
  const fileContent = (await fs.readFile(path.join(__dirname, 'assets', `${template}.${ext}`)))
    .toString()
    .replace(/{CAPITALIZED_NAME}/g, capitalize(responses.name.toLowerCase()))
    .replace(/{LOWERCASE_NAME}/g, responses.name.toLowerCase())
    .replace(/{EMITTER_NAME}/g, responses.eventEmitter);
  await fs.writeFile(path.join(responses.path, `${responses.name.toLowerCase()}.${ext}`), fileContent);
})();
