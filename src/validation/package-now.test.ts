import { describe, expect, it } from 'vitest';

import { validatePackageName } from './package-now';

describe('validatePackageName', () => {
  it('should return true for valid package names', () => {
    expect(validatePackageName('valid-name', 'default')).toBe(true);
    expect(validatePackageName('another-valid-name', 'default')).toBe(true);
    expect(validatePackageName('valid123', 'default')).toBe(true);
  });

  it('should return false for invalid package names', () => {
    expect(validatePackageName('InvalidName', 'default')).toBe(false);
    expect(validatePackageName('invalid_name', 'default')).toBe(false);
    expect(validatePackageName('invalid.name', 'default')).toBe(false);
    expect(validatePackageName('invalid@name', 'default')).toBe(false);
  });

  it('should return true for default name when name is "."', () => {
    expect(validatePackageName('.', 'default')).toBe(true);
    expect(validatePackageName('.', 'valid-default')).toBe(true);
  });

  it('should return false for invalid default name when name is "."', () => {
    expect(validatePackageName('.', 'InvalidDefault')).toBe(false);
    expect(validatePackageName('.', 'invalid_default')).toBe(false);
  });
});
