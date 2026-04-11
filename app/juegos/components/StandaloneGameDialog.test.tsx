import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StandaloneGameDialog } from './StandaloneGameDialog';
import type { StandaloneGameDialogProps } from '@/types/allTypes';

const mockGameDetails = jest.fn((props: any) => (
  <div>
    <button type="button" onClick={props.onCloseAction}>Close</button>
    {props.open ? <span data-testid="open">open</span> : null}
  </div>
));

jest.mock('./GameDetailsDialog', () => ({
  GameDetailsDialog: (props: StandaloneGameDialogProps) => mockGameDetails(props)
}));

describe('StandaloneGameDialog', () => {
  beforeEach(() => {
    mockGameDetails.mockClear();
  });

  it('closes dialog when handleClose is triggered', async () => {
    const user = userEvent.setup();
    render(
      <StandaloneGameDialog
        game={{ id: 'x' } as any}
        copy={{ fallbackNamePrefix: 'Juego' } as any}
        backHref="/juegos"
        genres={[]}
      />
    );

    expect(screen.getByTestId('open')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(mockGameDetails).toHaveBeenLastCalledWith(expect.objectContaining({ open: false }));
  });
});
