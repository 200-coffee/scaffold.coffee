import type { tScaffoldAnswers } from '@/types/answers';
import { promises } from 'fs';
import { scaffoldUiBranding } from './branding';

export const scaffoldUi = async (
  cwd: string,
  answers: tScaffoldAnswers,
): Promise<void> => {
  await promises.mkdir(`${cwd}/src/ui`);

  await scaffoldUiBranding(`${cwd}`, answers);
};