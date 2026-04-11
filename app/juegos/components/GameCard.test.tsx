import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GameCard } from './GameCard';
import type { GameCatalogCopy, Game } from '@/types/allTypes';

const copy: GameCatalogCopy = {
  search: { label: '', placeholder: '' },
  genres: { label: '', allLabel: '', fallbackPrefix: 'Género' },
  multiplayer: { label: '', options: [] },
  emptyState: '',
  loadingLabel: '',
  fetchErrorMessage: '',
  pagination: {
    previousLabel: 'Prev',
    nextLabel: 'Next',
    pageStatusLabel: '',
    rangeLabel: '',
    errorMessage: ''
  },
  card: {
    fallbackNamePrefix: 'Juego',
    fallbackCoverLabel: 'Sin imagen',
    ctaLabel: 'Ver detalles'
  }
};

const baseGame: Game = {
  id: 1,
  name: null,
  description: null,
  image_url: null,
  controls: null,
  min_players: null,
  max_players: null,
  multiplayer_instructions: null,
  genre: [],
  source_url: null
};

describe('GameCard', () => {
  it('renders fallback content when missing data', () => {
    render(
      <GameCard
        game={baseGame}
        queryString="page=1"
        detailBasePath="/juegos"
        copy={copy}
      />
    );

    expect(screen.getByRole('heading', { name: 'Juego 1' })).toBeInTheDocument();
    expect(screen.getByText('Sin imagen')).toBeInTheDocument();
  });

  it('calls navigation handler when clicking card', async () => {
    const onNavigateAction = jest.fn();
    const user = userEvent.setup();
    render(
      <GameCard
        game={{ ...baseGame, id: 'abc', name: 'Game' }}
        queryString=""
        detailBasePath="/juegos"
        copy={copy}
        onNavigateAction={onNavigateAction}
      />
    );

    await user.click(screen.getByRole('link'));
    expect(onNavigateAction).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'abc' }),
      '/juegos/abc',
      expect.any(Object)
    );
  });
});
