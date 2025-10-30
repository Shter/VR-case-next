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

export function parseMultiplayerParam(raw: RawParam): boolean {
    if (!raw) {
        return false;
    }

    const first = Array.isArray(raw) ? raw[0] : raw;
    const normalized = first.trim().toLowerCase();

    return normalized === '1' || normalized === 'true' || normalized === 'yes';
}

export function buildFiltersQueryString({ genreIds, multiplayerOnly }: GameFiltersState): string {
    const params = new URLSearchParams();

    if (genreIds.length > 0) {
        params.set('genres', genreIds.slice().sort((left, right) => left - right).join(','));
    }

    if (multiplayerOnly) {
        params.set('multiplayer', '1');
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
    return a.multiplayerOnly === b.multiplayerOnly && areGenreListsEqual(a.genreIds, b.genreIds);
}
