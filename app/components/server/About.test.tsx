import { render, screen } from '@testing-library/react';
import { About } from './About';

jest.mock('@/lib/site', () => ({
  asset: (path: string) => path
}));

describe('About section', () => {
  it('includes heading and CTA link', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: /Alquiler de realidad virtual/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Revisá los planes/i })).toHaveAttribute('href', '/alquiler');
  });
});
