import type { tScaffoldAnswers } from '@/types/answers';
import { promises } from 'fs';
import { scaffoldAppPage } from './page';
import { scaffoldAppLayout } from './layout';

export const scaffoldApp = async (
  cwd: string,
  answers: tScaffoldAnswers,
): Promise<void> => {
  await promises.mkdir(`${cwd}/src/app`);

  await scaffoldAppPage(`${cwd}`, answers);
  await scaffoldAppLayout(`${cwd}`, answers); 
};