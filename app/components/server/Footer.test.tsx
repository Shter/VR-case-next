import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

jest.mock('@/lib/site', () => ({
  asset: (path: string) => path
}));

describe('Footer', () => {
  it('lists menu links and contact info', () => {
    render(<Footer />);
    expect(screen.getAllByText(/VR\.CASE/).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: /VR Buenos Aires/ })).toHaveAttribute('href', '/vr-buenos-aires');
    expect(screen.getByText(/Buenos Aires, Argentina/)).toBeInTheDocument();
  });
});
