import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GameDetailsDialog } from './GameDetailsDialog';
import type { Game, GameDetailsCopy, Genre } from '@/types/allTypes';

jest.mock('@/components/client/AppDialog', () => ({
  AppDialog: ({ open, children, title }: any) => (
    <div data-testid="app-dialog" data-open={open}>
      <h2>{title}</h2>
      {open ? children : null}
    </div>
  )
}));

const copy: GameDetailsCopy = {
  fallbackNamePrefix: 'Juego',
  descriptionHeading: 'Descripción',
  descriptionPlaceholder: 'Sin descripción',
  controlsHeading: 'Controles',
  controlsPlaceholder: 'Sin datos',
  genreHeading: 'Género',
  genrePlaceholder: 'Sin género',
  genreFallbackPrefix: 'Género',
  playersHeading: 'Jugadores',
  playerCountUnknownLabel: 'Sin confirmar',
  multiplayerInstructionsHeading: 'Multijugador',
  multiplayerInstructionsPlaceholder: 'Consulta',
  closeLabel: 'Cerrar',
  backButtonLabel: 'Volver',
  errorDescription: 'Error',
  retryLabel: 'Reintentar',
  loadingLabel: 'Cargando'
};

const genres: Genre[] = [{ id: 1, name: 'Acción' }];

const game: Game = {
  id: 1,
  name: 'Beat Saber',
  description: 'Descripción',
  image_url: null,
  controls: 'Control',
  min_players: 1,
  max_players: 2,
  multiplayer_instructions: 'Sigue pasos',
  genre: [1],
  source_url: null
};

describe('GameDetailsDialog', () => {
  it('shows loading state when fetching data', () => {
    render(
      <GameDetailsDialog
        open
        game={null}
        isLoading
        error={null}
        copy={copy}
        genres={genres}
        onCloseAction={jest.fn()}
      />
    );
    expect(screen.getByText(copy.loadingLabel)).toBeInTheDocument();
  });

  it('renders error message with retry action', async () => {
    const user = userEvent.setup();
    const onRetry = jest.fn();
    render(
      <GameDetailsDialog
        open
        game={null}
        isLoading={false}
        error="No se pudo"
        copy={copy}
        genres={genres}
        onCloseAction={jest.fn()}
        onRetryAction={onRetry}
      />
    );

    await user.click(screen.getByRole('button', { name: copy.retryLabel }));
    expect(onRetry).toHaveBeenCalled();
  });

  it('displays game information with preview assets', () => {
    render(
      <GameDetailsDialog
        open
        game={game}
        isLoading={false}
        error={null}
        copy={copy}
        genres={genres}
        onCloseAction={jest.fn()}
        preview={{
          gameId: 1,
          posterUrl: 'poster.jpg',
          description: 'Preview',
          videoUrl: 'video.mp4',
          sourceUrl: 'https://meta.com',
          fetchedAt: '2024-01-01T00:00:00.000Z'
        }}
      />
    );

    expect(screen.getByText('Multijugador')).toBeInTheDocument();
    expect(screen.getByText(game.controls as string)).toBeInTheDocument();
  });
});
