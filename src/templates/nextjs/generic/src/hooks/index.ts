import { promises } from 'fs';

export const scaffoldHooks = async (
  cwd: string,
): Promise<void> => {
  await promises.mkdir(`${cwd}/src/hooks`);
};