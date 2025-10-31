import type { Metadata } from 'next';
import { supabaseClient } from '@/lib/supabase/client';
import { GameBrowser } from './components/GameBrowser';
import type { Game, GameFiltersState, Genre, JuegosPageProps } from '@/types/allTypes';
import { buildFiltersQueryString, normalizeLegacyShowMultiplayer, parseGenreIdsParam, parseMultiplayerParam } from '@/lib/juegos/filters';
import { normalizeGame } from '@/lib/juegos/normalizers';

const PAGE_SIZE = 6;

export const metadata: Metadata = {
    title: 'Juegos',
    description: 'Explora la colección de juegos disponibles para experimentar realidad virtual.'
};

async function fetchGenres(): Promise<Genre[]> {
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
        .filter((genre): genre is Genre => genre !== null);
}

async function fetchGamesPage(filters: GameFiltersState): Promise<{ games: Game[]; total: number }> {
    let query = supabaseClient
        .from('games')
        .select('id, name, description, image_url, controls, multiplayer, multiplayer_instructions, genre', { count: 'exact' })
        .order('name', { ascending: true })
        .range(0, PAGE_SIZE - 1);

    if (filters.genreIds.length > 0) {
        query = query.overlaps('genre', filters.genreIds);
    }

    if (filters.multiplayerFilter === 'multiplayer') {
        query = query.eq('multiplayer', true);
    } else if (filters.multiplayerFilter === 'solo') {
        query = query.eq('multiplayer', false);
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

export default async function JuegosPage({ searchParams }: JuegosPageProps) {
    const rawMultiplayer = searchParams?.multiplayer;
    const legacyMultiplayer = normalizeLegacyShowMultiplayer(searchParams?.showMultiplayer);
    const multiplayerParam = typeof rawMultiplayer === 'undefined' ? legacyMultiplayer : rawMultiplayer;

    const filters: GameFiltersState = {
        genreIds: parseGenreIdsParam(searchParams?.genres),
        multiplayerFilter: parseMultiplayerParam(multiplayerParam)
    };

    const [genres, initialData] = await Promise.all([
        fetchGenres(),
        fetchGamesPage(filters)
    ]);

    const initialQueryString = buildFiltersQueryString(filters);

    return (
        <section className="container mx-auto px-4 pb-10 pt-20 md:py-24">
            <div className="mb-12 text-center">
                <h1 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">Juegos disponibles</h1>
                <p className="mt-4 text-base text-gray-600 md:text-lg">
                    Descubrí experiencias inmersivas y títulos imprescindibles para tu casco de realidad virtual.
                </p>
            </div>

            <GameBrowser
                initialGames={initialData.games}
                initialTotal={initialData.total}
                genres={genres}
                initialGenreIds={filters.genreIds}
                initialMultiplayerFilter={filters.multiplayerFilter}
                initialQueryString={initialQueryString}
                pageSize={PAGE_SIZE}
            />
        </section>
    );
}
