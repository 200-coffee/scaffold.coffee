import { existsSync, mkdirSync, rmSync } from 'fs'
import { join } from 'path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createDirectory, isEmptyDir } from './directory'
const testDir = join(__dirname, 'test-dir')

beforeEach(() => {
  if (!existsSync(testDir)) {
    mkdirSync(testDir)
  }
})

afterEach(() => {
  if (existsSync(testDir)) {
    rmSync(testDir, { recursive: true })
  }
})

describe('isEmptyDir', () => {
  it('should return true for an empty directory', () => {
    expect(isEmptyDir(testDir)).toBe(true)
  })

  it('should return false for a non-empty directory', () => {
    const filePath = join(testDir, 'file.txt')
    mkdirSync(filePath)
    expect(isEmptyDir(testDir)).toBe(false)
  })
})

describe('createDirectory', () => {
  it('should create a new directory if it does not exist', async () => {
    const newDir = join(testDir, 'new-dir')
    const result = await createDirectory(testDir, 'new-dir')
    expect(result).toBe(newDir)
    expect(existsSync(newDir)).toBe(true)
  })

  it('should return the existing directory if it already exists and is empty', async () => {
    const result = await createDirectory(testDir, 'test-dir')
    expect(result).toBe(testDir)
    expect(existsSync(testDir)).toBe(true)
  })

  it('should recreate the directory if it already exists and is not empty', async () => {
    const filePath = join(testDir, 'file.txt')
    mkdirSync(filePath)
    const result = await createDirectory(testDir, 'test-dir')
    expect(result).toBe(testDir)
    expect(existsSync(testDir)).toBe(true)
    expect(isEmptyDir(testDir)).toBe(true)
  })
})
