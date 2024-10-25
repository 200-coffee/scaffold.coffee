import { promises } from 'fs';

export const scaffoldUtils = async (
  cwd: string,
): Promise<void> => {
  await promises.mkdir(`${cwd}/src/utils`);
};