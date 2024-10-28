import { promises } from 'fs';

import type { tScaffoldAnswers } from '@/types/answers';

export const scaffoldComponentsJson = async (
  cwd: string,
  answers: tScaffoldAnswers,
): Promise<void> => {
  let componentsJson = {};

  if(answers.ui === 'none') {
    return;
  }

  switch (answers.ui) {
  case 'shadcn-ui':
    componentsJson = {
      '$schema': 'https://ui.shadcn.com/schema.json',
      'style': 'default',
      'rsc': true,
      'tsx': answers.language === 'typescript',
      'tailwind': {
        'config': `tailwind.config.${answers.language === 'typescript' ? 'ts' : 'js'}`,
        'css': `styles/globals.${answers.styling === 'css' ? 'css' : 'scss'}`,
        'baseColor': 'slate',
        'cssVariables': false
      },
      'aliases': {
        'components': '@/shadcn',
        'utils': '@/shadcn/utils'
      }
    };

    await promises.writeFile(
      `${cwd}/components.json`,
      JSON.stringify(componentsJson, null, 2),
    );
    break;
  default:
    return void 0;
  }
};