import { existsSync } from 'fs'
import path from 'path'

import chalk from 'chalk'
import { Command } from 'commander'
import type { Config } from 'cosmiconfig'
import prompts from 'prompts'
import { z } from 'zod'

import { handlePackage } from '@/packages'
import { type tScaffoldAnswers } from '@/types/answers'
import { tFramework, tLanguage, tLibrary } from '@/types/registry'
import { isEmptyDir } from '@/utils/directory'
import { logger } from '@/utils/logger'
import { getRegistryFrameworks } from '@/utils/registry'
import { validatePackageName } from '@/validation/package-now'

const initOptionsSchema = z.object({
  cwd: z.string(),
  yes: z.boolean(),
  defaults: z.boolean(),
})

const usePrompts = async (
  cwd: string,
  defaultConfig: Config | null = null,
  skip = false,
): Promise<tScaffoldAnswers> => {
  const highlight = (text: string) => chalk.blueBright(text)

  const currentDir: string = cwd
  const currentDirName: string = currentDir?.split(/[\\/]/).pop() ?? ''
  let newDir = ''
  let newDirName = ''

  const updateState = (name: string): void => {
    if (name.trim() === '.') {
      newDir = currentDir
      newDirName = currentDirName
      return
    }

    newDir = `${currentDir}/${name}`
    newDirName = name
  }

  const frameworks: tFramework[] = await getRegistryFrameworks()

  if (skip) {
    return {
      name: defaultConfig?.name ?? 'my-app',
      overwrite: false,
      framework: frameworks[0].name,
      language: frameworks[0].languages[0].name,
      libraries: null,
    }
  }

  const options = await prompts([
    {
      type: 'text',
      name: 'name',
      message: `What is the ${highlight('name')} of your project?`,
      initial: defaultConfig?.name ?? 'my-app',
      validate: (value) =>
        validatePackageName(value, currentDirName) ||
        `Invalid project name: ${newDirName}`,
      onState: (state) => updateState(state.value),
    },
    {
      type: () => (!existsSync(newDir) || isEmptyDir(newDir) ? null : 'toggle'),
      name: 'overwrite',
      message: () =>
        (newDir === '.'
          ? 'Current directory'
          : `Target directory "${newDir}"`) +
        ` is not empty. Remove existing files and continue?`,
      active: 'yes',
      inactive: 'no',
      initial: true,
    },
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      type: (_, { overwrite } = {}) => {
        if (overwrite === false) {
          logger.error('Please choose an empty directory')
          process.exit(1)
        }
        return null
      },
      name: 'overwriteChecker',
    },
    {
      type: 'select',
      name: 'framework',
      message: `Which ${highlight('framework')} would you like to use?`,
      initial: defaultConfig?.framework ?? 0,
      choices: frameworks.map((item) => ({
        title: `${item.label}`,
        value: item,
      })),
    },
    {
      type: (framework) => (framework && framework.languages ? 'select' : null),
      name: 'language',
      message: `Which ${highlight('language')} would you like to use?`,
      initial: defaultConfig?.language ?? 0,
      choices: (framework) =>
        framework.languages.map((variant: tLanguage) => {
          return {
            title: variant.label,
            value: variant,
          }
        }),
    },
    {
      type: (language) => (language && language.libraries ? 'select' : null),
      name: 'libraries',
      message: `Which UI ${highlight('library')} would you like to use?`,
      initial: defaultConfig?.libraries ?? 0,
      choices: (language) => [
        ...language.libraries.map((item: tLibrary) => ({
          title: item.label,
          value: item.name,
        })),
        {
          title: 'None',
          value: null,
        },
      ],
    },
  ])

  return options
}

export const scaffold = new Command()
  .name('scaffold')
  .description('Scaffold a new project')
  .option('-y, --yes', 'skip confirmation prompt.', false)
  .option('-d, --defaults,', 'use default configuration.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .action(async (opts) => {
    const options = initOptionsSchema.parse(opts)
    const cwd = path.resolve(options.cwd)

    logger.welcome()

    const answers: tScaffoldAnswers = await usePrompts(cwd, null, options.yes)
    await handlePackage(cwd, answers)
  })
