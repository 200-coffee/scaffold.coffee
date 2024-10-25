import { promises } from 'fs';

export const scaffoldTsConfigJson = async (
  cwd: string,
): Promise<void> => {
  const tsConfigJson = {
    'compilerOptions': {
      'allowJs': true,
      'esModuleInterop': true,
      'forceConsistentCasingInFileNames': true,
      'incremental': true,
      'isolatedModules': true,
      'jsx': 'preserve',
      'lib': [
        'dom',
        'dom.iterable',
        'esnext'
      ],
      'module': 'esnext',
      'moduleResolution': 'bundler',
      'noEmit': true,
      'resolveJsonModule': true,
      'skipLibCheck': true,
      'strict': true,
      'plugins': [
        {
          'name': 'next'
        }
      ],
      'baseUrl': '.',
      'paths': {
        '@/*': [
          'src/*'
        ]
      }
    },
    'exclude': [
      'node_modules'
    ],
    'include': [
      'next-env.d.ts',
      '**/*.ts',
      '**/*.tsx',
      '.next/types/**/*.ts'
    ]
  };

  await promises.writeFile(`${cwd}/tsconfig.json`, JSON.stringify(tsConfigJson, null, 2));
};