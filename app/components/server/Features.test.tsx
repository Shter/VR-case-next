import { render, screen } from '@testing-library/react';
import { Features } from './Features';

jest.mock('@/app/constants', () => ({
  featuresItems: [
    { img: '/a', title: 'Feature A', text: 'Text A' }
  ]
}));

jest.mock('@/lib/site', () => ({
  asset: (path: string) => path
}));

describe('Features', () => {
  it('renders feature cards with copy and image', () => {
    render(<Features />);
    expect(screen.getByRole('heading', { name: 'Feature A' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Feature A' })).toHaveAttribute('src', '/a');
  });
});
