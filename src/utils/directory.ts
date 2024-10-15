import { existsSync, mkdirSync, readdirSync, rmSync } from 'fs'

// check if the directory is empty or not using fs
export const isEmptyDir = (dir: string): boolean => {
  return !readdirSync(dir).length
}

export const createDirectory = async (
  cwd: string,
  name: string,
): Promise<string> => {
  const dir = name !== cwd.split(/[\\/]/).pop() ? `${cwd}/${name}` : cwd

  if (!existsSync(dir)) {
    mkdirSync(dir)
    return dir
  }

  if (!isEmptyDir(dir)) {
    rmSync(dir, { recursive: true })
    mkdirSync(dir)
  }

  return dir
}
