import { supabaseClient } from '@/lib/supabase/client';
import type { Game } from '@/types/allTypes';
import { normalizeGame } from '@/lib/juegos/normalizers';

export async function fetchGameClientById(rawId: string | number): Promise<Game> {
    const normalizedValue = typeof rawId === 'number'
        ? rawId
        : decodeURIComponent(rawId.toString()).trim();

    if (normalizedValue === '' || typeof normalizedValue === 'undefined') {
        throw new Error('invalid-game-id');
    }

    const numericCandidate = typeof normalizedValue === 'number'
        ? normalizedValue
        : Number(normalizedValue);
    const shouldUseNumeric = typeof normalizedValue === 'number'
        || (!Number.isNaN(numericCandidate) && /^\d+$/.test(String(normalizedValue)));

    const queryValue = shouldUseNumeric ? numericCandidate : normalizedValue;

    const { data, error } = await supabaseClient
        .from('games')
        .select('*')
        .eq('id', queryValue)
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new Error('not-found');
    }

    return normalizeGame(data as Game);
}
