import { GameFiltersState } from '@/types/allTypes';

type RawParam = string | string[] | undefined;

function toArray(raw: RawParam): string[] {
    if (!raw) {
        return [];
    }

    const values = Array.isArray(raw) ? raw : [raw];

    return values.flatMap((value) => value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean));
}

export function parseGenreIdsParam(raw: RawParam): number[] {
    const seen = new Set<number>();

    toArray(raw).forEach((value) => {
        const parsed = Number.parseInt(value, 10);

        if (!Number.isNaN(parsed)) {
            seen.add(parsed);
        }
    });

    return Array.from(seen).sort((left, right) => left - right);
}

export function parseMultiplayerParam(raw: RawParam): 'all' | 'multiplayer' | 'solo' {
    if (!raw) {
        return 'all';
    }

    const first = (Array.isArray(raw) ? raw[0] : raw) ?? '';
    const normalized = first.trim().toLowerCase();

    if (normalized === 'true' || normalized === '1') {
        return 'multiplayer';
    }

    if (normalized === 'false' || normalized === '0') {
        return 'solo';
    }

    return 'all';
}

export function buildFiltersQueryString({ genreIds, multiplayerFilter, searchTerm }: GameFiltersState): string {
    const params = new URLSearchParams();

    if (genreIds.length > 0) {
        params.set('genres', genreIds.slice().sort((left, right) => left - right).join(','));
    }

    if (multiplayerFilter === 'multiplayer') {
        params.set('multiplayer', 'true');
    } else if (multiplayerFilter === 'solo') {
        params.set('multiplayer', 'false');
    }

    if (searchTerm.trim().length >= 2) {
        params.set('search', searchTerm.trim());
    }

    return params.toString();
}

export function areGenreListsEqual(a: number[], b: number[]): boolean {
    if (a.length !== b.length) {
        return false;
    }

    return a.every((value, index) => value === b[index]);
}

export function areFiltersEqual(a: GameFiltersState, b: GameFiltersState): boolean {
    return a.multiplayerFilter === b.multiplayerFilter
        && areGenreListsEqual(a.genreIds, b.genreIds)
        && a.searchTerm === b.searchTerm;
}

export function normalizeLegacyShowMultiplayer(raw: RawParam): RawParam {
    if (!raw) {
        return undefined;
    }

    const first = (Array.isArray(raw) ? raw[0] : raw) ?? '';
    const normalized = first.trim().toLowerCase();

    if (normalized === '0' || normalized === 'false') {
        return 'false';
    }

    return undefined;
}

export function parseSearchParam(raw: RawParam): string {
    if (!raw) {
        return '';
    }

    const first = Array.isArray(raw) ? raw[0] : raw;

    if (typeof first !== 'string') {
        return '';
    }

    const trimmed = first.trim();

    return trimmed.length >= 2 ? trimmed : '';
}
