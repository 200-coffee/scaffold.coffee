import type { tScaffoldAnswers } from '@/types/answers';
import { promises } from 'fs';

export const scaffoldStylesGlobals = async (
  cwd: string,
  answers: tScaffoldAnswers,
): Promise<void> => {
  let styles: string = '';

  switch (answers.styling) {
  case 'tailwindcss':
    styles = `@tailwind base;
@tailwind components;
@tailwind utilities;
`;
    break;
  case 'scss':
    styles = `html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1rem;
  padding-left: 1rem;
}
@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}
@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}
@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}
@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}

.page_wrapper {
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5;

    .page_title {
        max-width: 28rem;
        font-size: 2.25rem;
        text-align: center;
        font-weight: 300;
        line-height: 1.2;

          .page_title_highlight {
              color: #21a6d6;
              font-weight: 500;
          }
    }
}
`;
    break;
  default:
    styles = `html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1rem;
  padding-left: 1rem;
}
@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}
@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}
@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}
@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}

.page_wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5;
}
.page_wrapper .page_title {
    max-width: 28rem;
    font-size: 2.25rem;
    text-align: center;
    font-weight: 300;
    line-height: 1.2;
}
.page_wrapper .page_title .page_title_highlight {
    color: #21a6d6;
    font-weight: 500;
}
`;
  }

  await promises.writeFile(`${cwd}/src/styles/${answers.styling === 'css' ? 'globals.css' : 'globals.scss'}`, styles);
};