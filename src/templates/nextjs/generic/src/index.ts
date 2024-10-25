import type { tScaffoldAnswers } from '@/types/answers';

import { promises } from 'fs';
import { scaffoldApp } from './app';
import { scaffoldComponents } from './components';
import { scaffoldStyles } from './styles';
import { scaffoldHooks } from './hooks';
import { scaffoldLayouts } from './layouts';
import { scaffoldServer } from './server';
import { scaffoldTypes } from './types';
import { scaffoldUi } from './ui';

export const handleScaffoldSrc = async (
  cwd: string,
  answers: tScaffoldAnswers,
): Promise<void> => {
  await promises.mkdir(`${cwd}/src`);

  await scaffoldApp(`${cwd}`, answers);
  await scaffoldComponents(`${cwd}`, answers);
  await scaffoldHooks(`${cwd}`);
  await scaffoldLayouts(`${cwd}`);
  await scaffoldServer(`${cwd}`);
  await scaffoldStyles(`${cwd}`, answers);
  await scaffoldTypes(`${cwd}`);
  await scaffoldUi(`${cwd}`, answers);
};