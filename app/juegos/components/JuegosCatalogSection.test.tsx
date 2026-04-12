import { render, screen } from '@testing-library/react';
import { JuegosCatalogSection } from './JuegosCatalogSection';
import type { GameCatalogCopy, GameDetailsCopy, GamesCatalogClientProps } from '@/types/allTypes';

jest.mock('@/app/juegos/components/GamesCatalogClient', () => ({
  GamesCatalogClient: (props: GamesCatalogClientProps) => (
    <div data-testid="client" data-games={props.initialGames.length} />
  )
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
  errorDescription: '',
  retryLabel: '',
  loadingLabel: ''
};

describe('JuegosCatalogSection', () => {
  it('wraps catalog client with heading', () => {
    render(
      <JuegosCatalogSection
        initialGames={[{ id: 1 } as any]}
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

    expect(screen.getByRole('heading', { name: /Catálogo de juegos/i })).toBeInTheDocument();
    expect(screen.getByTestId('client')).toHaveAttribute('data-games', '1');
  });
});
