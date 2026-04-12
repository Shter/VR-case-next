import { GAME_CATALOG_COPY_JUEGOS, GAME_DETAILS_COPY_JUEGOS } from './gameCatalogCopy';

describe('game catalog copy', () => {
  it('contains localized labels for filters and pagination', () => {
    expect(GAME_CATALOG_COPY_JUEGOS.search.label).toBe('Buscar juegos');
    expect(GAME_CATALOG_COPY_JUEGOS.pagination.nextLabel).toBe('Siguiente');
    expect(GAME_CATALOG_COPY_JUEGOS.multiplayer.options).toEqual(
      expect.arrayContaining([expect.objectContaining({ value: 'multiplayer' })])
    );
  });

  it('defines default dialog copy for details', () => {
    expect(GAME_DETAILS_COPY_JUEGOS.fallbackNamePrefix).toContain('VR');
    expect(GAME_DETAILS_COPY_JUEGOS.playerCountUnknownLabel).toBe('Sin confirmar');
  });
});
