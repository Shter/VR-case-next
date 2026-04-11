import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GamesGrid } from './GamesGrid';
import type { GameCatalogCopy, Game } from '@/types/allTypes';

jest.mock('./GameCard', () => ({
  GameCard: ({ game }: { game: Game }) => <div data-testid="game-card">{game.name ?? game.id}</div>
}));

const copy: GameCatalogCopy = {
  search: { label: '', placeholder: '' },
  genres: { label: '', allLabel: '', fallbackPrefix: '' },
  multiplayer: { label: '', options: [] },
  emptyState: 'Sin resultados',
  loadingLabel: 'Cargando…',
  fetchErrorMessage: '',
  pagination: {
    previousLabel: 'Anterior',
    nextLabel: 'Siguiente',
    pageStatusLabel: 'Página {current} de {total}',
    rangeLabel: 'Mostrando {from}-{to} de {total}',
    errorMessage: ''
  },
  card: { fallbackNamePrefix: '', fallbackCoverLabel: '', ctaLabel: '' }
};

describe('GamesGrid', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
      value: () => ({ height: 360, width: 0, top: 0, left: 0, right: 0, bottom: 0 }),
      configurable: true
    });
  });

  it('shows empty state when no games are available', () => {
    render(
      <GamesGrid
        games={[]}
        isLoading={false}
        isUiLoading={false}
        currentPage={1}
        totalPages={1}
        totalResults={0}
        pageSize={6}
        filtersQueryString=""
        onPageChangeAction={jest.fn()}
        detailBasePath="/juegos"
        copy={copy}
        previewsByGameId={{}}
        isPreviewLoading={false}
      />
    );

    expect(screen.getByText('Sin resultados')).toBeInTheDocument();
  });

  it('renders games and triggers pagination callbacks', async () => {
    const user = userEvent.setup();
    const onPageChangeAction = jest.fn();
    render(
      <GamesGrid
        games={[{ id: 1, name: 'Beat Saber' } as Game]}
        isLoading={false}
        isUiLoading={false}
        currentPage={1}
        totalPages={3}
        totalResults={10}
        pageSize={6}
        filtersQueryString=""
        onPageChangeAction={onPageChangeAction}
        detailBasePath="/juegos"
        copy={copy}
        previewsByGameId={{}}
        isPreviewLoading={false}
      />
    );

    expect(screen.getByTestId('game-card')).toHaveTextContent('Beat Saber');
    await user.click(screen.getByRole('button', { name: 'Siguiente' }));
    expect(onPageChangeAction).toHaveBeenCalledWith(2);
  });
});
