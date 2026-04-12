import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GamesCatalogClient } from './GamesCatalogClient';
import type { Game, GameCatalogCopy, GameDetailsCopy } from '@/types/allTypes';

const mockFetchGameById = jest.fn();

jest.mock('@/lib/games/client', () => ({
  fetchGameClientById: (...args: unknown[]) => mockFetchGameById(...args)
}));

const preview = {
  gameId: '10',
  posterUrl: 'poster.jpg',
  description: 'desc',
  videoUrl: null,
  sourceUrl: null,
  fetchedAt: '2024-01-01T00:00:00.000Z'
};

const mockGameDetails = jest.fn((props: any) => (
  <div data-testid="modal" data-open={props.open}>
    {props.open ? props.game?.name : null}
  </div>
));

jest.mock('./GameDetailsDialog', () => ({
  GameDetailsDialog: (props: any) => mockGameDetails(props)
}));

const mockGameBrowser = jest.fn((props) => {
  props.onVisibleGamesChangeAction?.([{ id: '10', name: 'Beat Saber' } as Game]);
  return (
    <div>
      <button type="button" onClick={() => props.onPreviewsChangeAction?.({ '10': preview })}>previews</button>
      <button type="button" onClick={() => props.onGameCardNavigateAction?.({ id: '10', name: 'Beat Saber' } as Game, '/juegos/10', undefined)}>
        open-card
      </button>
      <button type="button" onClick={() => props.onFiltersQueryChangeAction?.('page=2')}>filters</button>
    </div>
  );
});

jest.mock('./GameBrowser', () => ({
  GameBrowser: (props: any) => mockGameBrowser(props)
}));

const copy: GameCatalogCopy = {
  search: { label: '', placeholder: '' },
  genres: { label: '', allLabel: '', fallbackPrefix: '' },
  multiplayer: { label: '', options: [] },
  emptyState: '',
  loadingLabel: '',
  fetchErrorMessage: '',
  pagination: { previousLabel: '', nextLabel: '', pageStatusLabel: '', rangeLabel: '', errorMessage: '' },
  card: { fallbackNamePrefix: '', fallbackCoverLabel: '', ctaLabel: '' }
};

const detailsCopy: GameDetailsCopy = {
  fallbackNamePrefix: 'Juego',
  descriptionHeading: '',
  descriptionPlaceholder: '',
  controlsHeading: '',
  controlsPlaceholder: '',
  genreHeading: '',
  genrePlaceholder: '',
  genreFallbackPrefix: 'Género',
  playersHeading: '',
  playerCountUnknownLabel: '',
  multiplayerInstructionsHeading: '',
  multiplayerInstructionsPlaceholder: '',
  closeLabel: '',
  backButtonLabel: '',
  errorDescription: 'Error',
  retryLabel: 'Retry',
  loadingLabel: ''
};

describe('GamesCatalogClient', () => {
  beforeEach(() => {
    mockGameBrowser.mockClear();
    mockGameDetails.mockClear();
    mockFetchGameById.mockResolvedValue({ id: '10', name: 'Loaded game' });
  });

  it('opens modal with selected game and previews', async () => {
    const user = userEvent.setup();
    render(
      <GamesCatalogClient
        initialGames={[{ id: 1, name: 'Existing' } as Game]}
        initialTotal={1}
        genres={[]}
        initialGenreIds={[]}
        initialMultiplayerFilter="all"
        initialSearchTerm=""
        initialQueryString=""
        copy={copy}
        detailsCopy={detailsCopy}
        detailBasePath="/juegos"
      />
    );

    await user.click(screen.getByText('previews'));
    await user.click(screen.getByText('filters'));
    await user.click(screen.getByText('open-card'));

    expect(mockGameDetails).toHaveBeenLastCalledWith(
      expect.objectContaining({
        open: true,
        game: expect.objectContaining({ name: 'Beat Saber' }),
        preview,
        backHref: '/juegos?page=2'
      })
    );
  });
});
