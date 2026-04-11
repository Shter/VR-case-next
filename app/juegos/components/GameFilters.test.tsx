import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GameFilters } from './GameFilters';
import type { GameCatalogCopy, Genre } from '@/types/allTypes';

const copy: GameCatalogCopy = {
  search: { label: 'Buscar', placeholder: 'Ingresa', helperText: 'Ayuda' },
  genres: { label: 'Géneros', allLabel: 'Todos', fallbackPrefix: 'Género' },
  multiplayer: {
    label: 'Modalidad',
    options: [
      { value: 'all', label: 'Todo' },
      { value: 'multiplayer', label: 'Multi' }
    ]
  },
  emptyState: '',
  loadingLabel: '',
  fetchErrorMessage: '',
  pagination: {
    previousLabel: '',
    nextLabel: '',
    pageStatusLabel: '',
    rangeLabel: '',
    errorMessage: ''
  },
  card: { fallbackNamePrefix: '', fallbackCoverLabel: '', ctaLabel: '' }
};

const genres: Genre[] = [
  { id: 1, name: 'Acción' },
  { id: 2, name: '' }
];

describe('GameFilters', () => {
  it('updates search input and triggers handlers', async () => {
    const user = userEvent.setup();
    const onSearchChangeAction = jest.fn();
    const onToggleGenreAction = jest.fn();
    const onSelectMultiplayerFilterAction = jest.fn();

    render(
      <GameFilters
        genres={genres}
        selectedGenreIds={[1]}
        multiplayerFilter="all"
        searchValue=""
        onToggleGenreAction={onToggleGenreAction}
        onResetGenresAction={jest.fn()}
        onSelectMultiplayerFilterAction={onSelectMultiplayerFilterAction}
        onSearchChangeAction={onSearchChangeAction}
        copy={copy}
      />
    );

    await user.type(screen.getByLabelText('Buscar'), 'beat');
    expect(onSearchChangeAction).toHaveBeenLastCalledWith('beat');

    await user.click(screen.getByRole('button', { name: 'Acción' }));
    expect(onToggleGenreAction).toHaveBeenCalledWith(1);

    await user.click(screen.getByRole('button', { name: 'Multi' }));
    expect(onSelectMultiplayerFilterAction).toHaveBeenCalledWith('multiplayer');
  });
});
