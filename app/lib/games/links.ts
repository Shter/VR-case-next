function normalizeBasePath(basePath: string): string {
    if (!basePath || basePath === '/') {
        return '';
    }

    const prefixed = basePath.startsWith('/') ? basePath : `/${basePath}`;
    const trimmed = prefixed.endsWith('/') ? prefixed.slice(0, -1) : prefixed;

    return trimmed;
}

function withQuery(target: string, queryString?: string): string {
    if (!queryString) {
        return target;
    }

    const normalizedQuery = queryString.startsWith('?') ? queryString : `?${queryString}`;

    return `${target}${normalizedQuery}`;
}

export function buildGameDetailHref(basePath: string, gameId: number | string, queryString?: string): string {
    const normalizedBase = normalizeBasePath(basePath);
    const encodedId = encodeURIComponent(String(gameId));
    const targetBase = normalizedBase ? `${normalizedBase}/${encodedId}` : `/${encodedId}`;

    return withQuery(targetBase, queryString);
}

export function buildGamesListHref(basePath: string, queryString?: string): string {
    const normalizedBase = normalizeBasePath(basePath);
    const targetBase = normalizedBase || '/';

    return withQuery(targetBase, queryString);
}
