import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReserveDialog } from './ReserveDialog';

jest.mock('@/components/client/AppDialog', () => {
  return {
    AppDialog: ({ open, children, description, titleId }: any) => (
      <div data-testid="app-dialog" data-open={open} data-description={description} data-title-id={titleId}>
        {open ? children : null}
      </div>
    )
  };
});

jest.mock('@/lib/site', () => ({
  asset: (path: string) => path
}));

describe('ReserveDialog', () => {
  it('opens dialog when clicking the trigger button', async () => {
    const user = userEvent.setup();
    render(<ReserveDialog offerId="week-1" />);

    expect(screen.getByTestId('app-dialog')).toHaveAttribute('data-open', 'false');
    await user.click(screen.getByRole('button', { name: /Reservar/ }));
    expect(screen.getByTestId('app-dialog')).toHaveAttribute('data-open', 'true');
    expect(screen.getByTestId('app-dialog')).toHaveAttribute('data-title-id', 'reserve-plan-week-1');
  });
});
