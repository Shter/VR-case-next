import { fetchGenres, fetchGamesPage, getGameById } from './queries';
import { MULTIPLAYER_FILTER_EXPRESSION } from '@/lib/juegos/playerCounts';

jest.mock('@/lib/supabase/client', () => ({
  supabaseClient: {
    from: jest.fn()
  }
}));

jest.mock('@/lib/juegos/normalizers', () => ({
  normalizeGame: (game: unknown) => ({ ...game, normalized: true })
}));

const { supabaseClient } = require('@/lib/supabase/client');

type BuilderResponse = { data?: unknown; error?: Error | null; count?: number | null };

type Builder = {
  select: jest.Mock;
  order: jest.Mock;
  range: jest.Mock;
  overlaps: jest.Mock;
  or: jest.Mock;
  ilike: jest.Mock;
  eq: jest.Mock;
  maybeSingle: jest.Mock;
  then: (resolve: (value: any) => any, reject?: (reason: unknown) => any) => Promise<any>;
};

const createBuilder = (response: BuilderResponse): Builder => {
  const builder: Partial<Builder> = {};
  const chain = () => builder as Builder;
  builder.select = jest.fn(chain);
  builder.order = jest.fn(chain);
  builder.range = jest.fn(chain);
  builder.overlaps = jest.fn(chain);
  builder.or = jest.fn(chain);
  builder.ilike = jest.fn(chain);
  builder.eq = jest.fn(chain);
  builder.maybeSingle = jest.fn(() => Promise.resolve(response));
  builder.then = (resolve, reject) => Promise.resolve(response).then(resolve, reject as any);
  return builder as Builder;
};

describe('games queries', () => {
  beforeEach(() => {
    supabaseClient.from.mockReset();
  });

  it('fetches and normalizes genres', async () => {
    const builder = createBuilder({ data: [{ id: '2', name: ' Beta ' }, { id: 1, name: '' }], error: null });
    supabaseClient.from.mockReturnValue(builder);

    const genres = await fetchGenres();

    expect(supabaseClient.from).toHaveBeenCalledWith('genres');
    expect(builder.select).toHaveBeenCalledWith('id, name');
    expect(builder.order).toHaveBeenCalledWith('name', { ascending: true });
    expect(genres).toEqual([
      { id: 2, name: 'Beta' },
      { id: 1, name: 'Género #1' }
    ]);
  });

  it('builds paginated queries with filters applied', async () => {
    const builder = createBuilder({ data: [{ id: 1 }], error: null, count: 5 });
    supabaseClient.from.mockReturnValue(builder);

    const { games, total } = await fetchGamesPage({
      genreIds: [1, 2],
      multiplayerFilter: 'multiplayer',
      searchTerm: 'quest'
    }, 6, 2);

    expect(builder.range).toHaveBeenCalledWith(6, 11);
    expect(builder.overlaps).toHaveBeenCalledWith('genre', [1, 2]);
    expect(builder.or).toHaveBeenCalledWith(MULTIPLAYER_FILTER_EXPRESSION);
    expect(builder.ilike).toHaveBeenCalledWith('name', '%quest%');
    expect(games[0]).toHaveProperty('normalized', true);
    expect(total).toBe(5);
  });

  it('fetches game by id and caches result', async () => {
    const firstBuilder = createBuilder({ data: { id: 'slug' }, error: null });
    supabaseClient.from.mockReturnValue(firstBuilder);

    const result = await getGameById('slug');
    expect(result).toHaveProperty('normalized', true);
    const cachedResult = await getGameById('slug');
    expect(cachedResult).toEqual(result);
  });

  it('falls back to numeric lookup when string ids fail', async () => {
    const missBuilder = createBuilder({ data: null, error: null });
    const fallbackBuilder = createBuilder({ data: { id: 42 }, error: null });
    supabaseClient.from
      .mockReturnValueOnce(missBuilder)
      .mockReturnValueOnce(fallbackBuilder);

    const result = await getGameById('42.0');
    expect(result).toHaveProperty('id', 42);
    expect(supabaseClient.from).toHaveBeenCalledTimes(2);
  });
});
