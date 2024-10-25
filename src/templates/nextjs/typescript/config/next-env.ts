import { promises } from 'fs';

export const scaffoldNextEnv = async (
  cwd: string,
): Promise<void> => {
  const nextEnv = `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`;

  await promises.writeFile(`${cwd}/next-env.d.ts`, nextEnv);
};