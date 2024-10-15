import chalk from 'chalk'
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest'

import { logger } from './logger'

describe('logger', () => {
  const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

  afterEach(() => {
    consoleLogSpy.mockClear()
  })

  afterAll(() => {
    consoleLogSpy.mockRestore()
  })

  it('should log error messages in red', () => {
    logger.error('Error message')
    expect(consoleLogSpy).toHaveBeenCalledWith(chalk.red('Error message'))
  })

  it('should log warning messages in yellow', () => {
    logger.warn('Warning message')
    expect(consoleLogSpy).toHaveBeenCalledWith(chalk.yellow('Warning message'))
  })

  it('should log info messages in cyan', () => {
    logger.info('Info message')
    expect(consoleLogSpy).toHaveBeenCalledWith(chalk.cyan('Info message'))
  })

  it('should log success messages in green', () => {
    logger.success('Success message')
    expect(consoleLogSpy).toHaveBeenCalledWith(chalk.green('Success message'))
  })

  it('should log general messages with visible chalk', () => {
    logger.message('General message')
    expect(consoleLogSpy).toHaveBeenCalledWith(chalk.visible('General message'))
  })

  it('should log a break line', () => {
    logger.break()
    expect(consoleLogSpy).toHaveBeenCalledWith('')
  })

  it('should log the welcome message in blue', () => {
    logger.welcome()
    expect(consoleLogSpy).toHaveBeenCalledWith(
      chalk.blueBright(`                                 
 _____         ___ ___     _   _ 
|   __|___ ___|  _|  _|___| |_| |
|__   |  _| .'|  _|  _| . | | . |
|_____|___|__,|_| |_| |___|_|___|
                                 `),
    )
    expect(consoleLogSpy).toHaveBeenCalledWith('')
  })
})
