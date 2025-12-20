import type { Metadata } from 'next';
import type { GameFiltersState, JuegosPageProps } from '@/types/allTypes';
import {
    buildCatalogQueryString,
    normalizeLegacyShowMultiplayer,
    parseGenreIdsParam,
    parseMultiplayerParam,
    parsePageParam,
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
        'catalogo vr juegos'
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

    const initialPage = parsePageParam(searchParamsValue?.page);

    const [genres, initialData] = await Promise.all([
        fetchGenres(),
        fetchGamesPage(filters, PAGE_SIZE, initialPage)
    ]);

    const initialQueryString = buildCatalogQueryString(filters, initialPage);

    return (
        <section className="container mx-auto px-4 pb-12 pt-20 md:py-24">
            <div className="flex flex-col items-center text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary"></p>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 md:mb-8">
                    Catálogo de juegos y aplicaciones de realidad virtual en Buenos Aires por VR-CASE
                </h1>
                <p className="text-lg opacity-90 mb-4 md:mb-8">
                    Nuestro catálogo reúne una selección curada de juegos y aplicaciones de realidad virtual,
                    cuidadosamente probados y recomendados, con fichas detalladas que incluyen jugabilidad, controles,
                    modos multijugador y características clave para que elijas la mejor experiencia VR
                </p>
            </div>

            <GamesCatalogClient
                initialGames={initialData.games}
                initialTotal={initialData.total}
                initialPage={initialPage}
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
