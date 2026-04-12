import {
  areFiltersEqual,
  areGenreListsEqual,
  buildCatalogQueryString,
  buildFiltersQueryString,
  normalizeLegacyShowMultiplayer,
  parseGenreIdsParam,
  parseMultiplayerParam,
  parsePageParam,
  parseSearchParam
} from './filters';
import type { GameFiltersState } from '@/types/allTypes';

describe('parseGenreIdsParam', () => {
  it('converts comma separated values into sorted unique numbers', () => {
    const result = parseGenreIdsParam(['1,2', '3', '2', 'abc', '']);
    expect(result).toEqual([1, 2, 3]);
  });

  it('returns empty array for invalid input', () => {
    expect(parseGenreIdsParam(undefined)).toEqual([]);
  });
});

describe('parseMultiplayerParam', () => {
  it.each([
    { raw: 'true', expected: 'multiplayer' },
    { raw: '1', expected: 'multiplayer' },
    { raw: 'false', expected: 'solo' },
    { raw: '0', expected: 'solo' },
    { raw: 'unknown', expected: 'all' },
    { raw: undefined, expected: 'all' }
  ])('returns $expected for $raw', ({ raw, expected }) => {
    expect(parseMultiplayerParam(raw as string | undefined)).toBe(expected);
  });
});

describe('buildFiltersQueryString', () => {
  it('serializes filters while omitting defaults', () => {
    const filters: GameFiltersState = {
      genreIds: [5, 2, 4],
      multiplayerFilter: 'multiplayer',
      searchTerm: '  beat saber '
    };

    expect(buildFiltersQueryString(filters)).toBe('genres=2%2C4%2C5&multiplayer=true&search=beat+saber');
  });

  it('omits optional params when empty', () => {
    const filters: GameFiltersState = {
      genreIds: [],
      multiplayerFilter: 'all',
      searchTerm: 'a'
    };

    expect(buildFiltersQueryString(filters)).toBe('');
  });
});

describe('buildCatalogQueryString', () => {
  it('adds page parameter when greater than 1', () => {
    const filters: GameFiltersState = {
      genreIds: [1],
      multiplayerFilter: 'solo',
      searchTerm: 'quest'
    };

    expect(buildCatalogQueryString(filters, 3)).toBe('genres=1&multiplayer=false&search=quest&page=3');
  });

  it('removes page when equal to 1', () => {
    const filters: GameFiltersState = {
      genreIds: [1],
      multiplayerFilter: 'all',
      searchTerm: 'quest'
    };

    expect(buildCatalogQueryString(filters, 1)).toBe('genres=1&search=quest');
  });
});

describe('equality helpers', () => {
  it('compares sorted genre lists', () => {
    expect(areGenreListsEqual([1, 2], [1, 2])).toBe(true);
    expect(areGenreListsEqual([2, 1], [1, 2])).toBe(false);
  });

  it('compares entire filter objects', () => {
    const a: GameFiltersState = { genreIds: [1], multiplayerFilter: 'all', searchTerm: 'abc' };
    const b: GameFiltersState = { genreIds: [1], multiplayerFilter: 'all', searchTerm: 'abc' };
    const c: GameFiltersState = { genreIds: [2], multiplayerFilter: 'all', searchTerm: 'abc' };

    expect(areFiltersEqual(a, b)).toBe(true);
    expect(areFiltersEqual(a, c)).toBe(false);
  });
});

describe('normalizeLegacyShowMultiplayer', () => {
  it('only normalizes explicit false values', () => {
    expect(normalizeLegacyShowMultiplayer('0')).toBe('false');
    expect(normalizeLegacyShowMultiplayer('false')).toBe('false');
    expect(normalizeLegacyShowMultiplayer('true')).toBeUndefined();
    expect(normalizeLegacyShowMultiplayer(undefined)).toBeUndefined();
  });
});

describe('parseSearchParam', () => {
  it('trims and validates minimum length', () => {
    expect(parseSearchParam('  ab  ')).toBe('ab');
    expect(parseSearchParam('c')).toBe('');
  });
});

describe('parsePageParam', () => {
  it('parses positive integers and falls back otherwise', () => {
    expect(parsePageParam('5')).toBe(5);
    expect(parsePageParam('-1', 2)).toBe(2);
    expect(parsePageParam(undefined, 3)).toBe(3);
  });
});
