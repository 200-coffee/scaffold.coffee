import { promises } from 'fs';

export const scaffoldServer = async (
  cwd: string,
): Promise<void> => {
  await promises.mkdir(`${cwd}/src/server`);
};