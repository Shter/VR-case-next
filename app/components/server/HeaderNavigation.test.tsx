import { render, screen } from '@testing-library/react';
import { HeaderNavigation } from './HeaderNavigation';
import type { NavItem } from '@/types/allTypes';

const items: NavItem[] = [
  { href: '/', label: 'Principal' },
  { href: '/vr-buenos-aires', label: 'VR Buenos Aires' }
];

describe('HeaderNavigation', () => {
  it('renders links with the requested orientation', () => {
    const { rerender } = render(<HeaderNavigation items={items} orientation="vertical" />);
    const list = screen.getByRole('list');
    expect(list.className).toContain('flex-col');

    rerender(<HeaderNavigation items={items} orientation="horizontal" />);
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });
});
