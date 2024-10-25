import { string } from 'yup';

export const validatePackageName = (name: string, currentDirName: string): boolean => {
  if(name.trim() === '.') {
    return string().matches(/^[a-z0-9-]+$/).isValidSync(currentDirName);
  }
  return string().matches(/^[a-z0-9-]+$/).isValidSync(name);
};