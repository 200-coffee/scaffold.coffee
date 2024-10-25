import { type tScaffoldAnswers } from '@/types/answers';
import { logger } from '@/utils/logger';
import { scaffoldNextjsTypescript } from './nextjs/typescript';
import { scaffoldNextjsJavascript } from './nextjs/javascript';

export const handleTemplate = async (
  cwd: string,
  answers: tScaffoldAnswers,
): Promise<void> => {
  switch (answers.framework?.name) {
  case 'nextjs':
    switch (answers.language) {
    case 'typescript':
      await scaffoldNextjsTypescript(cwd, answers);
      break;
    default:
      await scaffoldNextjsJavascript(cwd, answers);
    };
    break;
  default:
    logger.error('Invalid framework provided.');
    process.exit(1);
  };
};