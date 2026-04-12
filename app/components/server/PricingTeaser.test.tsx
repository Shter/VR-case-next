import { render, screen } from '@testing-library/react';
import { PricingTeaser } from './PricingTeaser';

describe('PricingTeaser', () => {
  it('renders CTA link to pricing page', () => {
    render(<PricingTeaser />);
    expect(screen.getByRole('heading', { name: /Alquiler VR desde/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ver todos los precios/ })).toHaveAttribute('href', '/alquiler');
  });
});
