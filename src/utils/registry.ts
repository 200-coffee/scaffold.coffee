import { tFramework } from '@/types/registry';

const frameworks: tFramework[] = [
  {
    name: 'nextjs',
    label: 'Next.js',
    version: '1.0.0',
    languages: [
      {
        name: 'typescript',
        label: 'TypeScript',
        libraries: [
          {
            name: 'shadcn',
            label: 'ui.shadcn',
          },
        ],
      },
      {
        name: 'javascript',
        label: 'JavaScript',
        libraries: [],
      },
    ],
  },
];

export const getRegistryFrameworks = async (): Promise<tFramework[]> => {
  return frameworks
    ?.filter((framework) => !!framework)
    ?.filter((framework) => !!framework?.languages?.length);
};
