import { handleNextTypescript } from './next-ts'

import { type tScaffoldAnswers } from '@/types/answers'
import { logger } from '@/utils/logger'

export const handlePackage = async (
  cwd: string,
  answers: tScaffoldAnswers,
): Promise<void> => {
  logger.message('')
  // logger.message(
  //   `Scaffolding project with ${answers.framework?.label}, ${answers.language?.label}, and ${answers.libraries || 'no library'}.`,
  // )

  switch (answers.framework?.name) {
    case 'nextjs':
      switch (answers.language?.name) {
        case 'typescript':
          await handleNextTypescript(cwd, answers)
          break
        case 'javascript':
          logger.message('Scaffolding Next.js with JavaScript.')
          break
        default:
          logger.error('Invalid language provided.')
      }
      break
    default:
      logger.error('Invalid framework provided.')
      process.exit(1)
  }
}
