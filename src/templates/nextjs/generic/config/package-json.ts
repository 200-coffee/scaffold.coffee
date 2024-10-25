import { promises } from 'fs';

import type { tScaffoldAnswers } from '@/types/answers';

export const scaffoldPackageJson = async (
  cwd: string,
  answers: tScaffoldAnswers,
): Promise<void> => {
  const testing =  (): {
    test: string;
    'test:watch': string;
  } | null => {
    switch (answers.testing) {
    case 'jest':
      return {
        test: 'jest',
        'test:watch': 'jest --watchAll',
      };
    case 'vitest':
      return {
        test: 'vitest run',
        'test:watch': 'vitest --watch',
      };
    default:
      return null;
    }
  };
  const testScript = testing();

  const packageJson = {
    name: answers.name || 'nextjs-typescript-by-scaffold-coffee',
    version: '0.1.0',
    description: 'Next.js project scaffolded by Scaffold.Coffee',
    private: true,
    scripts: {
      build: 'next build',
      dev: 'next dev',
      'dev:turbo': 'next dev --turbo',
      start: 'next start',
      lint: 'next lint',
      'lint:fix': 'next lint --fix',
      ...(testScript ? testScript : {}),
    },
    dependencies: {
      clsx: '^2',
      geist: '^1',
      next: '^14',
      'next-themes': '^0',
      react: '^18',
      'react-dom': '^18',
    },
    devDependencies: {
      ...(answers.testing === 'vitest' ? {'@testing-library/react': '^16',} : {}),
      ...(answers.language === 'typescript' ? {
        '@types/node': '^22',
        '@types/react': '^18',
        '@types/react-dom': '^18',
        '@typescript-eslint/eslint-plugin': '^8',
        '@typescript-eslint/parser': '^8',
      } : {}),
      ...(answers.testing === 'vitest' ? {'@vitejs/plugin-react': '^4',} : {}),
      autoprefixer: '^10',
      eslint: '^8',
      'eslint-config-next': '^14',
      'eslint-config-prettier': '^9',
      'eslint-formatter-pretty': '^6',
      'eslint-plugin-import': '^2',
      'eslint-plugin-prettier': '^5',
      ...(answers.testing === 'jest' ? {jest: '^27'} : {}),
      jsdom: '^21',
      postcss: '^8',
      prettier: '^3',
      ...(answers.styling === 'tailwindcss' ? {'prettier-plugin-tailwindcss': '^0'} : {}),
      ...(answers.styling !== 'css' ? {sass: '^1'} : {}),
      ...(answers.styling === 'tailwindcss' ? {tailwindcss: '^3'} : {}),
      ...(answers.language === 'typescript' ? {typescript: '^5'} : {}),
      ...(answers.testing === 'vitest' ? {vite: '^5', vitest: '^2'} : {}),
    },
  };

  await promises.writeFile(
    `${cwd}/package.json`,
    JSON.stringify(packageJson, null, 2),
  );
};