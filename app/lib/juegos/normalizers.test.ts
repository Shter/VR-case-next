import { normalizeGame } from './normalizers';
import type { Game } from '@/types/allTypes';

describe('normalizeGame', () => {
  const rawGame: Game = {
    id: 5,
    name: '  Beat Saber  ',
    description: '***Incredible***',
    image_url: null,
    controls: '  Move arms  ',
    min_players: '2' as unknown as number,
    max_players: 4,
    multiplayer_instructions: '  Follow host  ',
    genre: ['1', 3] as unknown as number[],
    source_url: ' https://meta.com/game ',
    created_at: '2024-01-01T00:00:00Z'
  };

  it('sanitizes strings, numbers and genres consistently', () => {
    const result = normalizeGame(rawGame);

    expect(result).toMatchObject({
      id: 5,
      name: 'Beat Saber',
      description: '***Incredible***',
      controls: 'Move arms',
      min_players: 2,
      max_players: 4,
      multiplayer_instructions: 'Follow host',
      genre: [1, 3],
      source_url: 'https://meta.com/game',
      created_at: '2024-01-01T00:00:00Z'
    });
  });

  it('handles legacy image fields and nullish values', () => {
    const legacyGame = {
      ...rawGame,
      image_url: null,
      imageg_url: ' https://cdn.example/image.webp ',
      listing_url: ' https://listing ',
      max_players: 'not-a-number' as unknown as number,
      min_players: undefined
    };

    const result = normalizeGame(legacyGame as Game);

    expect(result.image_url).toBe('https://cdn.example/image.webp');
    expect(result.max_players).toBeNull();
    expect(result.min_players).toBeNull();
    expect(result.source_url).toBe('https://listing');
  });
});
