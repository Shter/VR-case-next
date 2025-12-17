import type { Game } from '@/types/allTypes';

function sanitizeString(value: unknown): string | null {
    if (typeof value !== 'string') {
        return null;
    }

    const trimmed = value.trim();

    return trimmed.length > 0 ? trimmed : null;
}

function sanitizeGenreList(raw: unknown): number[] {
    if (!Array.isArray(raw)) {
        return [];
    }

    const collected: number[] = [];

    raw.forEach((value) => {
        if (typeof value === 'number' && Number.isFinite(value)) {
            collected.push(value);
            return;
        }

        const parsed = Number.parseInt(String(value), 10);

        if (!Number.isNaN(parsed)) {
            collected.push(parsed);
        }
    });

    collected.sort((left, right) => left - right);

    return collected;
}

export function normalizeGame(raw: Game): Game {
    const legacyImage = (raw as Game & { imageg_url?: string; imageUrl?: string }).imageg_url
        ?? (raw as Game & { imageg_url?: string; imageUrl?: string }).imageUrl
        ?? raw.image_url;
    const listingSource = (raw as Game & { queststore_url?: string; listing_url?: string }).queststore_url
        ?? (raw as Game & { queststore_url?: string; listing_url?: string }).listing_url
        ?? raw.source_url;

    return {
        id: raw.id,
        name: sanitizeString(raw.name),
        description: sanitizeString(raw.description),
        image_url: sanitizeString(legacyImage),
        controls: sanitizeString(raw.controls),
        multiplayer: raw.multiplayer === true,
        multiplayer_instructions: sanitizeString(raw.multiplayer_instructions),
        genre: sanitizeGenreList(raw.genre),
        source_url: sanitizeString(listingSource),
        created_at: sanitizeString((raw as Game & { created_at?: string }).created_at)
    };
}
