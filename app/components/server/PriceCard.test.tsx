import { render, screen } from '@testing-library/react';
import { PriceCard } from './PriceCard';
import type { Offer } from '@/types/allTypes';
import { hourlyRentalNotice } from '@/app/constants';

jest.mock('@/components/client/ReserveDialog', () => ({
  ReserveDialog: () => <div data-testid="reserve-dialog" />
}));

describe('PriceCard', () => {
  const baseOffer: Offer = {
    id: '2h-1',
    headsets: 1,
    period: '2h',
    price: 25000,
    rentLimit: '2 horas',
    title: 'VR por 2 horas',
    plusPrice: 9000,
    plusUnit: 'hora'
  };

  it('renders pricing details and hourly notice', () => {
    render(<PriceCard offer={baseOffer} />);
    expect(screen.getByText((content) => content.includes('El alquiler por horas es válido'))).toBeInTheDocument();
    expect(screen.getByTestId('reserve-dialog')).toBeInTheDocument();
  });

  it('hides notice for non-hourly plans', () => {
    render(<PriceCard offer={{ ...baseOffer, period: 'day' }} />);
    expect(screen.queryByText(hourlyRentalNotice)).not.toBeInTheDocument();
  });
});
