import type { tScaffoldAnswers } from '@/types/answers';
import { promises } from 'fs';

export const scaffoldComponentsTheme = async (
  cwd: string,
  answers: tScaffoldAnswers,
): Promise<void> => {
  const theme: string = `"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { useEffect } from "react";
${answers.language === 'typescript' ? `
interface Props {
  children: React.ReactNode;
}` : ''}

const ThemeWatcher = ()${answers.language === 'typescript' ? ': null' : ''} => {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const onMediaChange = ()${answers.language === 'typescript' ? ': void' : ''} => {
      const systemTheme = media.matches ? "dark" : "light";
      if (resolvedTheme === systemTheme) {
        setTheme("system");
      }
    };

    onMediaChange();
    media.addEventListener("change", onMediaChange);

    return ()${answers.language === 'typescript' ? ': void' : ''} => {
      media.removeEventListener("change", onMediaChange);
    };
  }, [resolvedTheme, setTheme]);

  return null;
};

const Theme = ({ children }${answers.language === 'typescript' ? ': Props' : ''})${answers.language === 'typescript' ? ': JSX.Element' : ''} => (
  <ThemeProvider attribute="class">
    <ThemeWatcher />
    {children}
  </ThemeProvider>
);

export { Theme };
`;
  
  await promises.writeFile(`${cwd}/src/components/theme.${answers.language === 'typescript' ? 'tsx' : 'jsx'}`, theme);
};