import type { tScaffoldAnswers } from '@/types/answers';
import { promises } from 'fs';

export const scaffoldUiBranding = async (
  cwd: string,
  answers: tScaffoldAnswers,
): Promise<void> => {
  const content = `${answers.language === 'typescript' ? `interface Props {
  width?: string;
  height?: string;
  className?: string;
}

` : ''}const Branding = async ({
  width = "100",
  height = "58",
  className,
}${answers.language === 'typescript' ? ': Props' : ''})${answers.language === 'typescript' ? ': Promise<JSX.Element>' : ''} => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 100 58"
    className={className}
  >
    <path
      ${answers.styling === 'tailwind' ? 'className="fill-deep-cerulean-700"' : 'fill="116a93"'}
      d="M25.476 55.05c.747.813 2.34 2.543 2.748 2.95.723-.18 23.88-.523 33.375-.74 2.038-.046 4.091-.042 6.105-.39 2.738-.474 4.097-1.339 4.478-1.82H25.476Zm60.442-43.348c-2.36 0-4.714 1.289-5.596 1.933L79.1 8.344l8.954-1.425 5.495 1.12 4.172 3.663 1.017 6.614-4.477 9.972-12.922 11.6-14.755 6.614c.17-.747.672-2.402 1.323-3.053C93.957 31.442 93.55 19.232 93.55 18.316c.407-6.004-6.92-6.614-7.632-6.614Z"
    />
    <path
      ${answers.styling === 'tailwind' ? 'className="fill-iron-950 dark:fill-iron-50"' : 'fill="#25292c"'}
      d="M88.462 8.547c-3.256.082-6.309 1.527-7.428 2.239h-2.137c.136-.916.876-2.992 2.748-3.968 2.34-1.221 6.105-1.12 6.817-1.12 11.804.306 11.397 9.87 11.397 10.684-1.547 18.48-23.777 29.136-34.698 32.155.474-.848 1.465-2.748 1.628-3.562C97.118 33.615 97.112 17.3 97.112 16.391v-.008c-.713-7.428-7.53-7.836-8.65-7.836Zm-65.41 40.067 1.365-.119 2.908 4.927-3.442.416-.831-5.224Z"
    />
    <path
      ${answers.styling === 'tailwind' ? 'className="fill-deep-cerulean-700"' : 'fill="#116a93"'}
      d="m23.942 47.961 2.434 6.945-4.452-.356-2.434-6.47 4.452-.119Z"
    />
    <mask
      id="a"
      width="77"
      height="56"
      x="7"
      y="0"
      maskUnits="userSpaceOnUse"
      style={{ maskType: "alpha" }}
    >
      <path
        ${answers.styling === 'tailwind' ? 'className="fill-iron-950 dark:fill-iron-50"' : 'fill="#25292c"'}
        d="M26.596 53.116c-.247-.586-1.66-3.253-5.341-9.362C13.122 30.26 8.155 15.846 7.059 0H83.17c-1.097 15.846-6.063 30.26-14.196 43.754-3.68 6.11-5.094 8.776-5.34 9.362 4.978-.209 13.65-.433 16.992-.083.712.075 1.182.176 1.323.308.284.266-.878.661-1.014.707l-.004.002c-.588.2-1.366.388-2.238.559-1.619.318-3.557.58-5.19.764-1.398.156-2.765.185-4.172.185H20.897c-1.406 0-2.773-.029-4.172-.185-1.632-.183-3.57-.446-5.19-.764-.87-.171-1.65-.36-2.238-.56h-.004c-.135-.047-1.297-.443-1.013-.708.141-.132.611-.233 1.323-.308 3.342-.35 12.014-.126 16.993.083Z"
      />
    </mask>
    <g mask="url(#a)">
      <path
        ${answers.styling === 'tailwind' ? 'className="fill-iron-950 dark:fill-iron-50"' : 'fill="#25292c"'}
        d="M26.596 53.116c-.247-.586-1.66-3.253-5.341-9.362C13.122 30.26 8.155 15.846 7.059 0H83.17c-1.097 15.846-6.063 30.26-14.196 43.754-3.68 6.11-5.094 8.776-5.34 9.362 4.978-.209 13.65-.433 16.992-.083.712.075 1.182.176 1.323.308.284.266-.878.661-1.014.707l-.004.002c-.588.2-1.366.388-2.238.559-1.619.318-3.557.58-5.19.764-1.398.156-2.765.185-4.172.185H20.897c-1.406 0-2.773-.029-4.172-.185-1.632-.183-3.57-.446-5.19-.764-.87-.171-1.65-.36-2.238-.56h-.004c-.135-.047-1.297-.443-1.013-.708.141-.132.611-.233 1.323-.308 3.342-.35 12.014-.126 16.993.083Z"
      />
    </g>
    <mask
      id="b"
      width="57"
      height="50"
      x="10"
      y="3"
      maskUnits="userSpaceOnUse"
      style={{ maskType: "alpha" }}
    >
      <path
        fill="#D87324"
        d="m48.066 31.544.305-6.92h6.309v6.92h-6.614Zm10.888 21.368-11.295-19.13H59.97v6.31h6.92l-5.902 12.82h-2.035Zm-2.24 0H46.032l1.424-16.28 9.26 16.28Zm-22.588 0-1.018-5.087h11.193l-.204 5.087h-9.971Zm-3.053-5.087h-4.58l1.833 5.087h3.866l-1.12-5.087Zm-1.221-23.811 3.052 21.775h11.804l1.628-21.775H29.852Zm-9.463 0h7.123l1.628 14.653-8.751-14.653Zm5.8 21.775-7.835-21.775 12.515 21.775h-4.68Zm20.554-24.014H29.648l-1.424-9.87h11.701v6.818h7.022l-.204 3.052ZM28.223 9.768h4.478V3.053h-5.19l.713 6.715Zm-1.017 12.007h-8.445L10.925 3.053H25.17l2.035 18.722Z"
      />
    </mask>
    <g mask="url(#b)">
      <path
        ${answers.styling === 'tailwind' ? 'className="fill-deep-cerulean-500"' : 'fill="#21a6d6"'}
        d="m48.066 31.544.305-6.92h6.309v6.92h-6.614Zm10.888 21.368-11.295-19.13H59.97v6.31h6.92l-5.902 12.82h-2.035Zm-2.24 0H46.032l1.424-16.28 9.26 16.28Zm-22.588 0-1.018-5.087h11.193l-.204 5.087h-9.971Zm-3.053-5.087h-4.58l1.833 5.087h3.866l-1.12-5.087Zm-1.221-23.811 3.052 21.775h11.804l1.628-21.775H29.852Zm-9.463 0h7.123l1.628 14.653-8.751-14.653Zm5.8 21.775-7.835-21.775 12.515 21.775h-4.68Zm20.554-24.014H29.648l-1.424-9.87h11.701v6.818h7.022l-.204 3.052ZM28.223 9.768h4.478V3.053h-5.19l.713 6.715Zm-1.017 12.007h-8.445L10.925 3.053H25.17l2.035 18.722Z"
      />
      <path
        ${answers.styling === 'tailwind' ? 'className="fill-deep-cerulean-700"' : 'fill="#116a93"'}
        d="M11.027 5.698h10.888l2.34 16.077 3.562.61-1.934-19.943-15.873-.509 1.017 3.765Zm19.028 0h-2.442l-.407.102-.407-3.256h6.512v7.428h-3.256V5.698Zm6.513 8.548v8.038l10.684.102.407-4.172-6.818-.407v-6.41l-13.024.305.508 2.442 8.243.102Zm-12.11 12.21h-3.052L19.473 23.2l8.344.102 1.628 6.919.102 8.954h-.611L26.9 36.326l-2.442-9.87Zm1.425 20.046-8.038-22.285v-1.933l10.48 17.705 3.46 6.31-5.902.203Zm15.772 3.358v3.358l2.646.101.814-5.901-12.72.101.815 2.34h8.445Zm-12.82 0h-2.341l-.712-2.239 5.698-.305 1.323 6.105-2.85.102-1.119-3.663Zm14.041-23.2H29.648l-.814-3.257 18.418.102-1.73 22.488h-4.07l1.424-19.333Zm8.14.61h-3.459l.712-3.561 7.021-.407.51 8.75-4.783.102V27.27Zm.916 25.948-5.189-9.87-.102-6.31.916-1.933 10.277 17.909-5.902.203Zm4.58-16.79h-7.734L47.761 34.8l-.713-1.628 13.025-.204 7.02 7.021-3.866 2.34h-6.716v-5.9Z"
      />
    </g>
    <path
      ${answers.styling === 'tailwind' ? 'className="fill-deep-cerulean-700"' : 'fill="#116a93"'}
      d="M8.28 15.06 4.617 5.902H.547l-.408-2.85h8.344L12.86 15.06H8.28Zm13.024 37.852L8.89 19.842H4.413l-2.442-2.747h11.193L25.68 52.912h-4.376Z"
    />
    <path
      ${answers.styling === 'tailwind' ? 'className="fill-iron-950 dark:fill-iron-50"' : 'fill="#25292c"'}
      d="M1.055 15.06h10.48l1.324 2.035H1.97l-.916-2.035ZM2.582 0h6.105l-.305 3.053H.139L2.582 0Z"
    />
  </svg>
);

export { Branding };`;

  await promises.writeFile(`${cwd}/src/ui/branding.${answers.language === 'typescript' ? 'tsx' : 'jsx'}`, content);
};