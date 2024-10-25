import type { tScaffoldAnswers } from '@/types/answers';
import { promises } from 'fs';
import { scaffoldStylesGlobals } from './globals';

export const scaffoldStyles = async (
  cwd: string,
  answers: tScaffoldAnswers,
): Promise<void> => {
  await promises.mkdir(`${cwd}/src/styles`);

  await scaffoldStylesGlobals(`${cwd}`, answers);
};