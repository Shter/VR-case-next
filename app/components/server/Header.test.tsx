import { render, screen } from '@testing-library/react';
import { Header } from './Header';

jest.mock('@/lib/site', () => ({ asset: (path: string) => path }));

jest.mock('@/components/server/HeaderNavigation', () => ({
  HeaderNavigation: () => <nav data-testid="nav" />
}));

jest.mock('@/components/client/HeaderMenu', () => ({
  HeaderMenu: () => <div data-testid="menu" />
}));

jest.mock('@/app/constants', () => ({
  navItems: [{ href: '/', label: 'Principal' }]
}));

describe('Header', () => {
  it('renders logo and navigation', () => {
    render(<Header />);
    expect(screen.getByAltText('VR.CASE')).toBeInTheDocument();
    expect(screen.getByTestId('nav')).toBeInTheDocument();
    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });
});
