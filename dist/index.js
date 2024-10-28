#!/usr/bin/env node
import{Command as oe}from"commander";import{z as P}from"zod";import{Command as Xt}from"commander";import d from"chalk";var l={error(...e){console.log(d.red(...e))},warn(...e){console.log(d.yellow(...e))},info(...e){console.log(d.cyan(...e))},success(...e){console.log(d.green(...e))},message(...e){console.log(d.visible(...e))},break(){console.log("")},welcome(){console.log(d.blueBright(`                                 
 _____         ___ ___     _   _ 
|   __|___ ___|  _|  _|___| |_| |
|__   |  _| .'|  _|  _| . | | . |
|_____|___|__,|_| |_| |___|_|___|
                                 `)),console.log("")}};import{resolve as rt,dirname as Yt}from"path";import{writeFileSync as qt,readFileSync as Kt,existsSync as Qt}from"fs";import{fileURLToPath as Ct}from"url";import xt from"chalk";import ft from"path";import{dirname as dt}from"path";import{fileURLToPath as gt}from"url";import at from"path";import{dirname as nt}from"path";import{fileURLToPath as ct}from"url";import lt from"fs";var mt=ct(import.meta.url),pt=nt(mt),g=async()=>{let e=at.join(pt,"..","package.json"),t=JSON.parse(await lt.readFileSync(e,"utf-8"));return{name:t.name||"Scaffold.Coffee",description:t.description||"A simple scaffolding tool",version:t.version||"1.0.0"}};import{promises as _}from"fs";var yt=gt(import.meta.url),ht=dt(yt),N=async e=>{let i=await(await fetch("https://registry.200.coffee/registry")).json();return await _.writeFile(e,JSON.stringify(i,null,2)),i},A=async()=>{let e,{version:t}=await g(),i=ft.join(ht,"/.",`registry-${t}.json`);if(await _.access(i).catch(async()=>(e=await N(i),e)),i){let r=await _.readFile(i,"utf-8");return e=JSON.parse(r),e}return e=await N(i),e};import wt from"prompts";import{string as T}from"yup";var Z=(e,t)=>e.trim()==="."?T().matches(/^[a-z0-9-]+$/).isValidSync(t):T().matches(/^[a-z0-9-]+$/).isValidSync(e);import{existsSync as ut,readdirSync as vt}from"fs";var F=async(e,t=null,i=!1)=>{var f;let r=s=>xt.blueBright(s),c=e.split(/[\\/]/).pop()??"",m=e,p=c,o=s=>{let a=s.trim();m=a&&a!=="."?`${e}/${a}`:e,p=a&&a!=="."?a:c},n=await A();return i?{name:(t==null?void 0:t.name)??"my-app",overwrite:!1,framework:n.frameworks[0].name,language:n.frameworks[0].languages[0].name,styling:n.styling[0].name,testing:n.testing[0].name,ui:n.ui[0].name,git:!0,install:!0}:await wt([{type:"text",name:"name",message:`What is the ${r("name")} of your project?`,initial:t!=null&&t.name?(t==null?void 0:t.name)??"my-app":"my-app",validate:s=>Z(s,c),onState:({value:s})=>o(s)},{type:()=>{var s;return!ut(m)||!((s=vt(m))!=null&&s.length)?null:"toggle"},name:"overwrite",message:()=>m===e?"Directory is not empty. Do you want to overwrite it?":`Directory ${p} is not empty. Do you want to overwrite it?`,active:"yes",inactive:"no",initial:t!=null&&t.overwrite?(t==null?void 0:t.overwrite)??!0:!0},{type:(s,{overwrite:a}={})=>(a===!1&&(l.error("Please choose an empty directory"),process.exit(1)),null),name:"overwriteChecker"},{type:"select",name:"framework",message:`Choose a ${r("framework")} for your project`,choices:n.frameworks.map(s=>({title:s.label,value:s})),initial:(f=t==null?void 0:t.framework)!=null&&f.name?n.frameworks.findIndex(s=>{var a;return s.name===((a=t==null?void 0:t.framework)==null?void 0:a.name)})??0:0},{type:s=>s&&s.languages?"select":null,name:"language",message:`Choose a ${r("language")} for your project`,choices:s=>s.languages.map(a=>({title:a.label,value:a.name})),initial:s=>t!=null&&t.language?s.languages.findIndex(a=>a.name===(t==null?void 0:t.language))??0:0},{type:"select",name:"styling",message:`Choose a ${r("styling")} for your project`,choices:n.styling.map(s=>({title:s.label,value:s.name})),initial:t!=null&&t.styling?n.styling.findIndex(s=>s.name===(t==null?void 0:t.styling))??0:0},{type:"select",name:"testing",message:`Choose a ${r("testing")} framework for your project`,choices:n.testing.map(s=>({title:s.label,value:s.name})),initial:t!=null&&t.testing?n.testing.findIndex(s=>s.name===(t==null?void 0:t.testing))??0:0},{type:"select",name:"ui",message:`Choose a ${r("UI")} library for your project`,choices:n.ui.map(s=>({title:s.label,value:s.name})),initial:t!=null&&t.ui?n.ui.findIndex(s=>s.name===(t==null?void 0:t.ui))??0:0},{type:"toggle",name:"git",message:`Initialize a ${r("git")} repository?`,initial:t!=null&&t.git?(t==null?void 0:t.git)??!0:!0,active:"Yes",inactive:"No"},{type:"toggle",name:"install",message:`Install ${r("dependencies")} after scaffolding?`,initial:t!=null&&t.install?(t==null?void 0:t.install)??!0:!0,active:"Yes",inactive:"No"}])};import Vt from"ora";import $ from"chalk";import{existsSync as St,mkdirSync as J,readdirSync as bt,rmSync as $t}from"fs";var y=async(e,t)=>{let i=t!=="."?`${e}/${t}`:e;return St(i)?(bt(i).length&&($t(i,{recursive:!0}),J(i)),i):(J(i),i)};import{promises as kt}from"fs";var h=async(e,t)=>{let i={};if(t.ui!=="none")switch(t.ui){case"shadcn-ui":i={$schema:"https://ui.shadcn.com/schema.json",style:"default",rsc:!0,tsx:t.language==="typescript",tailwind:{config:`tailwind.config.${t.language==="typescript"?"ts":"js"}`,css:`styles/globals.${t.styling==="css"?"css":"scss"}`,baseColor:"slate",cssVariables:!1},aliases:{components:"@/shadcn",utils:"@/shadcn/utils"}},await kt.writeFile(`${e}/components.json`,JSON.stringify(i,null,2));break;default:return}};import{promises as Pt}from"fs";var x=async e=>{let t=`# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

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
next-env.d.ts
`;await Pt.writeFile(`${e}/.gitignore`,t)};import{promises as _t}from"fs";var w=async(e,t)=>{let i=`${t?`/** @type {import('next').NextConfig} */
`:""}const nextConfig = {};

export default nextConfig;
`;await _t.writeFile(`${e}/next.config.mjs`,i)};import{promises as jt}from"fs";var u=async(e,t)=>{let r=(()=>{switch(t.testing){case"jest":return{test:"jest","test:watch":"jest --watchAll"};case"vitest":return{test:"vitest run","test:watch":"vitest --watch"};default:return null}})(),c={name:t.name||"nextjs-typescript-by-scaffold-coffee",version:"0.1.0",description:"Next.js project scaffolded by Scaffold.Coffee",private:!0,scripts:{build:"next build",dev:"next dev","dev:turbo":"next dev --turbo",start:"next start",lint:"next lint","lint:fix":"next lint --fix",...r||{}},dependencies:{clsx:"^2",geist:"^1",next:"^14","next-themes":"^0",react:"^18","react-dom":"^18"},devDependencies:{...t.testing==="vitest"?{"@testing-library/react":"^16"}:{},...t.language==="typescript"?{"@types/node":"^22","@types/react":"^18","@types/react-dom":"^18","@typescript-eslint/eslint-plugin":"^8","@typescript-eslint/parser":"^8"}:{},...t.testing==="vitest"?{"@vitejs/plugin-react":"^4"}:{},autoprefixer:"^10",eslint:"^8","eslint-config-next":"^14","eslint-config-prettier":"^9","eslint-formatter-pretty":"^6","eslint-plugin-import":"^2","eslint-plugin-prettier":"^5",...t.testing==="jest"?{jest:"^27"}:{},jsdom:"^21",postcss:"^8",prettier:"^3",...t.styling==="tailwindcss"?{"prettier-plugin-tailwindcss":"^0"}:{},...t.styling!=="css"?{sass:"^1"}:{},...t.styling==="tailwindcss"?{tailwindcss:"^3"}:{},...t.language==="typescript"?{typescript:"^5"}:{},...t.testing==="vitest"?{vite:"^5",vitest:"^2"}:{}}};await jt.writeFile(`${e}/package.json`,JSON.stringify(c,null,2))};import{promises as Nt}from"fs";var v=async(e,t)=>{let i=`module.exports = {
  plugins: {
    ${t?"tailwindcss: {},":""}
    autoprefixer: {},
  },
};`;await Nt.writeFile(`${e}/postcss.config.js`,i)};import{promises as At}from"fs";var S=async(e,t,i)=>{if(!t)return;let r=`${i?`import type { Config } from "tailwindcss";
    `:""}
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
`;await At.writeFile(`${e}/tailwind.config.${i?"ts":"js"}`,r)};import{promises as Tt}from"fs";var M=async e=>{let t=`/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
`;await Tt.writeFile(`${e}/next-env.d.ts`,t)};import{promises as Zt}from"fs";var L=async e=>{let t={compilerOptions:{allowJs:!0,esModuleInterop:!0,forceConsistentCasingInFileNames:!0,incremental:!0,isolatedModules:!0,jsx:"preserve",lib:["dom","dom.iterable","esnext"],module:"esnext",moduleResolution:"bundler",noEmit:!0,resolveJsonModule:!0,skipLibCheck:!0,strict:!0,plugins:[{name:"next"}],baseUrl:".",paths:{"@/*":["src/*"]}},exclude:["node_modules"],include:["next-env.d.ts","**/*.ts","**/*.tsx",".next/types/**/*.ts"]};await Zt.writeFile(`${e}/tsconfig.json`,JSON.stringify(t,null,2))};var H=async(e,t)=>{await u(e,t),await x(e),await M(e),await w(e,t.language==="typescript"),await v(e,t.styling==="tailwindcss"),await L(e),await S(e,t.styling==="tailwindcss",t.language==="typescript"),await h(e,t)};import{promises as Gt}from"fs";import{promises as Mt}from"fs";import{promises as Ft}from"fs";var I=async(e,t)=>{let i="";switch(t.styling){case"tailwindcss":i=`import { Branding } from "${t.language==="typescript"?"@/":"../"}ui/branding";

const Page = async ()${t.language==="typescript"?": Promise<JSX.Element>":""} => (
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

export default Page;`;break;default:i=`import { Branding } from "${t.language==="typescript"?"@/":"../"}ui/branding";

const Page = async ()${t.language==="typescript"?": Promise<JSX.Element>":""} => (
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

export default Page;`;break}await Ft.writeFile(`${e}/src/app/page.${t.language==="typescript"?"tsx":"jsx"}`,i)};import{promises as Jt}from"fs";var R=async(e,t)=>{let i="";switch(t.styling){case"tailwindcss":i=`import clsx from "clsx";
import { GeistSans } from "geist/font/sans";${t.language==="typescript"?`
import type { Metadata } from "next";`:""}

import "${t.language==="typescript"?"@/":"../"}styles/globals.scss";
import { Theme } from "${t.language==="typescript"?"@/":"../"}components/theme";
${t.language==="typescript"?`
interface Props {
  children: React.ReactNode;
}`:""}

export const metadata${t.language==="typescript"?": Metadata":""} = {
  title: {
    template: "%s | My Next.js Site",
    default: "My Next.js Site build with Scaffold.Coffee",
  },
};

const RootLayout = async ({ children }${t.language==="typescript"?": Props":""})${t.language==="typescript"?": Promise<JSX.Element>":""} => (
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

export default RootLayout;`;break;default:i=`import clsx from "clsx";
import { GeistSans } from "geist/font/sans";${t.language==="typescript"?`
import type { Metadata } from "next";`:""}

import "${t.language==="typescript"?"@/":"../"}styles/globals.${t.styling==="css"?"css":"scss"}";
import { Theme } from "${t.language==="typescript"?"@/":"../"}components/theme";
${t.language==="typescript"?`
interface Props {
  children: React.ReactNode;
}`:""}

export const metadata${t.language==="typescript"?": Metadata":""} = {
  title: {
    template: "%s | My Next.js Site",
    default: "My Next.js Site build with Scaffold.Coffee",
  },
};

const RootLayout = async ({ children }${t.language==="typescript"?": Props":""})${t.language==="typescript"?": Promise<JSX.Element>":""} => (
  <html lang="en" suppressHydrationWarning>
    <body className={GeistSans.className}>
      <Theme>{children}</Theme>
    </body>
  </html>
);

export default RootLayout;`;break}await Jt.writeFile(`${e}/src/app/layout.${t.language==="typescript"?"tsx":"jsx"}`,i)};var E=async(e,t)=>{await Mt.mkdir(`${e}/src/app`),await I(`${e}`,t),await R(`${e}`,t)};import{promises as Ht}from"fs";import{promises as Lt}from"fs";var O=async(e,t)=>{let i=`"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { useEffect } from "react";
${t.language==="typescript"?`
interface Props {
  children: React.ReactNode;
}`:""}

const ThemeWatcher = ()${t.language==="typescript"?": null":""} => {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const onMediaChange = ()${t.language==="typescript"?": void":""} => {
      const systemTheme = media.matches ? "dark" : "light";
      if (resolvedTheme === systemTheme) {
        setTheme("system");
      }
    };

    onMediaChange();
    media.addEventListener("change", onMediaChange);

    return ()${t.language==="typescript"?": void":""} => {
      media.removeEventListener("change", onMediaChange);
    };
  }, [resolvedTheme, setTheme]);

  return null;
};

const Theme = ({ children }${t.language==="typescript"?": Props":""})${t.language==="typescript"?": JSX.Element":""} => (
  <ThemeProvider attribute="class">
    <ThemeWatcher />
    {children}
  </ThemeProvider>
);

export { Theme };
`;await Lt.writeFile(`${e}/src/components/theme.${t.language==="typescript"?"tsx":"jsx"}`,i)};var B=async(e,t)=>{await Ht.mkdir(`${e}/src/components`),await O(`${e}`,t)};import{promises as Rt}from"fs";import{promises as It}from"fs";var D=async(e,t)=>{let i="";switch(t.styling){case"tailwindcss":i=`@tailwind base;
@tailwind components;
@tailwind utilities;
`;break;case"scss":i=`html, body {
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
`;break;default:i=`html, body {
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
`}await It.writeFile(`${e}/src/styles/${t.styling==="css"?"globals.css":"globals.scss"}`,i)};var U=async(e,t)=>{await Rt.mkdir(`${e}/src/styles`),await D(`${e}`,t)};import{promises as Et}from"fs";var z=async e=>{await Et.mkdir(`${e}/src/hooks`)};import{promises as Ot}from"fs";var G=async e=>{await Ot.mkdir(`${e}/src/layouts`)};import{promises as Bt}from"fs";var V=async e=>{await Bt.mkdir(`${e}/src/server`)};import{promises as Dt}from"fs";var W=async e=>{await Dt.mkdir(`${e}/src/types`)};import{promises as zt}from"fs";import{promises as Ut}from"fs";var X=async(e,t)=>{let i=`${t.language==="typescript"?`interface Props {
  width?: string;
  height?: string;
  className?: string;
}

`:""}const Branding = async ({
  width = "100",
  height = "58",
  className,
}${t.language==="typescript"?": Props":""})${t.language==="typescript"?": Promise<JSX.Element>":""} => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 100 58"
    className={className}
  >
    <path
      ${t.styling==="tailwind"?'className="fill-deep-cerulean-700"':'fill="116a93"'}
      d="M25.476 55.05c.747.813 2.34 2.543 2.748 2.95.723-.18 23.88-.523 33.375-.74 2.038-.046 4.091-.042 6.105-.39 2.738-.474 4.097-1.339 4.478-1.82H25.476Zm60.442-43.348c-2.36 0-4.714 1.289-5.596 1.933L79.1 8.344l8.954-1.425 5.495 1.12 4.172 3.663 1.017 6.614-4.477 9.972-12.922 11.6-14.755 6.614c.17-.747.672-2.402 1.323-3.053C93.957 31.442 93.55 19.232 93.55 18.316c.407-6.004-6.92-6.614-7.632-6.614Z"
    />
    <path
      ${t.styling==="tailwind"?'className="fill-iron-950 dark:fill-iron-50"':'fill="#25292c"'}
      d="M88.462 8.547c-3.256.082-6.309 1.527-7.428 2.239h-2.137c.136-.916.876-2.992 2.748-3.968 2.34-1.221 6.105-1.12 6.817-1.12 11.804.306 11.397 9.87 11.397 10.684-1.547 18.48-23.777 29.136-34.698 32.155.474-.848 1.465-2.748 1.628-3.562C97.118 33.615 97.112 17.3 97.112 16.391v-.008c-.713-7.428-7.53-7.836-8.65-7.836Zm-65.41 40.067 1.365-.119 2.908 4.927-3.442.416-.831-5.224Z"
    />
    <path
      ${t.styling==="tailwind"?'className="fill-deep-cerulean-700"':'fill="#116a93"'}
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
        ${t.styling==="tailwind"?'className="fill-iron-950 dark:fill-iron-50"':'fill="#25292c"'}
        d="M26.596 53.116c-.247-.586-1.66-3.253-5.341-9.362C13.122 30.26 8.155 15.846 7.059 0H83.17c-1.097 15.846-6.063 30.26-14.196 43.754-3.68 6.11-5.094 8.776-5.34 9.362 4.978-.209 13.65-.433 16.992-.083.712.075 1.182.176 1.323.308.284.266-.878.661-1.014.707l-.004.002c-.588.2-1.366.388-2.238.559-1.619.318-3.557.58-5.19.764-1.398.156-2.765.185-4.172.185H20.897c-1.406 0-2.773-.029-4.172-.185-1.632-.183-3.57-.446-5.19-.764-.87-.171-1.65-.36-2.238-.56h-.004c-.135-.047-1.297-.443-1.013-.708.141-.132.611-.233 1.323-.308 3.342-.35 12.014-.126 16.993.083Z"
      />
    </mask>
    <g mask="url(#a)">
      <path
        ${t.styling==="tailwind"?'className="fill-iron-950 dark:fill-iron-50"':'fill="#25292c"'}
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
        ${t.styling==="tailwind"?'className="fill-deep-cerulean-500"':'fill="#21a6d6"'}
        d="m48.066 31.544.305-6.92h6.309v6.92h-6.614Zm10.888 21.368-11.295-19.13H59.97v6.31h6.92l-5.902 12.82h-2.035Zm-2.24 0H46.032l1.424-16.28 9.26 16.28Zm-22.588 0-1.018-5.087h11.193l-.204 5.087h-9.971Zm-3.053-5.087h-4.58l1.833 5.087h3.866l-1.12-5.087Zm-1.221-23.811 3.052 21.775h11.804l1.628-21.775H29.852Zm-9.463 0h7.123l1.628 14.653-8.751-14.653Zm5.8 21.775-7.835-21.775 12.515 21.775h-4.68Zm20.554-24.014H29.648l-1.424-9.87h11.701v6.818h7.022l-.204 3.052ZM28.223 9.768h4.478V3.053h-5.19l.713 6.715Zm-1.017 12.007h-8.445L10.925 3.053H25.17l2.035 18.722Z"
      />
      <path
        ${t.styling==="tailwind"?'className="fill-deep-cerulean-700"':'fill="#116a93"'}
        d="M11.027 5.698h10.888l2.34 16.077 3.562.61-1.934-19.943-15.873-.509 1.017 3.765Zm19.028 0h-2.442l-.407.102-.407-3.256h6.512v7.428h-3.256V5.698Zm6.513 8.548v8.038l10.684.102.407-4.172-6.818-.407v-6.41l-13.024.305.508 2.442 8.243.102Zm-12.11 12.21h-3.052L19.473 23.2l8.344.102 1.628 6.919.102 8.954h-.611L26.9 36.326l-2.442-9.87Zm1.425 20.046-8.038-22.285v-1.933l10.48 17.705 3.46 6.31-5.902.203Zm15.772 3.358v3.358l2.646.101.814-5.901-12.72.101.815 2.34h8.445Zm-12.82 0h-2.341l-.712-2.239 5.698-.305 1.323 6.105-2.85.102-1.119-3.663Zm14.041-23.2H29.648l-.814-3.257 18.418.102-1.73 22.488h-4.07l1.424-19.333Zm8.14.61h-3.459l.712-3.561 7.021-.407.51 8.75-4.783.102V27.27Zm.916 25.948-5.189-9.87-.102-6.31.916-1.933 10.277 17.909-5.902.203Zm4.58-16.79h-7.734L47.761 34.8l-.713-1.628 13.025-.204 7.02 7.021-3.866 2.34h-6.716v-5.9Z"
      />
    </g>
    <path
      ${t.styling==="tailwind"?'className="fill-deep-cerulean-700"':'fill="#116a93"'}
      d="M8.28 15.06 4.617 5.902H.547l-.408-2.85h8.344L12.86 15.06H8.28Zm13.024 37.852L8.89 19.842H4.413l-2.442-2.747h11.193L25.68 52.912h-4.376Z"
    />
    <path
      ${t.styling==="tailwind"?'className="fill-iron-950 dark:fill-iron-50"':'fill="#25292c"'}
      d="M1.055 15.06h10.48l1.324 2.035H1.97l-.916-2.035ZM2.582 0h6.105l-.305 3.053H.139L2.582 0Z"
    />
  </svg>
);

export { Branding };`;await Ut.writeFile(`${e}/src/ui/branding.${t.language==="typescript"?"tsx":"jsx"}`,i)};var Y=async(e,t)=>{await zt.mkdir(`${e}/src/ui`),await X(`${e}`,t)};var b=async(e,t)=>{await Gt.mkdir(`${e}/src`),await E(`${e}`,t),await B(`${e}`,t),await z(`${e}`),await G(`${e}`),await V(`${e}`),await U(`${e}`,t),await W(`${e}`),await Y(`${e}`,t)};import{promisify as q}from"util";import{exec as K}from"child_process";var Q=async(e,t)=>{var m,p;let i=Vt(`Setting up ${$.blueBright("Next.js")} with ${$.blueBright("TypeScript")}`).start(),r=await y(e,t.name).catch(o=>{throw i.fail("Failed to create directory"),o});if(!r)throw i.fail("Failed to create directory"),new Error("Failed to create directory");let c={...t,name:(p=(m=r==null?void 0:r.split("/"))==null?void 0:m.pop())==null?void 0:p.trim()};if(await H(r,c).catch(o=>{throw i.fail("Failed to scaffold config"),o}),await b(r,c).catch(o=>{throw i.fail("Failed to scaffold src"),o}),t.install){i.text="Installing dependencies";let o=q(K),f=await(async()=>{try{return await o("yarn --version"),"yarn install"}catch{try{return await o("pnpm --version"),"pnpm install"}catch{try{return await o("bun --version"),"bun install"}catch{return"npm install"}}}})();await o(f,{cwd:r}),i.succeed("Dependencies installed"),t.git||l.message("")}if(t.git){let o=q(K);i.text="Initializing git",await o("git init",{cwd:r}),i.succeed("Git initialized"),l.message("")}i.succeed(`${$.blueBright("Next.js")} with ${$.blueBright("TypeScript")} setup complete`)};import Wt from"ora";import k from"chalk";var C=async(e,t)=>{await u(e,t),await x(e),await w(e,t.language==="typescript"),await v(e,t.styling==="tailwindcss"),await S(e,t.styling==="tailwindcss",t.language==="typescript"),await h(e,t)};import{promisify as tt}from"util";import{exec as et}from"child_process";var it=async(e,t)=>{var m,p;let i=Wt(`Setting up ${k.blueBright("Next.js")} with ${k.blueBright("JavaScript")}`).start(),r=await y(e,t.name).catch(o=>{throw i.fail("Failed to create directory"),o});if(!r)throw i.fail("Failed to create directory"),new Error("Failed to create directory");let c={...t,name:(p=(m=r==null?void 0:r.split("/"))==null?void 0:m.pop())==null?void 0:p.trim()};if(await C(r,c).catch(o=>{throw i.fail("Failed to scaffold config"),o}),await b(r,c).catch(o=>{throw i.fail("Failed to scaffold src"),o}),t.install){i.text="Installing dependencies";let o=tt(et),f=await(async()=>{try{return await o("yarn --version"),"yarn install"}catch{try{return await o("pnpm --version"),"pnpm install"}catch{try{return await o("bun --version"),"bun install"}catch{return"npm install"}}}})();await o(f,{cwd:r}),i.succeed("Dependencies installed"),t.git||l.message("")}if(t.git){let o=tt(et);i.text="Initializing git",await o("git init",{cwd:r}),i.succeed("Git initialized"),l.message("")}i.succeed(`${k.blueBright("Next.js")} with ${k.blueBright("JavaScript")} setup complete`)};var st=async(e,t)=>{var i;switch((i=t.framework)==null?void 0:i.name){case"nextjs":switch(t.language){case"typescript":await Q(e,t);break;default:await it(e,t)}break;default:l.error("Invalid framework provided."),process.exit(1)}};var te=Ct(import.meta.url),ee=Yt(te),ie=P.object({cwd:P.string(),yes:P.boolean(),defaults:P.boolean()}),j=rt(ee,"storedAnswers.json"),se=e=>{qt(j,JSON.stringify(e,null,2))},re=()=>{if(!Qt(j))return null;let e=Kt(j,"utf-8");return JSON.parse(e)},ot=new Xt().name("scaffold").description("Scaffold a new project").option("-y, --yes","skip confirmation prompt.",!1).option("-d, --defaults,","use default configuration.",!1).option("-c, --cwd <cwd>","the working directory. defaults to the current directory.",process.cwd()).action(async e=>{let t=ie.parse(e),i=t.cwd?rt(t.cwd):process.cwd();l.welcome();let r=re(),c=await F(i,r,t.yes);se(c),l.message(""),await st(i,c)});var ae=async()=>{let e=await g(),t=new oe().name(e.name||"Scaffold.Coffee").description(e.description||"A simple scaffolding CLI for generating your next project").version(e.version||"Unknown Version","-v, --version","display the version number");t.addCommand(ot),t.parse()};ae();
//# sourceMappingURL=index.js.map