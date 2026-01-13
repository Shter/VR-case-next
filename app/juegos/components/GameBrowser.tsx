'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { usePathname } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase/client';
import { GameFilters } from './GameFilters';
import { GamesGrid } from './GamesGrid';
import type {
    Game,
    GameBrowserProps,
    GameFiltersState,
    GamePreview,
    GamePreviewDictionary,
    GamePreviewRequestItem,
    GamePreviewsResponse
} from '@/types/allTypes';
import {
    areFiltersEqual,
    buildCatalogQueryString,
    normalizeLegacyShowMultiplayer,
    parseGenreIdsParam,
    parseMultiplayerParam,
    parsePageParam,
    parseSearchParam
} from '@/lib/juegos/filters';
import { normalizeGame } from '@/lib/juegos/normalizers';
import { toGameCacheKey } from '@/lib/games/cache';

const DEFAULT_PAGE_SIZE = 6;
const PREVIEW_BATCH_LIMIT = 6;
const MIN_GRID_LOADING_MS = 1200;

function useMinimumLoadingDelay(isActive: boolean, minimumDurationMs: number, options: { initialActive?: boolean } = {}): boolean {
    const { initialActive = false } = options;
    const [isVisible, setIsVisible] = useState(initialActive);
    const startRef = useRef<number>(initialActive ? Date.now() : 0);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (isActive) {
            startRef.current = Date.now();
            setIsVisible(true);
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            return;
        }

        const elapsed = Date.now() - startRef.current;
        const remaining = Math.max(minimumDurationMs - elapsed, 0);

        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        if (remaining === 0) {
            setIsVisible(false);
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setIsVisible(false);
            timeoutRef.current = null;
        }, remaining);

        timeoutRef.current = timeoutId;

        return () => {
            window.clearTimeout(timeoutId);
            if (timeoutRef.current === timeoutId) {
                timeoutRef.current = null;
            }
        };
    }, [isActive, minimumDurationMs]);

    useEffect(() => () => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    return isVisible;
}

