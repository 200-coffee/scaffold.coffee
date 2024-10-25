import { promises } from 'fs';

export const scaffoldNextConfig = async (
  cwd: string,
  typescript: boolean,
): Promise<void> => {
  const nextConfig = `${typescript ? `/** @type {import('next').NextConfig} */
` : ''}const nextConfig = {};

export default nextConfig;
`;

  await promises.writeFile(`${cwd}/next.config.mjs`, nextConfig);
};