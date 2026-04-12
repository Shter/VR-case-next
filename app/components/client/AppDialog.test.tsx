import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppDialog } from './AppDialog';

describe('AppDialog', () => {
  it('renders title, description and actions', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <AppDialog
        open
        onCloseAction={onClose}
        title="Dialog title"
        description="Dialog description"
        actions={<button type="button">Action</button>}
      >
        <div>Body</div>
      </AppDialog>
    );

    expect(screen.getByRole('heading', { name: 'Dialog title' })).toBeInTheDocument();
    expect(screen.getByText('Dialog description')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Cerrar' }));
    expect(onClose).toHaveBeenCalled();
  });
});
