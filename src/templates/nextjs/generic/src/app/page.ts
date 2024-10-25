import type { tScaffoldAnswers } from '@/types/answers';
import { promises } from 'fs';

export const scaffoldAppPage = async (
  cwd: string,
  answers: tScaffoldAnswers,
): Promise<void> => {
  let page: string = '';

  switch(answers.styling) {
  case 'tailwindcss':
    page = `import { Branding } from "${answers.language === 'typescript' ? '@/' : '../'}ui/branding";

const Page = async ()${answers.language === 'typescript' ? ': Promise<JSX.Element>' : ''} => (
  <div className="container">
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">
      <Branding />
      <h1 className="max-w-md text-4xl text-center font-light leading-tight">
        Welcome to{" "}
        <span className="text-deep-cerulean-500 font-semibold">
          Scaffold.Coffee
        </span>
      </h1>
    </div>
  </div>
);

export default Page;`;
    break;
  default:
    page = `import { Branding } from "${answers.language === 'typescript' ? '@/' : '../'}ui/branding";

const Page = async ()${answers.language === 'typescript' ? ': Promise<JSX.Element>' : ''} => (
  <div className="container">
    <div className="page_wrapper">
      <Branding />
      <h1 className="page_title">
        Welcome to{" "}
        <span className="page_title_highlight">
          Scaffold.Coffee
        </span>
      </h1>
    </div>
  </div>
);

export default Page;`;
    break;
  }

  await promises.writeFile(`${cwd}/src/app/page.${answers.language === 'typescript' ? 'tsx' : 'jsx'}`, page);
};