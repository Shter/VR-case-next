import { render, screen } from '@testing-library/react';
import { Contact } from './Contact';

jest.mock('@/lib/site', () => ({
  asset: (path: string) => path
}));

describe('Contact', () => {
  it('renders CTA buttons for WhatsApp and Instagram', () => {
    render(<Contact />);
    expect(screen.getByRole('heading', { name: /Hablemos/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contactar por WhatsApp/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contactar por Instagram/i })).toBeInTheDocument();
  });
});
