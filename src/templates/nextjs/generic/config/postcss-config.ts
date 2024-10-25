import { promises } from 'fs';

export const scaffoldPostcssConfig = async (
  cwd: string,
  tailwind: boolean,
): Promise<void> => {
  const postcssConfig = `module.exports = {
  plugins: {
    ${tailwind ? 'tailwindcss: {},' : ''}
    autoprefixer: {},
  },
};`;

  await promises.writeFile(`${cwd}/postcss.config.js`, postcssConfig);
};