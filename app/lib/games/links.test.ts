import { buildGameDetailHref, buildGamesListHref } from './links';

describe('buildGameDetailHref', () => {
  it('combines base path, id and query string', () => {
    expect(buildGameDetailHref('/juegos', 5, 'page=2')).toBe('/juegos/5?page=2');
    expect(buildGameDetailHref('', 'hello world')).toBe('/hello%20world');
  });
});

describe('buildGamesListHref', () => {
  it('normalizes base paths', () => {
    expect(buildGamesListHref('/juegos/', 'page=2')).toBe('/juegos?page=2');
    expect(buildGamesListHref('', undefined)).toBe('/');
  });
});
