import type { tScaffoldAnswers } from '@/types/answers';
import { promises } from 'fs';

export const scaffoldAppLayout = async (
  cwd: string,
  answers: tScaffoldAnswers,
): Promise<void> => {
  let layout: string = '';

  switch(answers.styling) {
  case 'tailwindcss':
    layout = `import clsx from "clsx";
import { GeistSans } from "geist/font/sans";${answers.language === 'typescript' ? `
import type { Metadata } from "next";` : ''}

import "${answers.language === 'typescript' ? '@/' : '../'}styles/globals.scss";
import { Theme } from "${answers.language === 'typescript' ? '@/' : '../'}components/theme";
${answers.language === 'typescript' ? `
interface Props {
  children: React.ReactNode;
}` : ''}

export const metadata${answers.language === 'typescript' ? ': Metadata' : ''} = {
  title: {
    template: "%s | My Next.js Site",
    default: "My Next.js Site build with Scaffold.Coffee",
  },
};

const RootLayout = async ({ children }${answers.language === 'typescript' ? ': Props' : ''})${answers.language === 'typescript' ? ': Promise<JSX.Element>' : ''} => (
  <html lang="en" className="h-full" suppressHydrationWarning>
    <body
      className={clsx(
        "bg-iron-50 text-iron-600 dark:bg-iron-950 dark:text-iron-400",
        GeistSans.className,
      )}
    >
      <Theme>{children}</Theme>
    </body>
  </html>
);

export default RootLayout;`;
    break;
  default:
    layout = `import clsx from "clsx";
import { GeistSans } from "geist/font/sans";${answers.language === 'typescript' ? `
import type { Metadata } from "next";` : ''}

import "${answers.language === 'typescript' ? '@/' : '../'}styles/globals.${answers.styling === 'css' ? 'css' : 'scss'}";
import { Theme } from "${answers.language === 'typescript' ? '@/' : '../'}components/theme";
${answers.language === 'typescript' ? `
interface Props {
  children: React.ReactNode;
}` : ''}

export const metadata${answers.language === 'typescript' ? ': Metadata' : ''} = {
  title: {
    template: "%s | My Next.js Site",
    default: "My Next.js Site build with Scaffold.Coffee",
  },
};

const RootLayout = async ({ children }${answers.language === 'typescript' ? ': Props' : ''})${answers.language === 'typescript' ? ': Promise<JSX.Element>' : ''} => (
  <html lang="en" suppressHydrationWarning>
    <body className={GeistSans.className}>
      <Theme>{children}</Theme>
    </body>
  </html>
);

export default RootLayout;`;
    break;
  }

  await promises.writeFile(`${cwd}/src/app/layout.${answers.language === 'typescript' ? 'tsx' : 'jsx'}`, layout);
};