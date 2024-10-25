import path from 'path';
import {  dirname } from 'path';
import { fileURLToPath } from 'url';
import type { tRegistry } from '@/types/registry';
import { getPackageInfo } from './package';
import { promises } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fetchRegistry = async (registryPath: string): Promise<tRegistry> => {
  const res = await fetch('https://registry.200.coffee/registry');
  const registry = await res.json();

  await promises.writeFile(registryPath, JSON.stringify(registry, null, 2));
  return registry;
};

export const getRegistryFrameworks = async (): Promise<tRegistry> => {
  let registry: tRegistry;
  const { version } = await getPackageInfo();
  const registryPath: string = path.join(__dirname, '/.', `registry-${version}.json`);

  // check if the file exists
  await promises.access(registryPath).catch(async() => {
    registry = await fetchRegistry(registryPath);
    return registry;
  });

  // if the file exists, read it
  if (registryPath) {
    const data = await promises.readFile(registryPath, 'utf-8');
    registry = JSON.parse(data);
    return registry;
  }

  registry = await fetchRegistry(registryPath);
  return registry;
};