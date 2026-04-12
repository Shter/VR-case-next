import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HeaderMenu } from './HeaderMenu';
import type { NavItem } from '@/types/allTypes';

const items: NavItem[] = [
  { href: '/', label: 'Principal' },
  { href: '/juegos', label: 'Juegos' }
];

const mockUseClickAway = jest.fn();

jest.mock('@/lib/hooks/useClickAway', () => ({
  __esModule: true,
  default: (...args: unknown[]) => mockUseClickAway(...args)
}));

describe('HeaderMenu', () => {
  beforeEach(() => {
    mockUseClickAway.mockClear();
  });

  it('toggles mobile navigation and closes on link click', async () => {
    const user = userEvent.setup();
    render(<HeaderMenu items={items} />);

    const toggle = screen.getByRole('button', { name: /Abrir menú/i });
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('link', { name: 'Juegos' }));
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(mockUseClickAway).toHaveBeenCalled();
  });
});
