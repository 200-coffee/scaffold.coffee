#!/usr/bin/env node
import{Command as le}from"commander";import{existsSync as ee}from"fs";import te from"path";import re from"chalk";import{Command as se}from"commander";import ie from"prompts";import{z as h}from"zod";import Y from"ora";import{promises as c}from"fs";import p from"chalk";var n={error(...t){console.log(p.red(...t))},warn(...t){console.log(p.yellow(...t))},info(...t){console.log(p.cyan(...t))},success(...t){console.log(p.green(...t))},message(...t){console.log(p.visible(...t))},break(){console.log("")},welcome(){console.log(p.blueBright(`                                 
 _____         ___ ___     _   _ 
|   __|___ ___|  _|  _|___| |_| |
|__   |  _| .'|  _|  _| . | | . |
|_____|___|__,|_| |_| |___|_|___|
                                 `)),console.log("")}};var F=async(t,e)=>{let r={name:e,version:"0.1.0",private:!0,scripts:{dev:"next dev",build:"next build",start:"next start",lint:"next lint","lint:fix":"next lint --fix",test:"vitest"},dependencies:{clsx:"^2",geist:"^1",next:"^14","next-themes":"^0",react:"^18","react-dom":"^18"},devDependencies:{"@testing-library/react":"^16","@types/node":"^22","@types/react":"^18","@types/react-dom":"^18","@typescript-eslint/eslint-plugin":"^8","@typescript-eslint/parser":"^8","@vitejs/plugin-react":"^4",autoprefixer:"^10.4.20",eslint:"^8","eslint-config-next":"^14","eslint-config-prettier":"^9","eslint-formatter-pretty":"^6","eslint-plugin-import":"^2","eslint-plugin-prettier":"^5",jsdom:"^21",postcss:"^8",prettier:"^3","prettier-plugin-tailwindcss":"^0",sass:"^1",tailwindcss:"^3",typescript:"^5",vite:"^5",vitest:"^2"}};await c.writeFile(`${t}/package.json`,JSON.stringify(r,null,2))},H=async t=>{let e={compilerOptions:{allowJs:!0,esModuleInterop:!0,forceConsistentCasingInFileNames:!0,incremental:!0,isolatedModules:!0,jsx:"preserve",lib:["dom","dom.iterable","esnext"],module:"esnext",moduleResolution:"bundler",noEmit:!0,resolveJsonModule:!0,skipLibCheck:!0,strict:!0,plugins:[{name:"next"}],baseUrl:".",paths:{"@/*":["src/*"]}},exclude:["node_modules"],include:["next-env.d.ts","**/*.ts","**/*.tsx",".next/types/**/*.ts"]};await c.writeFile(`${t}/tsconfig.json`,JSON.stringify(e,null,2))},M=async t=>{let e={env:{browser:!0,es2021:!0,node:!0},extends:["eslint:recommended","plugin:react/recommended","plugin:@typescript-eslint/recommended","plugin:prettier/recommended","next","next/core-web-vitals"],parser:"@typescript-eslint/parser",parserOptions:{ecmaFeatures:{jsx:!0},ecmaVersion:"latest",sourceType:"module"},plugins:["react","@typescript-eslint","prettier"],rules:{"prettier/prettier":"error","react/react-in-jsx-scope":"off","@typescript-eslint/explicit-module-boundary-types":"off"}};await c.writeFile(`${t}/.eslintrc`,JSON.stringify(e,null,2))},C=async t=>{let e=`# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts`;await c.writeFile(`${t}/.gitignore`,e)},L=async t=>{let e={plugins:{tailwindcss:{},autoprefixer:{}}};await c.writeFile(`${t}/postcss.config.js`,`module.exports = ${JSON.stringify(e,null,2)}`)},J=async t=>{let e=`/// <reference types="vitest" />
import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
})`;await c.writeFile(`${t}/vite.config.ts`,e)},E=async t=>{let e=`/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
`;await c.writeFile(`${t}/next.config.mjs`,e)},O=async t=>{let e=`/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`;await c.writeFile(`${t}/next-env.d.ts`,e)},A=async(t,e)=>{let r;switch(e){case"shadcn":r={$schema:"https://ui.shadcn.com/schema.json",style:"default",rsc:!0,tsx:!0,tailwind:{config:"tailwind.config.ts",css:"styles/globals.scss",baseColor:"slate",cssVariables:!1},aliases:{components:"@/shadcn",utils:"@/shadcn/utils"}},await c.writeFile(`${t}/components.json`,JSON.stringify(r,null,2));break;case"ui-coffee":n.message(`Creating UI Coffee library config in ${t}`);break;default:break}},y=async(t,e)=>{await F(t,e.name).catch(r=>{throw r}),await H(t).catch(r=>{throw r}),await M(t).catch(r=>{throw r}),await C(t).catch(r=>{throw r}),await L(t).catch(r=>{throw r}),await J(t).catch(r=>{throw r}),await E(t).catch(r=>{throw r}),await O(t).catch(r=>{throw r}),await A(t,e.libraries).catch(r=>{throw r})};import{execa as v}from"execa";var x=async t=>{await v("git",["init"],{cwd:t}).catch(e=>{throw e}),await v("npm",["install"],{cwd:t}).catch(e=>{throw e})};import{promises as a}from"fs";var I=async t=>{await a.mkdir(`${t}/src`).catch(e=>{throw e})},R=async t=>{await a.mkdir(`${t}/src/app`).catch(i=>{throw i});let e=`import clsx from "clsx";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import "@/styles/globals.scss";
import { Theme } from "@/components/theme";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: "%s | My Next.js Site",
    default: "My Next.js Site build with Scaffold.Coffee",
  },
};

const RootLayout = async ({ children }: Props): Promise<JSX.Element> => (
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

export default RootLayout;
`,r=`import { Branding } from "@/ui/branding";

const Page = async (): Promise<JSX.Element> => (
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

export default Page;
`;await a.writeFile(`${t}/src/app/layout.tsx`,e).catch(i=>{throw i}),await a.writeFile(`${t}/src/app/page.tsx`,r).catch(i=>{throw i})},D=async t=>{await a.mkdir(`${t}/src/components`).catch(r=>{throw r});let e=`"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const ThemeWatcher = (): null => {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const onMediaChange = (): void => {
      const systemTheme = media.matches ? "dark" : "light";
      if (resolvedTheme === systemTheme) {
        setTheme("system");
      }
    };

    onMediaChange();
    media.addEventListener("change", onMediaChange);

    return (): void => {
      media.removeEventListener("change", onMediaChange);
    };
  }, [resolvedTheme, setTheme]);

  return null;
};

const Theme = ({ children }: Props): JSX.Element => (
  <ThemeProvider attribute="class">
    <ThemeWatcher />
    {children}
  </ThemeProvider>
);

export { Theme };
`;await a.writeFile(`${t}/src/components/theme.tsx`,e).catch(r=>{throw r})},U=async t=>{await a.mkdir(`${t}/src/hooks`).catch(e=>{throw e})},W=async t=>{await a.mkdir(`${t}/src/layouts`).catch(e=>{throw e})},X=async t=>{await a.mkdir(`${t}/src/server`).catch(e=>{throw e})},B=async t=>{await a.mkdir(`${t}/src/styles`).catch(r=>{throw r});let e=`@tailwind base;
@tailwind components;
@tailwind utilities;';`;await a.writeFile(`${t}/src/styles/globals.scss`,e).catch(r=>{throw r})},V=async t=>{await a.mkdir(`${t}/src/types`).catch(e=>{throw e})},z=async t=>{await a.mkdir(`${t}/src/ui`).catch(r=>{throw r});let e=`interface Props {
  width?: string;
  height?: string;
  className?: string;
}

const Branding = async ({
  width = "100",
  height = "58",
  className,
}: Props): Promise<JSX.Element> => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 100 58"
    className={className}
  >
    <path
      className="fill-deep-cerulean-700"
      d="M25.476 55.05c.747.813 2.34 2.543 2.748 2.95.723-.18 23.88-.523 33.375-.74 2.038-.046 4.091-.042 6.105-.39 2.738-.474 4.097-1.339 4.478-1.82H25.476Zm60.442-43.348c-2.36 0-4.714 1.289-5.596 1.933L79.1 8.344l8.954-1.425 5.495 1.12 4.172 3.663 1.017 6.614-4.477 9.972-12.922 11.6-14.755 6.614c.17-.747.672-2.402 1.323-3.053C93.957 31.442 93.55 19.232 93.55 18.316c.407-6.004-6.92-6.614-7.632-6.614Z"
    />
    <path
      className="fill-iron-950 dark:fill-iron-50"
      d="M88.462 8.547c-3.256.082-6.309 1.527-7.428 2.239h-2.137c.136-.916.876-2.992 2.748-3.968 2.34-1.221 6.105-1.12 6.817-1.12 11.804.306 11.397 9.87 11.397 10.684-1.547 18.48-23.777 29.136-34.698 32.155.474-.848 1.465-2.748 1.628-3.562C97.118 33.615 97.112 17.3 97.112 16.391v-.008c-.713-7.428-7.53-7.836-8.65-7.836Zm-65.41 40.067 1.365-.119 2.908 4.927-3.442.416-.831-5.224Z"
    />
    <path
      className="fill-deep-cerulean-700"
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
        className="fill-iron-950 dark:fill-iron-50"
        d="M26.596 53.116c-.247-.586-1.66-3.253-5.341-9.362C13.122 30.26 8.155 15.846 7.059 0H83.17c-1.097 15.846-6.063 30.26-14.196 43.754-3.68 6.11-5.094 8.776-5.34 9.362 4.978-.209 13.65-.433 16.992-.083.712.075 1.182.176 1.323.308.284.266-.878.661-1.014.707l-.004.002c-.588.2-1.366.388-2.238.559-1.619.318-3.557.58-5.19.764-1.398.156-2.765.185-4.172.185H20.897c-1.406 0-2.773-.029-4.172-.185-1.632-.183-3.57-.446-5.19-.764-.87-.171-1.65-.36-2.238-.56h-.004c-.135-.047-1.297-.443-1.013-.708.141-.132.611-.233 1.323-.308 3.342-.35 12.014-.126 16.993.083Z"
      />
    </mask>
    <g mask="url(#a)">
      <path
        className="fill-iron-950 dark:fill-iron-50"
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
        className="fill-deep-cerulean-500"
        d="m48.066 31.544.305-6.92h6.309v6.92h-6.614Zm10.888 21.368-11.295-19.13H59.97v6.31h6.92l-5.902 12.82h-2.035Zm-2.24 0H46.032l1.424-16.28 9.26 16.28Zm-22.588 0-1.018-5.087h11.193l-.204 5.087h-9.971Zm-3.053-5.087h-4.58l1.833 5.087h3.866l-1.12-5.087Zm-1.221-23.811 3.052 21.775h11.804l1.628-21.775H29.852Zm-9.463 0h7.123l1.628 14.653-8.751-14.653Zm5.8 21.775-7.835-21.775 12.515 21.775h-4.68Zm20.554-24.014H29.648l-1.424-9.87h11.701v6.818h7.022l-.204 3.052ZM28.223 9.768h4.478V3.053h-5.19l.713 6.715Zm-1.017 12.007h-8.445L10.925 3.053H25.17l2.035 18.722Z"
      />
      <path
        className="fill-deep-cerulean-700"
        d="M11.027 5.698h10.888l2.34 16.077 3.562.61-1.934-19.943-15.873-.509 1.017 3.765Zm19.028 0h-2.442l-.407.102-.407-3.256h6.512v7.428h-3.256V5.698Zm6.513 8.548v8.038l10.684.102.407-4.172-6.818-.407v-6.41l-13.024.305.508 2.442 8.243.102Zm-12.11 12.21h-3.052L19.473 23.2l8.344.102 1.628 6.919.102 8.954h-.611L26.9 36.326l-2.442-9.87Zm1.425 20.046-8.038-22.285v-1.933l10.48 17.705 3.46 6.31-5.902.203Zm15.772 3.358v3.358l2.646.101.814-5.901-12.72.101.815 2.34h8.445Zm-12.82 0h-2.341l-.712-2.239 5.698-.305 1.323 6.105-2.85.102-1.119-3.663Zm14.041-23.2H29.648l-.814-3.257 18.418.102-1.73 22.488h-4.07l1.424-19.333Zm8.14.61h-3.459l.712-3.561 7.021-.407.51 8.75-4.783.102V27.27Zm.916 25.948-5.189-9.87-.102-6.31.916-1.933 10.277 17.909-5.902.203Zm4.58-16.79h-7.734L47.761 34.8l-.713-1.628 13.025-.204 7.02 7.021-3.866 2.34h-6.716v-5.9Z"
      />
    </g>
    <path
      className="fill-deep-cerulean-700"
      d="M8.28 15.06 4.617 5.902H.547l-.408-2.85h8.344L12.86 15.06H8.28Zm13.024 37.852L8.89 19.842H4.413l-2.442-2.747h11.193L25.68 52.912h-4.376Z"
    />
    <path
      className="fill-iron-950 dark:fill-iron-50"
      d="M1.055 15.06h10.48l1.324 2.035H1.97l-.916-2.035ZM2.582 0h6.105l-.305 3.053H.139L2.582 0Z"
    />
  </svg>
);

export { Branding };
`;await a.writeFile(`${t}/src/ui/branding.tsx`,e).catch(r=>{throw r})},G=async t=>{await a.mkdir(`${t}/src/utils`).catch(e=>{throw e})},k=async t=>{await I(t).catch(e=>{throw e}),await R(`${t}`).catch(e=>{throw e}),await D(`${t}`).catch(e=>{throw e}),await U(`${t}`).catch(e=>{throw e}),await W(`${t}`).catch(e=>{throw e}),await X(`${t}`).catch(e=>{throw e}),await B(`${t}`).catch(e=>{throw e}),await V(`${t}`).catch(e=>{throw e}),await z(`${t}`).catch(e=>{throw e}),await G(`${t}`).catch(e=>{throw e})};import{existsSync as q,mkdirSync as b,readdirSync as K,rmSync as Q}from"fs";var f=t=>!K(t).length,S=async(t,e)=>{let r=e!==t.split(/[\\/]/).pop()?`${t}/${e}`:t;return q(r)?(f(r)||(Q(r,{recursive:!0}),b(r)),r):(b(r),r)};var P=async(t,e)=>{let r=Y("Setting up Next.js with TypeScript").start(),i=await S(t,e.name).catch(o=>{throw r.fail("Failed to create directory"),o});await y(i,e).catch(o=>{throw r.fail("Failed to create package.json"),o}),await k(i).catch(o=>{throw r.fail("Failed to create src directory"),o}),await x(i).catch(o=>{throw r.fail("Failed to finalize scaffold"),o}),r.succeed("Next.js with TypeScript setup complete")};var _=async(t,e)=>{var r,i;switch(n.message(""),(r=e.framework)==null?void 0:r.name){case"nextjs":switch((i=e.language)==null?void 0:i.name){case"typescript":await P(t,e);break;case"javascript":n.message("Scaffolding Next.js with JavaScript.");break;default:n.error("Invalid language provided.")}break;default:n.error("Invalid framework provided."),process.exit(1)}};var u=[{name:"nextjs",label:"Next.js",version:"1.0.0",languages:[{name:"typescript",label:"TypeScript",libraries:[{name:"shadcn",label:"ui.shadcn"}]},{name:"javascript",label:"JavaScript",libraries:[]}]}],$=async()=>{var t;return(t=u==null?void 0:u.filter(e=>!!e))==null?void 0:t.filter(e=>{var r;return!!((r=e==null?void 0:e.languages)!=null&&r.length)})};var N=(t,e)=>/^[a-z0-9-]+$/.test(t==="."?e:t);var ae=h.object({cwd:h.string(),yes:h.boolean(),defaults:h.boolean()}),oe=async(t,e=null,r=!1)=>{let i=s=>re.blueBright(s),o=t,w=(o==null?void 0:o.split(/[\\/]/).pop())??"",m="",d="",j=s=>{if(s.trim()==="."){m=o,d=w;return}m=`${o}/${s}`,d=s},g=await $();return r?{name:(e==null?void 0:e.name)??"my-app",overwrite:!1,framework:g[0].name,language:g[0].languages[0].name,libraries:null}:await ie([{type:"text",name:"name",message:`What is the ${i("name")} of your project?`,initial:(e==null?void 0:e.name)??"my-app",validate:s=>N(s,w)||`Invalid project name: ${d}`,onState:s=>j(s.value)},{type:()=>!ee(m)||f(m)?null:"toggle",name:"overwrite",message:()=>(m==="."?"Current directory":`Target directory "${m}"`)+" is not empty. Remove existing files and continue?",active:"yes",inactive:"no",initial:!0},{type:(s,{overwrite:l}={})=>(l===!1&&(n.error("Please choose an empty directory"),process.exit(1)),null),name:"overwriteChecker"},{type:"select",name:"framework",message:`Which ${i("framework")} would you like to use?`,initial:(e==null?void 0:e.framework)??0,choices:g.map(s=>({title:`${s.label}`,value:s}))},{type:s=>s&&s.languages?"select":null,name:"language",message:`Which ${i("language")} would you like to use?`,initial:(e==null?void 0:e.language)??0,choices:s=>s.languages.map(l=>({title:l.label,value:l}))},{type:s=>s&&s.libraries?"select":null,name:"libraries",message:`Which UI ${i("library")} would you like to use?`,initial:(e==null?void 0:e.libraries)??0,choices:s=>[...s.libraries.map(l=>({title:l.label,value:l.name})),{title:"None",value:null}]}])},Z=new se().name("scaffold").description("Scaffold a new project").option("-y, --yes","skip confirmation prompt.",!1).option("-d, --defaults,","use default configuration.",!1).option("-c, --cwd <cwd>","the working directory. defaults to the current directory.",process.cwd()).action(async t=>{let e=ae.parse(t),r=te.resolve(e.cwd);n.welcome();let i=await oe(r,null,e.yes);await _(r,i)});import ne from"path";import ce from"fs-extra";var T=()=>{let t=ne.join("package.json"),e=ce.readJSONSync(t);return{name:e.name||"Scaffold.Coffee",description:e.description||"A simple scaffolding tool",version:e.version||"1.0.0"}};var me=async()=>{let t=await T(),e=new le().name(t.name??"Scaffolding.Coffee").description(t.description??"A simple scaffolding tool").version(t.version??"1.0.0","-v, --version","display the version number");e.addCommand(Z),e.parse()};me();
//# sourceMappingURL=index.js.map