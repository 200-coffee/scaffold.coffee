#!/usr/bin/env node

import { Command } from 'commander'

import { scaffold } from '@/commands/scaffold'
import { type tPackage } from '@/types/package'
import { getPackageInfo } from '@/utils/get-package-info'

const init = async (): Promise<void> => {
  const packageInfo: tPackage = await getPackageInfo()

  const program = new Command()
    .name(packageInfo.name ?? 'Scaffolding.Coffee')
    .description(packageInfo.description ?? 'A simple scaffolding tool')
    .version(
      packageInfo.version ?? '1.0.0',
      '-v, --version',
      'display the version number',
    )

  program.addCommand(scaffold)

  program.parse()
}

init()
