import ora, { type Ora } from 'ora';
import chalk from 'chalk';

import { tScaffoldAnswers } from '@/types/answers';
import { createDir } from '@/utils/dir';
import { handleScaffoldConfig } from './config';
import { handleScaffoldSrc } from '../generic/src';
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';
import { logger } from '@/utils/logger';

export const scaffoldNextjsTypescript = async (
  cwd: string,
  answers: tScaffoldAnswers,
): Promise<void> => {
  const spinner: Ora = ora(`Setting up ${chalk.blueBright('Next.js')} with ${chalk.blueBright('TypeScript')}`).start();

  const dir = await createDir(cwd, answers.name).catch((err) => {
    spinner.fail('Failed to create directory');
    throw err;
  });

  if(!dir) {
    spinner.fail('Failed to create directory');
    throw new Error('Failed to create directory');
  }

  const userAnswers = {
    ...answers,
    name: dir?.split('/')?.pop()?.trim(),
  };

  await handleScaffoldConfig(dir, userAnswers).catch((err) => {
    spinner.fail('Failed to scaffold config');
    throw err;
  });
  await handleScaffoldSrc(dir, userAnswers).catch((err) => {
    spinner.fail('Failed to scaffold src');
    throw err;
  });

  if(answers.install) {
    spinner.text = 'Installing dependencies';
    const execPromise = promisify(execCallback);

    const checkPackageManager = async (): Promise<string> => {
      try {
        await execPromise('yarn --version');
        return 'yarn install';
      } catch {
        try {
          await execPromise('pnpm --version');
          return 'pnpm install';
        } catch {
          try {
            await execPromise('bun --version');
            return 'bun install';
          } catch {
            return 'npm install';
          }
        }
      }
    };

    const installCommand = await checkPackageManager();
    await execPromise(installCommand, { cwd: dir });
    spinner.succeed('Dependencies installed');

    if(!answers.git) {
      logger.message('');
    }
  }

  if (answers.git) {
    const execPromise = promisify(execCallback);

    spinner.text = 'Initializing git';
    await execPromise('git init', { cwd: dir });
    spinner.succeed('Git initialized');

    logger.message('');
  }

  spinner.succeed(`${chalk.blueBright('Next.js')} with ${chalk.blueBright('TypeScript')} setup complete`);
};