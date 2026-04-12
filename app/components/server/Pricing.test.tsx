import { render, screen } from '@testing-library/react';
import { Pricing } from './Pricing';

jest.mock('@/components/server/PriceSection', () => ({
  PriceSection: ({ title }: { title: string }) => <div role="region">{title}</div>
}));

jest.mock('@/app/constants', () => ({
  pricingItems: {
    twoHeadsets: [{ id: '1', title: '', headsets: 2, period: '2h', price: 1, rentLimit: '' }],
    oneHeadset: [{ id: '2', title: '', headsets: 1, period: '2h', price: 1, rentLimit: '' }]
  }
}));

describe('Pricing', () => {
  it('renders both pricing sections', () => {
    render(<Pricing />);
    const regions = screen.getAllByRole('region');
    expect(regions).toHaveLength(2);
  });
});
