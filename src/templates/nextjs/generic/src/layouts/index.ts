import { promises } from 'fs';

export const scaffoldLayouts = async (
  cwd: string,
): Promise<void> => {
  await promises.mkdir(`${cwd}/src/layouts`);
};