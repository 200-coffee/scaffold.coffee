import type { tScaffoldAnswers } from '@/types/answers';

import { scaffoldPackageJson, scaffoldPostcssConfig, scaffoldGitIgnore, scaffoldNextConfig, scaffoldTailwind } from '../../generic/config';

export const handleScaffoldConfig = async (
  cwd: string,
  answers: tScaffoldAnswers,
): Promise<void> => {
  await scaffoldPackageJson(cwd, answers);
  await scaffoldGitIgnore(cwd);
  await scaffoldNextConfig(cwd, answers.language === 'typescript');
  await scaffoldPostcssConfig(cwd, answers.styling === 'tailwindcss');
  await scaffoldTailwind(cwd, answers.styling === 'tailwindcss', answers.language === 'typescript');
};