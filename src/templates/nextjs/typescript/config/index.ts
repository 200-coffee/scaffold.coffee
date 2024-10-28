import type { tScaffoldAnswers } from '@/types/answers';

import { scaffoldPackageJson, scaffoldPostcssConfig, scaffoldGitIgnore, scaffoldNextConfig, scaffoldTailwind, scaffoldComponentsJson } from '../../generic/config';
import { scaffoldNextEnv } from './next-env';
import { scaffoldTsConfigJson } from './tsconfig-json';

export const handleScaffoldConfig = async (
  cwd: string,
  answers: tScaffoldAnswers,
): Promise<void> => {
  await scaffoldPackageJson(cwd, answers);
  await scaffoldGitIgnore(cwd);
  await scaffoldNextEnv(cwd);
  await scaffoldNextConfig(cwd, answers.language === 'typescript');
  await scaffoldPostcssConfig(cwd, answers.styling === 'tailwindcss');
  await scaffoldTsConfigJson(cwd);
  await scaffoldTailwind(cwd, answers.styling === 'tailwindcss', answers.language === 'typescript');
  await scaffoldComponentsJson(cwd, answers);
};