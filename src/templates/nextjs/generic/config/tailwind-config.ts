import { promises } from 'fs';

export const scaffoldTailwind = async (cwd: string, tailwind: boolean, typescript: boolean): Promise<void> => {
  if(!tailwind) return;
  
  const tailwindConfig = `${typescript ? `import type { Config } from "tailwindcss";
    ` : ''}
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
      },
    },
    extend: {
      colors: {
        iron: {
          "50": "#f7f8f8",
          "100": "#eeeff0",
          "200": "#cad0d3",
          "300": "#b6bfc3",
          "400": "#8f9ca1",
          "500": "#718086",
          "600": "#5b686e",
          "700": "#4a545a",
          "800": "#40484c",
          "900": "#383e42",
          "950": "#25292c",
        },
        "deep-cerulean": {
          "50": "#f1fafe",
          "100": "#e3f2fb",
          "200": "#c0e6f7",
          "300": "#88d3f1",
          "400": "#49bee7",
          "500": "#21a6d6",
          "600": "#1384b4",
          "700": "#116a93",
          "800": "#125a7a",
          "900": "#154b65",
          "950": "#0e3043",
        },
        trinidad: {
          "50": "#fef6ee",
          "100": "#fcecd8",
          "200": "#f8d4b0",
          "300": "#f3b57e",
          "400": "#ed8d4a",
          "500": "#e96e26",
          "600": "#db561c",
          "700": "#b54019",
          "800": "#90351c",
          "900": "#742e1a",
          "950": "#3f140b",
        },
      },
    },
  },
  plugins: [],
};
export default config;
`;

  await promises.writeFile(`${cwd}/tailwind.config.${typescript ? 'ts' : 'js'}`, tailwindConfig);
};