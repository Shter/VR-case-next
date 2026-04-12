import { toGameCacheKey } from './cache';

describe('toGameCacheKey', () => {
  it('decodes URI components and coerces to string', () => {
    expect(toGameCacheKey('hello%20world')).toBe('hello world');
    expect(toGameCacheKey(42)).toBe('42');
  });
});
