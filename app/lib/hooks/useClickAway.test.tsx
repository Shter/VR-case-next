import { fireEvent, render } from '@testing-library/react';
import { useRef } from 'react';
import useClickAwayHeader from './useClickAway';

describe('useClickAwayHeader', () => {
  function TestComponent({ onClickAway }: { onClickAway: (event: Event) => void }) {
    const ref = useRef<HTMLDivElement | null>(null);
    useClickAwayHeader(ref, onClickAway);
    return (
      <div>
        <div ref={ref} data-testid="target">Inside</div>
        <button data-testid="outside">Outside</button>
      </div>
    );
  }

  it('invokes callback when clicking outside of the referenced element', () => {
    const handler = jest.fn();
    const { unmount, getByTestId } = render(<TestComponent onClickAway={handler} />);

    fireEvent.mouseDown(getByTestId('target'));
    expect(handler).not.toHaveBeenCalled();

    fireEvent.mouseDown(getByTestId('outside'));
    expect(handler).toHaveBeenCalledTimes(1);

    unmount();
    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
