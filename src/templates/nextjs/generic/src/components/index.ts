import type { tScaffoldAnswers } from '@/types/answers';
import { promises } from 'fs';
import { scaffoldComponentsTheme } from './theme';

export const scaffoldComponents = async (
  cwd: string,
  answers: tScaffoldAnswers,
): Promise<void> => {
  await promises.mkdir(`${cwd}/src/components`);

  await scaffoldComponentsTheme(`${cwd}`, answers);
};