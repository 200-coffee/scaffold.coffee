import path from 'path';
import {  dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import type { tPackage } from '@/types/package';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getPackageInfo = async (): Promise<tPackage> => {
  const packagePath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(await fs.readFileSync(packagePath, 'utf-8'));

  return {
    name: packageJson.name || 'Scaffold.Coffee',
    description: packageJson.description || 'A simple scaffolding tool',
    version: packageJson.version || '1.0.0',
  };
};