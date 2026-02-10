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
import { JuegosCatalogSection } from '@/app/juegos/components/JuegosCatalogSection';
import { GAMES_CATALOG_PAGE_SIZE } from '@/app/juegos/constants';

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
        fetchGamesPage(filters, GAMES_CATALOG_PAGE_SIZE, initialPage)
    ]);

    const initialQueryString = buildCatalogQueryString(filters, initialPage);

    return (
        <JuegosCatalogSection
            initialGames={initialData.games}
            initialTotal={initialData.total}
            initialPage={initialPage}
            genres={genres}
            initialGenreIds={filters.genreIds}
            initialMultiplayerFilter={filters.multiplayerFilter}
            initialSearchTerm={filters.searchTerm}
            initialQueryString={initialQueryString}
            pageSize={GAMES_CATALOG_PAGE_SIZE}
            copy={GAME_CATALOG_COPY_JUEGOS}
            detailBasePath="/juegos"
            detailsCopy={GAME_DETAILS_COPY_JUEGOS}
        />
    );
}
