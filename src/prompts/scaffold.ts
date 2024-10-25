import { tScaffoldAnswers } from '@/types/answers';
import type { Config } from 'cosmiconfig';

import chalk from 'chalk';
import type { tOption, tRegistry } from '@/types/registry';
import { getRegistryFrameworks } from '@/utils/registry';
import prompts from 'prompts';
import { validatePackageName } from '@/validation/scaffold';
import { existsSync, readdirSync } from 'fs';
import { logger } from '@/utils/logger';

export const useScaffoldPrompt = async  (
  cwd: string,
  defaultConfig: Config | null = null,
  skip = false,
): Promise<tScaffoldAnswers> => {
  const highlight = (text: string) => chalk.blueBright(text);

  const currentDirName: string = cwd.split(/[\\/]/).pop() ?? '';
  let newDir = cwd;
  let newDirName = currentDirName;

  const updateState = (name: string): void => {
    const trimmedName = name.trim();
    newDir = trimmedName && trimmedName !== '.' ? `${cwd}/${trimmedName}` : cwd;
    newDirName = trimmedName && trimmedName !== '.' ? trimmedName : currentDirName;
  };

  const registry: tRegistry = await getRegistryFrameworks();

  if (skip) {
    return {
      name: defaultConfig?.name ?? 'my-app',
      overwrite: false,
      framework: registry.frameworks[0].name,
      language: registry.frameworks[0].languages[0].name,
      styling: registry.styling[0].name,
      testing: registry.testing[0].name,
      ui: registry.ui[0].name,
      git: true,
      install: true,
    };
  }

  return await prompts([
    {
      type: 'text',
      name: 'name',
      message: `What is the ${highlight('name')} of your project?`,
      initial: defaultConfig?.name ? defaultConfig?.name ?? 'my-app' : 'my-app',
      validate: (name: string) =>  validatePackageName(name, currentDirName),
      onState: ({ value }) => updateState(value),
    },
    {
      type: () => (!existsSync(newDir) || !readdirSync(newDir)?.length ? null : 'toggle'),
      name: 'overwrite',
      message: () => (newDir === cwd ? 'Directory is not empty. Do you want to overwrite it?' : `Directory ${newDirName} is not empty. Do you want to overwrite it?`),
      active: 'yes',
      inactive: 'no',
      initial: defaultConfig?.overwrite ? defaultConfig?.overwrite ?? true : true,
    },
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      type: (_, { overwrite } = {}) => {
        if (overwrite === false) {
          logger.error('Please choose an empty directory');
          process.exit(1);
        }
        return null;
      },
      name: 'overwriteChecker',
    },
    {
      type: 'select',
      name: 'framework',
      message: `Choose a ${highlight('framework')} for your project`,
      choices: registry.frameworks.map((framework) => ({
        title: framework.label,
        value: framework,
      })),
      initial: defaultConfig?.framework?.name ? registry.frameworks.findIndex((framework) => framework.name === defaultConfig?.framework?.name) ?? 0 : 0,
    },
    {
      type: (framework) => (framework && framework.languages ? 'select' : null),
      name: 'language',
      message: `Choose a ${highlight('language')} for your project`,
      choices: (framework) => framework.languages.map((language: tOption) => ({
        title: language.label,
        value: language.name,
      })),
      initial: (framework) => defaultConfig?.language ? framework.languages.findIndex((language: tOption) => language.name === defaultConfig?.language) ?? 0 : 0,
    },
    {
      type: 'select',
      name: 'styling',
      message: `Choose a ${highlight('styling')} for your project`,
      choices: registry.styling.map((styling) => ({
        title: styling.label,
        value: styling.name,
      })),
      initial: defaultConfig?.styling ? registry.styling.findIndex((styling) => styling.name === defaultConfig?.styling) ?? 0 : 0,
    },
    {
      type: 'select',
      name: 'testing',
      message: `Choose a ${highlight('testing')} framework for your project`,
      choices: registry.testing.map((testing) => ({
        title: testing.label,
        value: testing.name,
      })),
      initial: defaultConfig?.testing ? registry.testing.findIndex((testing) => testing.name === defaultConfig?.testing) ?? 0 : 0,
    },
    {
      type: 'select',
      name: 'ui',
      message: `Choose a ${highlight('UI')} library for your project`,
      choices: registry.ui.map((ui) => ({
        title: ui.label,
        value: ui.name,
      })),
      initial: defaultConfig?.ui ? registry.ui.findIndex((ui) => ui.name === defaultConfig?.ui) ?? 0 : 0,
    },
    {
      type: 'toggle',
      name: 'git',
      message: `Initialize a ${highlight('git')} repository?`,
      initial: defaultConfig?.git ? defaultConfig?.git ?? true : true,
      active: 'Yes',
      inactive: 'No',
    },
    {
      type: 'toggle',
      name: 'install',
      message: `Install ${highlight('dependencies')} after scaffolding?`,
      initial: defaultConfig?.install ? defaultConfig?.install ?? true : true,
      active: 'Yes',
      inactive: 'No',
    }
  ]);
};