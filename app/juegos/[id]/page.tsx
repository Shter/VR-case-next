import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { GameFiltersState, PageProps } from '@/types/allTypes';
import {
    buildCatalogQueryString,
    normalizeLegacyShowMultiplayer,
    parseGenreIdsParam,
    parseMultiplayerParam,
    parsePageParam,
    parseSearchParam
} from '@/lib/juegos/filters';
import { buildGamesListHref } from '@/lib/games/links';
import { fetchGamesPage, fetchGenres, getGameById } from '@/lib/games/queries';
import { StandaloneGameDialog } from '@/app/juegos/components/StandaloneGameDialog';
import { JuegosCatalogSection } from '@/app/juegos/components/JuegosCatalogSection';
import { GAME_CATALOG_COPY_JUEGOS, GAME_DETAILS_COPY_JUEGOS } from '@/data/gameCatalogCopy';
import { GAMES_CATALOG_PAGE_SIZE } from '@/app/juegos/constants';
import { fetchPreviewForGame } from '@/lib/games/previews';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const paramsValue = await params;
    const game = await getGameById(paramsValue.id);

    if (!game) {
        return {
            title: 'Juego VR no encontrado',
            description: 'No pudimos encontrar esta experiencia de realidad virtual en la base de VR.CASE.'
        } satisfies Metadata;
    }

    const fallbackTitle = `Juego VR #${paramsValue.id}`;

    return {
        title: game.name ?? fallbackTitle,
        description: game.description ?? 'Experiencia de realidad virtual disponible en VR.CASE Buenos Aires.'
    } satisfies Metadata;
}

export default async function JuegoModalPage({ params, searchParams }: PageProps) {
    const paramsValue = await params;
    const searchParamsValue = await searchParams;
    const rawMultiplayer = searchParamsValue?.multiplayer;
    const legacyMultiplayer = normalizeLegacyShowMultiplayer(searchParamsValue?.showMultiplayer);
    const multiplayerParam = typeof rawMultiplayer === 'undefined' ? legacyMultiplayer : rawMultiplayer;

    const filtersFromParams: GameFiltersState = {
        genreIds: parseGenreIdsParam(searchParamsValue?.genres),
        multiplayerFilter: parseMultiplayerParam(multiplayerParam),
        searchTerm: parseSearchParam(searchParamsValue?.search)
    };

    const currentPage = parsePageParam(searchParamsValue?.page);
    const [genres, game, initialData] = await Promise.all([
        fetchGenres(),
        getGameById(paramsValue.id),
        fetchGamesPage(filtersFromParams, GAMES_CATALOG_PAGE_SIZE, currentPage)
    ]);

    if (!game) {
        notFound();
    }

    const preview = await fetchPreviewForGame(game);
    const filtersQuery = buildCatalogQueryString(filtersFromParams, currentPage);
    const backHref = buildGamesListHref('/juegos', filtersQuery);

    return (
        <>
            <JuegosCatalogSection
                initialGames={initialData.games}
                initialTotal={initialData.total}
                initialPage={currentPage}
                genres={genres}
                initialGenreIds={filtersFromParams.genreIds}
                initialMultiplayerFilter={filtersFromParams.multiplayerFilter}
                initialSearchTerm={filtersFromParams.searchTerm}
                initialQueryString={filtersQuery}
                pageSize={GAMES_CATALOG_PAGE_SIZE}
                copy={GAME_CATALOG_COPY_JUEGOS}
                detailBasePath="/juegos"
                detailsCopy={GAME_DETAILS_COPY_JUEGOS}
            />
            <div className="container mx-auto px-4 py-16">
                <StandaloneGameDialog
                    game={game}
                    copy={GAME_DETAILS_COPY_JUEGOS}
                    backHref={backHref}
                    genres={genres}
                    preview={preview}
                />
            </div>
        </>
    );
}
