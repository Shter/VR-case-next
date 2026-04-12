import { fireEvent, render } from '@testing-library/react';
import { useRef } from 'react';
import useClickAwayHeader from './useClickAway';

describe('useClickAwayHeader', () => {
  function TestComponent({ onClickAway, ignoreButton = false }: { onClickAway: (event: Event) => void; ignoreButton?: boolean }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const ignoredRef = useRef<HTMLButtonElement | null>(null);
    useClickAwayHeader(ref, onClickAway, ignoreButton ? { ignoreRefs: [ignoredRef] } : undefined);
    return (
      <div>
        <div ref={ref} data-testid="target">Inside</div>
        <button data-testid="outside">Outside</button>
        <button ref={ignoredRef} data-testid="ignored">Ignored</button>
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

  it('ignores clicks on configured refs', () => {
    const handler = jest.fn();
    const { getByTestId } = render(<TestComponent onClickAway={handler} ignoreButton />);

    fireEvent.mouseDown(getByTestId('ignored'));
    expect(handler).not.toHaveBeenCalled();

    fireEvent.mouseDown(getByTestId('outside'));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
