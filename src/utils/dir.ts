import { existsSync, mkdirSync, readdirSync, rmSync } from 'fs';


export const createDir = async (
  cwd: string,
  name: string,
): Promise<string> => {
  const dir = name !== '.' ? `${cwd}/${name}` : cwd;

  if (!existsSync(dir)) {
    mkdirSync(dir);
    return dir;
  }

  if (readdirSync(dir).length) {
    rmSync(dir, { recursive: true });
    mkdirSync(dir);
  }

  return dir;
};