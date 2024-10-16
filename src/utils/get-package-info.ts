import path from 'path';

import fs from 'fs-extra';

import { type tPackage } from '@/types/package';

export const getPackageInfo = (): tPackage => {
  const packageJsonPath = path.join('package.json');
  const packageJson = fs.readJSONSync(packageJsonPath);

  return {
    name: packageJson.name || 'Scaffold.Coffee',
    description: packageJson.description || 'A simple scaffolding tool',
    version: packageJson.version || '1.0.0',
  };
};
