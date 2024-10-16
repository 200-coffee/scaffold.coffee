#!/usr/bin/env node

import { Command } from 'commander';

import { scaffold } from '@/commands/scaffold';

const init = async (): Promise<void> => {
  const program = new Command()
    .name('Scaffold.Coffee')
    .description('A simple scaffolding CLI for generating your next project')
    .version('0.0.11', '-v, --version', 'display the version number');

  program.addCommand(scaffold);

  program.parse();
};

init();
