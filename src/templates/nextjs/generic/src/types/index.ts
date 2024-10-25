import { promises } from 'fs';

export const scaffoldTypes = async (
  cwd: string,
): Promise<void> => {
  await promises.mkdir(`${cwd}/src/types`);
};