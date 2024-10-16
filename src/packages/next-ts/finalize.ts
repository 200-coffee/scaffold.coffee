import { execa } from 'execa';

export const handleFinalizeScaffold = async (cwd: string): Promise<void> => {
  // generate git init
  await execa('git', ['init'], { cwd }).catch((err) => {
    throw err;
  });

  // run npm install
  await execa('npm', ['install'], { cwd }).catch((err) => {
    throw err;
  });
};
