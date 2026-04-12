import { formatPlayerCountLabel, isMultiplayerGame } from './playerCounts';
import type { Game, GameDetailsCopy } from '@/types/allTypes';

const copy: GameDetailsCopy = {
  fallbackNamePrefix: 'Juego',
  descriptionHeading: '',
  descriptionPlaceholder: '',
  controlsHeading: '',
  controlsPlaceholder: '',
  genreHeading: '',
  genrePlaceholder: '',
  genreFallbackPrefix: 'Género',
  playersHeading: '',
  playerCountUnknownLabel: 'Sin datos',
  multiplayerInstructionsHeading: '',
  multiplayerInstructionsPlaceholder: '',
  closeLabel: '',
  backButtonLabel: '',
  errorDescription: '',
  retryLabel: '',
  loadingLabel: ''
};

describe('isMultiplayerGame', () => {
  it('detects multiplayer via min or max players', () => {
    expect(isMultiplayerGame({ min_players: 1, max_players: 3 } as Game)).toBe(true);
    expect(isMultiplayerGame({ min_players: 2, max_players: 1 } as Game)).toBe(true);
    expect(isMultiplayerGame({ min_players: 1, max_players: 1 } as Game)).toBe(false);
    expect(isMultiplayerGame(null)).toBe(false);
  });
});

describe('formatPlayerCountLabel', () => {
  it('formats identical counts as a single number', () => {
    expect(formatPlayerCountLabel({ min_players: 2, max_players: 2 } as Game, copy)).toBe('2');
  });

  it('renders ranges and fallbacks', () => {
    expect(formatPlayerCountLabel({ min_players: 2, max_players: 4 } as Game, copy)).toBe('2-4');
    expect(formatPlayerCountLabel({ min_players: null, max_players: 3 } as Game, copy)).toBe('3');
    expect(formatPlayerCountLabel({ min_players: 3, max_players: null } as Game, copy)).toBe('3+');
    expect(formatPlayerCountLabel({ min_players: null, max_players: null } as Game, copy)).toBe(copy.playerCountUnknownLabel);
  });
});
