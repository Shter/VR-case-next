import { fetchPreviewForGame } from './previews';
import type { Game } from '@/types/allTypes';

jest.mock('@/lib/experiences/previews', () => ({
  fetchExperiencePreview: jest.fn()
}));

const mockFetchPreview = jest.mocked(
  require('@/lib/experiences/previews').fetchExperiencePreview
);

describe('fetchPreviewForGame', () => {
  const baseGame: Game = {
    id: 1,
    name: 'Sample',
    description: null,
    image_url: null,
    controls: null,
    min_players: null,
    max_players: null,
    multiplayer_instructions: null,
    genre: [],
    source_url: 'https://meta.com/game'
  };

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2024-02-01T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it('maps experience preview data', async () => {
    mockFetchPreview.mockResolvedValue({
      posterUrl: 'poster.jpg',
      description: 'desc',
      videoUrl: 'video.mp4',
      canonicalUrl: 'https://meta.com/canonical'
    });

    const result = await fetchPreviewForGame(baseGame);

    expect(result).toEqual({
      gameId: baseGame.id,
      posterUrl: 'poster.jpg',
      description: 'desc',
      videoUrl: 'video.mp4',
      sourceUrl: 'https://meta.com/canonical',
      fetchedAt: '2024-02-01T12:00:00.000Z'
    });
    expect(mockFetchPreview).toHaveBeenCalledWith('https://meta.com/game');
  });

  it('returns null on invalid game inputs', async () => {
    expect(await fetchPreviewForGame(null)).toBeNull();
    expect(await fetchPreviewForGame({ ...baseGame, source_url: '  ' })).toBeNull();
  });

  it('swallows errors from upstream fetching', async () => {
    mockFetchPreview.mockRejectedValue(new Error('boom'));

    await expect(fetchPreviewForGame(baseGame)).resolves.toBeNull();
  });
});
