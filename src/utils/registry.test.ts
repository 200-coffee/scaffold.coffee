import { describe, expect, it } from 'vitest'

import { getRegistryFrameworks } from './registry'

describe('getRegistryFrameworks', () => {
  it('should return an array of frameworks', async () => {
    const frameworks = await getRegistryFrameworks()
    expect(Array.isArray(frameworks)).toBe(true)
  })

  it('should return frameworks with languages', async () => {
    const frameworks = await getRegistryFrameworks()
    frameworks.forEach((framework) => {
      expect(framework.languages.length).toBeGreaterThan(0)
    })
  })

  it('should return frameworks with valid names and labels', async () => {
    const frameworks = await getRegistryFrameworks()
    frameworks.forEach((framework) => {
      expect(typeof framework.name).toBe('string')
      expect(typeof framework.label).toBe('string')
    })
  })

  it('should return frameworks with valid languages', async () => {
    const frameworks = await getRegistryFrameworks()
    frameworks.forEach((framework) => {
      framework.languages.forEach((language) => {
        expect(typeof language.name).toBe('string')
        expect(typeof language.label).toBe('string')
      })
    })
  })

  it('should return frameworks with valid libraries in languages', async () => {
    const frameworks = await getRegistryFrameworks()
    frameworks.forEach((framework) => {
      framework.languages.forEach((language) => {
        language.libraries.forEach((library) => {
          expect(typeof library.name).toBe('string')
          expect(typeof library.label).toBe('string')
        })
      })
    })
  })
})
