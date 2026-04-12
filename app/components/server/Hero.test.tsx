import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders headline and CTAs', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { name: /Alquiler de realidad virtual/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ver planes y precios/ })).toHaveAttribute('href', '/alquiler');
  });
});
