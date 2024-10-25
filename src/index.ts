#!/usr/bin/env node

import { Command } from 'commander';
import { scaffold } from '@/commands/scaffold';
import { getPackageInfo } from './utils/package';

const init = async (): Promise<void> => {
  const packageInfo = await getPackageInfo();

  const program = new Command()
    .name(packageInfo.name || 'Scaffold.Coffee')
    .description(packageInfo.description || 'A simple scaffolding CLI for generating your next project')
    .version(packageInfo.version || 'Unknown Version', '-v, --version', 'display the version number');

  program.addCommand(scaffold);

  program.parse();
};

init();