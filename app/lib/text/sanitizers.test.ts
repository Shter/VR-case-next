import { sanitizeDescriptionText } from './sanitizers';

describe('sanitizeDescriptionText', () => {
  it('removes unsupported characters and normalizes whitespace', () => {
    const input = '  🚀Hello\n\n***World***   \n\n\n';
    expect(sanitizeDescriptionText(input)).toBe('Hello\n\n***World***');
  });

  it('returns null for empty-like values', () => {
    expect(sanitizeDescriptionText('   ')).toBeNull();
    expect(sanitizeDescriptionText(123)).toBeNull();
  });
});
