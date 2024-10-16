import { promises } from 'fs';

import { type tScaffoldAnswers } from '@/types/answers';
import { logger } from '@/utils/logger';

const createPackageJson = async (cwd: string, name: string): Promise<void> => {
  const packageJson = {
    name,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
      'lint:fix': 'next lint --fix',
      test: 'vitest',
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
      '@testing-library/react': '^16',
      '@types/node': '^22',
      '@types/react': '^18',
      '@types/react-dom': '^18',
      '@typescript-eslint/eslint-plugin': '^8',
      '@typescript-eslint/parser': '^8',
      '@vitejs/plugin-react': '^4',
      autoprefixer: '^10.4.20',
      eslint: '^8',
      'eslint-config-next': '^14',
      'eslint-config-prettier': '^9',
      'eslint-formatter-pretty': '^6',
      'eslint-plugin-import': '^2',
      'eslint-plugin-prettier': '^5',
      jsdom: '^21',
      postcss: '^8',
      prettier: '^3',
      'prettier-plugin-tailwindcss': '^0',
      sass: '^1',
      tailwindcss: '^3',
      typescript: '^5',
      vite: '^5',
      vitest: '^2',
    },
  };

  await promises.writeFile(
    `${cwd}/package.json`,
    JSON.stringify(packageJson, null, 2),
  );
};

const createTsConfig = async (cwd: string): Promise<void> => {
  const tsConfig = {
    compilerOptions: {
      allowJs: true,
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      incremental: true,
      isolatedModules: true,
      jsx: 'preserve',
      lib: ['dom', 'dom.iterable', 'esnext'],
      module: 'esnext',
      moduleResolution: 'bundler',
      noEmit: true,
      resolveJsonModule: true,
      skipLibCheck: true,
      strict: true,
      plugins: [
        {
          name: 'next',
        },
      ],
      baseUrl: '.',
      paths: {
        '@/*': ['src/*'],
      },
    },
    exclude: ['node_modules'],
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
  };

  await promises.writeFile(
    `${cwd}/tsconfig.json`,
    JSON.stringify(tsConfig, null, 2),
  );
};

const createEslintConfig = async (cwd: string): Promise<void> => {
  const eslintConfig = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'next',
      'next/core-web-vitals',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  };

  await promises.writeFile(
    `${cwd}/.eslintrc`,
    JSON.stringify(eslintConfig, null, 2),
  );
};

const createGitIgnore = async (cwd: string): Promise<void> => {
  const gitIgnore = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts`;

  await promises.writeFile(`${cwd}/.gitignore`, gitIgnore);
};

const createPostcssConfig = async (cwd: string): Promise<void> => {
  const postcssConfig = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };

  await promises.writeFile(
    `${cwd}/postcss.config.js`,
    `module.exports = ${JSON.stringify(postcssConfig, null, 2)}`,
  );
};

const createViteConfig = async (cwd: string): Promise<void> => {
  const viteConfig = `/// <reference types="vitest" />
import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
})`;

  await promises.writeFile(`${cwd}/vite.config.ts`, viteConfig);
};

const createNextConfig = async (cwd: string): Promise<void> => {
  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
`;

  await promises.writeFile(`${cwd}/next.config.mjs`, nextConfig);
};

const createNextEnv = async (cwd: string): Promise<void> => {
  const nextEnv = `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`;

  await promises.writeFile(`${cwd}/next-env.d.ts`, nextEnv);
};

const createLibraryConfig = async (
  cwd: string,
  library: string,
): Promise<void> => {
  let shadcnConfig;

  switch (library) {
  case 'shadcn':
    shadcnConfig = {
      $schema: 'https://ui.shadcn.com/schema.json',
      style: 'default',
      rsc: true,
      tsx: true,
      tailwind: {
        config: 'tailwind.config.ts',
        css: 'styles/globals.scss',
        baseColor: 'slate',
        cssVariables: false,
      },
      aliases: {
        components: '@/shadcn',
        utils: '@/shadcn/utils',
      },
    };

    await promises.writeFile(
      `${cwd}/components.json`,
      JSON.stringify(shadcnConfig, null, 2),
    );
    break;
  case 'ui-coffee':
    logger.message(`Creating UI Coffee library config in ${cwd}`);
    break;
  default:
    break;
  }
};

export const handleConfigScaffold = async (
  cwd: string,
  answers: tScaffoldAnswers,
): Promise<void> => {
  await createPackageJson(cwd, answers.name).catch((err) => {
    throw err;
  });
  await createTsConfig(cwd).catch((err) => {
    throw err;
  });
  await createEslintConfig(cwd).catch((err) => {
    throw err;
  });
  await createGitIgnore(cwd).catch((err) => {
    throw err;
  });
  await createPostcssConfig(cwd).catch((err) => {
    throw err;
  });
  await createViteConfig(cwd).catch((err) => {
    throw err;
  });
  await createNextConfig(cwd).catch((err) => {
    throw err;
  });
  await createNextEnv(cwd).catch((err) => {
    throw err;
  });
  await createLibraryConfig(cwd, answers.libraries).catch((err) => {
    throw err;
  });
};
