import { z } from 'zod';
import { Command } from 'commander';
import { logger } from '@/utils/logger';
import { resolve, dirname } from 'path';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';

import { useScaffoldPrompt } from '@/prompts/scaffold';
import { tScaffoldAnswers } from '@/types/answers';
import { handleTemplate } from '@/templates';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const initOptionsSchema = z.object({
  cwd: z.string(),
  yes: z.boolean(),
  defaults: z.boolean(),
});

const ANSWERS_FILE_PATH = resolve(__dirname, 'storedAnswers.json');

const storeAnswers =  (answers: tScaffoldAnswers): void => {
  writeFileSync(ANSWERS_FILE_PATH, JSON.stringify(answers, null, 2));
};

const loadStoredAnswers = (): tScaffoldAnswers | null => {
  if (!existsSync(ANSWERS_FILE_PATH)) return null;
  
  const data = readFileSync(ANSWERS_FILE_PATH, 'utf-8');
  return JSON.parse(data) as tScaffoldAnswers;
};

export const scaffold = new Command()
  .name('scaffold')
  .description('Scaffold a new project')
  .option('-y, --yes', 'skip confirmation prompt.', false)
  .option('-d, --defaults,', 'use default configuration.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .action(async (opts) => {
    const options = initOptionsSchema.parse(opts);

    const scriptRunningPath = options.cwd ? resolve(options.cwd) : process.cwd();

    logger.welcome();

    const storedAnswers = loadStoredAnswers();
    const answers: tScaffoldAnswers = await useScaffoldPrompt(scriptRunningPath, storedAnswers, options.yes);

    storeAnswers(answers);

    logger.message('');

    await handleTemplate(scriptRunningPath, answers);
  });