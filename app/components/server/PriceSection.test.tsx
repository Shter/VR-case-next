import { render, screen } from '@testing-library/react';
import { PriceSection } from './PriceSection';
import type { Offer } from '@/types/allTypes';

jest.mock('@/components/server/PriceCard', () => ({
  PriceCard: ({ offer }: { offer: Offer }) => <div data-testid="price-card">{offer.title}</div>
}));

describe('PriceSection', () => {
  it('renders all offers with a heading', () => {
    render(<PriceSection title="Planes" offers={[{ id: 'a', title: 'Plan A', headsets: 1, period: '2h', price: 1, rentLimit: '' }]} />);
    expect(screen.getByRole('heading', { name: 'Planes' })).toBeInTheDocument();
    expect(screen.getByTestId('price-card')).toHaveTextContent('Plan A');
  });
});
