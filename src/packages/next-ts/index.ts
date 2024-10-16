import ora, { type Ora } from 'ora';

import { handleConfigScaffold } from './config';
import { handleFinalizeScaffold } from './finalize';
import { handleSrcScaffold } from './src';

import { tScaffoldAnswers } from '@/types/answers';
import { createDirectory } from '@/utils/directory';

export const handleNextTypescript = async (
  cwd: string,
  answers: tScaffoldAnswers,
): Promise<void> => {
  const spinner: Ora = ora('Setting up Next.js with TypeScript').start();

  const dir: string = await createDirectory(cwd, answers.name).catch((err) => {
    spinner.fail('Failed to create directory');
    throw err;
  });

  await handleConfigScaffold(dir, answers).catch((err) => {
    spinner.fail('Failed to create package.json');
    throw err;
  });
  await handleSrcScaffold(dir).catch((err) => {
    spinner.fail('Failed to create src directory');
    throw err;
  });
  await handleFinalizeScaffold(dir).catch((err) => {
    spinner.fail('Failed to finalize scaffold');
    throw err;
  });

  spinner.succeed('Next.js with TypeScript setup complete');
};