export function GameBrowser({
    initialGames,
    initialTotal,
    genres,
    initialGenreIds,
    initialMultiplayerFilter,
    initialSearchTerm,
    initialQueryString,
    initialPage = 1,
    pageSize = DEFAULT_PAGE_SIZE,
    copy,
    detailBasePath,
    onGameCardNavigateAction,
    onFiltersQueryChangeAction,
    onVisibleGamesChangeAction,
    onPreviewsChangeAction
}: GameBrowserProps) {
    const pathname = usePathname();

    const [games, setGames] = useState<Game[]>(() => initialGames.map(normalizeGame));
    const [total, setTotal] = useState<number>(initialTotal);
    const [isLoading, setIsLoading] = useState(false);
    const isUiLoading = useMinimumLoadingDelay(isLoading, MIN_GRID_LOADING_MS, { initialActive: true });
    const [currentPage, setCurrentPage] = useState<number>(() => Math.max(initialPage ?? 1, 1));
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<GameFiltersState>(() => ({
        genreIds: [...initialGenreIds],
        multiplayerFilter: initialMultiplayerFilter,
        searchTerm: initialSearchTerm
    }));
    const [searchInput, setSearchInput] = useState<string>(initialSearchTerm);
    const [previewsByGameId, setPreviewsByGameId] = useState<GamePreviewDictionary>({});
    const [isPreviewLoading, setIsPreviewLoading] = useState(false);
    const lastRenderedGamesRef = useRef<Game[]>(games);
    const gridGames = isUiLoading ? lastRenderedGamesRef.current : games;

    const latestRequestIdRef = useRef(0);
    const lastSyncedQueryRef = useRef(initialQueryString ?? '');
    const latestFiltersRef = useRef<GameFiltersState>({
        genreIds: [...initialGenreIds],
        multiplayerFilter: initialMultiplayerFilter,
        searchTerm: initialSearchTerm
    });
    const latestPageRef = useRef<number>(Math.max(initialPage ?? 1, 1));
    const previewRequestIdRef = useRef(0);

    const upsertPreviews = useCallback((previews: GamePreview[]) => {
        if (!previews || previews.length === 0) {
            return;
        }

        setPreviewsByGameId((current) => {
            const next = { ...current };
            let mutated = false;

            previews.forEach((preview) => {
                const cacheKey = toGameCacheKey(preview.gameId);
                const existing = next[cacheKey];

                if (!existing
                    || existing.posterUrl !== preview.posterUrl
                    || existing.description !== preview.description
                    || existing.videoUrl !== preview.videoUrl
                ) {
                    next[cacheKey] = preview;
                    mutated = true;
                }
            });

            return mutated ? next : current;
        });
    }, []);

    const currentQueryString = useMemo(
        () => buildCatalogQueryString(filters, currentPage),
        [currentPage, filters]
    );

    useEffect(() => {
        if (typeof onFiltersQueryChangeAction === 'function') {
            onFiltersQueryChangeAction(currentQueryString);
        }
    }, [currentQueryString, onFiltersQueryChangeAction]);

    useLayoutEffect(() => {
        if (!isUiLoading) {
            lastRenderedGamesRef.current = games;
        }
    }, [games, isUiLoading]);

    useEffect(() => {
        if (typeof onVisibleGamesChangeAction === 'function') {
            onVisibleGamesChangeAction(gridGames);
        }
    }, [gridGames, onVisibleGamesChangeAction]);

    useEffect(() => {
        if (typeof onPreviewsChangeAction === 'function') {
            onPreviewsChangeAction(previewsByGameId);
        }
    }, [onPreviewsChangeAction, previewsByGameId]);

    useEffect(() => {
        const previewTargets: GamePreviewRequestItem[] = games
            .filter((game) => typeof game.source_url === 'string' && game.source_url.trim().length > 0)
            .filter((game) => !previewsByGameId[toGameCacheKey(game.id)])
            .map((game) => ({
                id: game.id,
                sourceUrl: (game.source_url as string).trim()
            }));

        if (previewTargets.length === 0) {
            setIsPreviewLoading(false);
            return undefined;
        }

        let isSubscribed = true;
        previewRequestIdRef.current += 1;
        const requestId = previewRequestIdRef.current;
        setIsPreviewLoading(true);

        const fetchPreviews = async () => {
            try {
                for (let index = 0; index < previewTargets.length; index += PREVIEW_BATCH_LIMIT) {
                    if (!isSubscribed || previewRequestIdRef.current !== requestId) {
                        return;
                    }

                    const chunk = previewTargets.slice(index, index + PREVIEW_BATCH_LIMIT);
                    const response = await fetch('/api/games/previews', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ games: chunk })
                    });

                    if (!response.ok) {
                        console.error('[game-browser] preview fetch failed', response.status);
                        break;
                    }

                    const payload = await response.json() as GamePreviewsResponse;

                    if (!isSubscribed || previewRequestIdRef.current !== requestId) {
                        return;
                    }

                    upsertPreviews(payload.previews ?? []);
                }
            } catch (previewError) {
                if (previewRequestIdRef.current === requestId) {
                    console.error('[game-browser] failed to load previews', previewError);
                }
            } finally {
                if (isSubscribed && previewRequestIdRef.current === requestId) {
                    setIsPreviewLoading(false);
                }
            }
        };

        void fetchPreviews();

        return () => {
            isSubscribed = false;
            previewRequestIdRef.current += 1;
        };
    }, [games, previewsByGameId, upsertPreviews]);

    const updateUrl = useCallback((queryString: string) => {
        const target = queryString ? `${pathname}?${queryString}` : pathname;

        if (typeof window === 'undefined') {
            return;
        }

        if (queryString === lastSyncedQueryRef.current) {
            return;
        }

        window.history.replaceState(null, '', target);
        lastSyncedQueryRef.current = queryString;
    }, [pathname]);

    const fetchGames = useCallback(async (
        pageToLoad: number,
        filtersToApply: GameFiltersState
    ): Promise<{ games: Game[]; total: number; error?: Error }> => {
        const normalizedPage = Number.isFinite(pageToLoad) && pageToLoad > 0
            ? Math.floor(pageToLoad)
            : 1;
        const rangeStart = (normalizedPage - 1) * pageSize;
        const rangeEnd = rangeStart + pageSize - 1;

        let query = supabaseClient
            .from('games')
            .select('*', { count: 'exact' })
            .order('name', { ascending: true })
            .range(rangeStart, rangeEnd);

        if (filtersToApply.genreIds.length > 0) {
            query = query.overlaps('genre', filtersToApply.genreIds);
        }

        if (filtersToApply.multiplayerFilter === 'multiplayer') {
            query = query.eq('multiplayer', true);
        } else if (filtersToApply.multiplayerFilter === 'solo') {
            query = query.eq('multiplayer', false);
        }

        if (filtersToApply.searchTerm.trim().length >= 2) {
            query = query.ilike('name', `%${filtersToApply.searchTerm.trim()}%`);
        }

        const { data, error: fetchError, count } = await query;

        if (fetchError) {
            console.error('[game-browser] failed to fetch games batch', fetchError);
            return { games: [], total: 0, error: fetchError };
        }

        const normalizedGames = (data ?? []).map((item) => normalizeGame(item as Game));

        return {
            games: normalizedGames,
            total: typeof count === 'number' ? count : normalizedGames.length
        };
    }, [pageSize]);

    const loadPage = useCallback(async (
        pageToLoad: number,
        filtersToApply: GameFiltersState,
        { shouldUpdateHistory = true }: { shouldUpdateHistory?: boolean } = {}
    ) => {
        const nextPage = pageToLoad > 0 ? Math.floor(pageToLoad) : 1;
        setError(null);
        setIsLoading(true);
        latestRequestIdRef.current += 1;
        const requestId = latestRequestIdRef.current;

        latestFiltersRef.current = filtersToApply;
        latestPageRef.current = nextPage;

        if (shouldUpdateHistory) {
            const queryString = buildCatalogQueryString(filtersToApply, nextPage);
            updateUrl(queryString);
        }

        try {
            const result = await fetchGames(nextPage, filtersToApply);

            if (latestRequestIdRef.current !== requestId) {
                return;
            }

            if (result.error) {
                console.error('[game-browser] failed to load games', result.error);
                setError(nextPage === 1 ? copy.fetchErrorMessage : copy.pagination.errorMessage);
                return;
            }

            setGames(result.games);
            setTotal(result.total);
            setCurrentPage(nextPage);
        } catch (fetchError) {
            if (latestRequestIdRef.current !== requestId) {
                return;
            }

            console.error('[game-browser] failed to load games', fetchError);
            setError(nextPage === 1 ? copy.fetchErrorMessage : copy.pagination.errorMessage);
        } finally {
            if (latestRequestIdRef.current === requestId) {
                setIsLoading(false);
            }
        }
    }, [copy.fetchErrorMessage, copy.pagination.errorMessage, fetchGames, updateUrl]);

    const applyFilters = useCallback((
        nextFilters: GameFiltersState,
        options?: { shouldUpdateHistory?: boolean }
    ) => {
        setFilters(nextFilters);
        void loadPage(1, nextFilters, options);
    }, [loadPage]);

    const handleToggleGenre = useCallback((genreId: number) => {
        const isActive = filters.genreIds.includes(genreId);
        const nextGenreIds = isActive
            ? filters.genreIds.filter((id) => id !== genreId)
            : [...filters.genreIds, genreId];
        nextGenreIds.sort((left, right) => left - right);

        const nextFilters: GameFiltersState = {
            ...filters,
            genreIds: nextGenreIds
        };

        if (areFiltersEqual(filters, nextFilters)) {
            return;
        }

        void applyFilters(nextFilters);
    }, [applyFilters, filters]);

    const handleResetGenres = useCallback(() => {
        if (filters.genreIds.length === 0) {
            return;
        }

        const nextFilters: GameFiltersState = {
            ...filters,
            genreIds: []
        };

        void applyFilters(nextFilters);
    }, [applyFilters, filters]);

    const handleSelectMultiplayerFilter = useCallback((value: 'all' | 'multiplayer' | 'solo') => {
        const nextFilters: GameFiltersState = {
            ...filters,
            multiplayerFilter: value
        };

        if (areFiltersEqual(filters, nextFilters)) {
            return;
        }

        void applyFilters(nextFilters);
    }, [applyFilters, filters]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const trimmed = searchInput.trim();
        const resolved = trimmed.length >= 2 ? trimmed : '';

        if (resolved === filters.searchTerm) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            const nextFilters: GameFiltersState = {
                ...filters,
                searchTerm: resolved
            };

            if (areFiltersEqual(filters, nextFilters)) {
                return;
            }

            void applyFilters(nextFilters);
        }, 300);

        return () => window.clearTimeout(timeoutId);
    }, [applyFilters, filters, searchInput]);

    useEffect(() => {
        latestFiltersRef.current = filters;
    }, [filters]);

    const totalPages = Math.max(Math.ceil(total / pageSize), 1);

    const handlePageChange = useCallback((page: number) => {
        if (page < 1 || page > totalPages || page === currentPage) {
            return;
        }

        void loadPage(page, filters);
    }, [currentPage, filters, loadPage, totalPages]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        lastSyncedQueryRef.current = initialQueryString ?? '';

        const handlePopState = () => {
            const params = new URLSearchParams(window.location.search);
            const rawMultiplayer = params.get('multiplayer') ?? undefined;
            const legacyValue = normalizeLegacyShowMultiplayer(params.get('showMultiplayer') ?? undefined);
            const multiplayerParam = typeof rawMultiplayer === 'undefined' ? legacyValue : rawMultiplayer;

            const nextFilters: GameFiltersState = {
                genreIds: parseGenreIdsParam(params.get('genres') ?? undefined),
                multiplayerFilter: parseMultiplayerParam(multiplayerParam),
                searchTerm: parseSearchParam(params.get('search') ?? undefined)
            };

            const resolvedPage = parsePageParam(params.get('page') ?? undefined);
            lastSyncedQueryRef.current = buildCatalogQueryString(nextFilters, resolvedPage);

            const filtersChanged = !areFiltersEqual(latestFiltersRef.current, nextFilters);
            const pageChanged = latestPageRef.current !== resolvedPage;

            if (!filtersChanged && !pageChanged) {
                return;
            }

            if (filtersChanged) {
                setFilters(nextFilters);
                setSearchInput(nextFilters.searchTerm);
            }

            void loadPage(resolvedPage, nextFilters, { shouldUpdateHistory: false });
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [initialQueryString, loadPage]);

    const handleCardNavigate = useCallback((game: Game, href: string, event: MouseEvent<HTMLAnchorElement>) => {
        onGameCardNavigateAction?.(game, href, event);
    }, [onGameCardNavigateAction]);

    return (
        <div className="flex flex-col gap-6 md:gap-8">
            <div className="rounded-3xl border border-gray-200 bg-white px-6 py-6 shadow-soft lg:px-10 lg:py-8">
                <GameFilters
                    genres={genres}
                    selectedGenreIds={filters.genreIds}
                    multiplayerFilter={filters.multiplayerFilter}
                    searchValue={searchInput}
                    onToggleGenreAction={handleToggleGenre}
                    onResetGenresAction={handleResetGenres}
                    onSelectMultiplayerFilterAction={handleSelectMultiplayerFilter}
                    onSearchChangeAction={setSearchInput}
                    copy={copy}
                />
            </div>

            {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-700">
                    {error}
                </div>
            ) : null}

            <GamesGrid
                games={gridGames}
                isLoading={isLoading}
                isUiLoading={isUiLoading}
                currentPage={currentPage}
                totalPages={totalPages}
                totalResults={total}
                pageSize={pageSize}
                filtersQueryString={currentQueryString}
                onPageChangeAction={handlePageChange}
                detailBasePath={detailBasePath}
                copy={copy}
                onGameCardNavigateAction={handleCardNavigate}
                previewsByGameId={previewsByGameId}
                isPreviewLoading={isPreviewLoading}
            />
        </div>
    );
}
