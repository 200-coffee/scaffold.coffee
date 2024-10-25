import { logger } from './logger';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('logger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should log error messages in red', () => {
    logger.error('This is an error message');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('This is an error message'));
  });

  it('should log warning messages in yellow', () => {
    logger.warn('This is a warning message');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('This is a warning message'));
  });

  it('should log info messages in cyan', () => {
    logger.info('This is an info message');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('This is an info message'));
  });

  it('should log success messages in green', () => {
    logger.success('This is a success message');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('This is a success message'));
  });

  it('should log a line break', () => {
    logger.break();
    expect(console.log).toHaveBeenCalledWith('');
  });
});
