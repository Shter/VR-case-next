import type { Metadata } from 'next';
import type { GameFiltersState, JuegosPageProps } from '@/types/allTypes';
import {
    buildFiltersQueryString,
    normalizeLegacyShowMultiplayer,
    parseGenreIdsParam,
    parseMultiplayerParam,
    parseSearchParam
} from '@/lib/juegos/filters';
import { fetchGamesPage, fetchGenres } from '@/lib/games/queries';
import { GAME_CATALOG_COPY_JUEGOS, GAME_DETAILS_COPY_JUEGOS } from '@/data/gameCatalogCopy';
import { GamesCatalogClient } from '@/app/juegos/components/GamesCatalogClient';

const PAGE_SIZE = 6;

export const metadata: Metadata = {
    title: 'Realidad virtual Buenos Aires: catálogo VR.CASE',
    description: 'Explorá el catálogo VR.CASE de realidad virtual en Buenos Aires: buscá juegos, filtrá por género y descubrí experiencias con Meta Quest.',
    keywords: [
        'realidad virtual buenos aires',
        'juegos realidad virtual',
        'meta quest buenos aires',
        'catalogo vr case'
    ],
    alternates: { canonical: '/juegos' }
};

export default async function JuegosPage({ searchParams }: JuegosPageProps) {
    const searchParamsValue = await searchParams;
    const rawMultiplayer = searchParamsValue?.multiplayer;
    const legacyMultiplayer = normalizeLegacyShowMultiplayer(searchParamsValue?.showMultiplayer);
    const multiplayerParam = typeof rawMultiplayer === 'undefined' ? legacyMultiplayer : rawMultiplayer;

    const filters: GameFiltersState = {
        genreIds: parseGenreIdsParam(searchParamsValue?.genres),
        multiplayerFilter: parseMultiplayerParam(multiplayerParam),
        searchTerm: parseSearchParam(searchParamsValue?.search)
    };

    const [genres, initialData] = await Promise.all([
        fetchGenres(),
        fetchGamesPage(filters, PAGE_SIZE)
    ]);

    console.log(2, genres, initialData);

    const initialQueryString = buildFiltersQueryString(filters);

    return (
        <section className="container mx-auto px-4 pb-12 pt-20 md:py-24">
            <div className="mb-12 flex flex-col items-center gap-4 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Realidad virtual Buenos Aires</p>
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
                    Catálogo VR.CASE de juegos y experiencias
                </h1>
                <p className="max-w-2xl text-base text-gray-600">
                    Buscá experiencias listas para Meta Quest, filtrá por género o modo multijugador y compartí
                    la ficha /juegos/:id con tu equipo para abrir el pop-up informativo al instante.
                </p>
            </div>

            <GamesCatalogClient
                initialGames={initialData.games}
                initialTotal={initialData.total}
                genres={genres}
                initialGenreIds={filters.genreIds}
                initialMultiplayerFilter={filters.multiplayerFilter}
                initialSearchTerm={filters.searchTerm}
                initialQueryString={initialQueryString}
                pageSize={PAGE_SIZE}
                copy={GAME_CATALOG_COPY_JUEGOS}
                detailBasePath="/juegos"
                detailsCopy={GAME_DETAILS_COPY_JUEGOS}
            />
        </section>
    );
}
