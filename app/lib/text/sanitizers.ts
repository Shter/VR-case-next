// Allow only letters, digits, punctuation, whitespace, and line breaks inside descriptions.
const UNSUPPORTED_DESCRIPTION_CHARS = /[^\p{L}\p{N}\p{P}\p{Zs}\r\n]/gu;
const MULTISPACE_EXCEPT_BREAKS = /[^\S\r\n]+/g;
const PADDED_LINE_BREAK = / ?\n ?/g;
const EXCESSIVE_LINE_BREAKS = /\n{3,}/g;
const HAS_ALPHANUMERIC = /[\p{L}\p{N}]/u;

function normalizeWhitespace(value: string): string {
    return value
        .replace(/\r\n?/g, '\n')
        .replace(/\p{Zs}/gu, ' ')
        .replace(MULTISPACE_EXCEPT_BREAKS, ' ')
        .replace(PADDED_LINE_BREAK, '\n')
        .replace(EXCESSIVE_LINE_BREAKS, '\n\n');
}

function stripSymbolOnlyLines(value: string): string {
    return value.split('\n').filter((line) => {
        const trimmed = line.trim();

        if (trimmed.length === 0) {
            return true;
        }

        return HAS_ALPHANUMERIC.test(trimmed);
    }).join('\n').replace(EXCESSIVE_LINE_BREAKS, '\n\n');
}

export function sanitizeDescriptionText(rawValue: unknown): string | null {
    if (typeof rawValue !== 'string') {
        return null;
    }

    const trimmed = rawValue.trim();

    if (trimmed.length === 0) {
        return null;
    }

    const cleaned = stripSymbolOnlyLines(
        normalizeWhitespace(trimmed.replace(UNSUPPORTED_DESCRIPTION_CHARS, ''))
    ).trim();

    return cleaned.length > 0 ? cleaned : null;
}
