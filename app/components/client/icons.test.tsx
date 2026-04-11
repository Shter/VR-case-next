import { render } from '@testing-library/react';
import { ChevronLeftIcon, ChevronRightIcon, CloseIconGlyph } from './icons';

describe('icon glyphs', () => {
  it('renders svg paths', () => {
    const { container, rerender } = render(<ChevronLeftIcon data-testid="icon" />);
    expect(container.querySelectorAll('path')).toHaveLength(1);

    rerender(<ChevronRightIcon />);
    expect(container.querySelectorAll('path')).toHaveLength(1);

    rerender(<CloseIconGlyph />);
    expect(container.querySelectorAll('path')).toHaveLength(2);
  });
});
