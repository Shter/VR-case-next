import { cache } from 'react';
import { supabaseClient } from '@/lib/supabase/client';
import type { Game, GameFiltersState, Genre } from '@/types/allTypes';
import { normalizeGame } from '@/lib/juegos/normalizers';

const DEFAULT_PAGE_LIMIT = 6;

export async function fetchGenres(): Promise<Genre[]> {
    const { data, error } = await supabaseClient
        .from('genres')
        .select('id, name')
        .order('name', { ascending: true });

    if (error) {
        console.error('[supabase] failed to fetch genres', error);
        throw new Error('No fue posible cargar los géneros disponibles.');
    }

    return (data ?? [])
        .map((item) => {
            const parsedId = typeof item.id === 'number'
                ? item.id
                : Number.parseInt(String(item.id), 10);

            if (Number.isNaN(parsedId)) {
                return null;
            }

            return {
                id: parsedId,
                name: typeof item.name === 'string' ? item.name : `Género #${item.id}`
            } satisfies Genre;
        })
        .filter((genre: null): genre is Genre => genre !== null);
}

export async function fetchGamesPage(
    filters: GameFiltersState,
    limit: number = DEFAULT_PAGE_LIMIT
): Promise<{ games: Game[]; total: number }> {
    const rangeEnd = Math.max(limit - 1, 0);

    let query = supabaseClient
        .from('games')
        .select('*', { count: 'exact' })
        .order('name', { ascending: true })
        .range(0, rangeEnd);

    if (filters.genreIds.length > 0) {
        query = query.overlaps('genre', filters.genreIds);
    }

    if (filters.multiplayerFilter === 'multiplayer') {
        query = query.eq('multiplayer', true);
    } else if (filters.multiplayerFilter === 'solo') {
        query = query.eq('multiplayer', false);
    }

    if (filters.searchTerm.trim().length >= 2) {
        query = query.ilike('name', `%${filters.searchTerm.trim()}%`);
    }

    const { data, error, count } = await query;

    if (error) {
        console.error('[supabase] failed to fetch games', error);
        throw new Error('No pudimos obtener la lista de juegos.');
    }

    const games = (data ?? []).map((item) => normalizeGame(item as Game));
    const total = typeof count === 'number' ? count : games.length;

    return { games, total };
}

async function fetchGameByIdInternal(rawId: string): Promise<Game | null> {
    const decodedId = decodeURIComponent(rawId.trim());

    if (!decodedId) {
        return null;
    }

    const isNumeric = /^\d+$/.test(decodedId);
    const queryValue = isNumeric ? Number(decodedId) : decodedId;

    const { data, error } = await supabaseClient
        .from('games')
        .select('*')
        .eq('id', queryValue)
        .maybeSingle();

    if (error) {
        console.error('[supabase] failed to fetch game by id', error);
        throw new Error('No pudimos cargar el detalle del juego.');
    }

    if (data) {
        return normalizeGame(data as Game);
    }

    if (!isNumeric) {
        const numericId = Number(decodedId);
        if (!Number.isNaN(numericId)) {
            const { data: numericData, error: numericError } = await supabaseClient
                .from('games')
                .select('*')
                .eq('id', numericId)
                .maybeSingle();

            if (numericError) {
                console.error('[supabase] failed fallback lookup', numericError);
                throw new Error('No pudimos cargar el detalle del juego.');
            }

            if (numericData) {
                return normalizeGame(numericData as Game);
            }
        }
    }

    return null;
}

export const getGameById = cache(fetchGameByIdInternal);
