import { render } from '@testing-library/react';
import { JsonLd } from './JsonLd';

describe('JsonLd', () => {
  it('serializes data and normalizes script id', () => {
    const { container } = render(<JsonLd data={{ '@id': 'HTTPS://Example.com/Test', foo: '<bar>' }} />);
    const script = container.querySelector('script');
    expect(script).not.toBeNull();
    expect(script?.id).toBe('ld-json-https-example-com-test');
    expect(script?.textContent).toBe('{"@id":"HTTPS://Example.com/Test","foo":"\\u003cbar>"}');
  });
});
