import type { Game, GameDetailsCopy } from '@/types/allTypes';

export const MULTIPLAYER_FILTER_EXPRESSION = 'max_players.gt.1,min_players.gt.1,and(max_players.is.null,min_players.gte.1)';
export const SOLO_FILTER_EXPRESSION = 'max_players.lte.1';

type PlayerCountSource = Pick<Game, 'min_players' | 'max_players'> | null | undefined;

type PlayerCountCopy = Pick<GameDetailsCopy, 'playerCountUnknownLabel'>;

function toValidCount(value: number | null | undefined): number | null {
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 1) {
        return null;
    }

    return Math.floor(value);
}

function formatCount(value: number): string {
    return String(value);
}

function formatAtLeastCount(value: number): string {
    return `${value}+`;
}

export function isMultiplayerGame(source: PlayerCountSource): boolean {
    if (!source) {
        return false;
    }

    const minPlayers = toValidCount(source.min_players ?? null);
    const maxPlayers = toValidCount(source.max_players ?? null);

    return (typeof maxPlayers === 'number' && maxPlayers > 1)
        || (typeof minPlayers === 'number' && minPlayers > 1);
}

export function formatPlayerCountLabel(
    source: PlayerCountSource,
    copy: PlayerCountCopy
): string {
    const minPlayers = toValidCount(source?.min_players ?? null);
    const maxPlayers = toValidCount(source?.max_players ?? null);

    if (typeof minPlayers === 'number' && typeof maxPlayers === 'number') {
        if (minPlayers === maxPlayers) {
            return formatCount(minPlayers);
        }

        return `${minPlayers}-${maxPlayers}`;
    }

    if (typeof maxPlayers === 'number') {
        return formatCount(maxPlayers);
    }

    if (typeof minPlayers === 'number') {
        return formatAtLeastCount(minPlayers);
    }

    return copy.playerCountUnknownLabel;
}
