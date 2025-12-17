'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
    buildFiltersQueryString,
    normalizeLegacyShowMultiplayer,
    parseGenreIdsParam,
    parseMultiplayerParam,
    parseSearchParam
} from '@/lib/juegos/filters';
import { normalizeGame } from '@/lib/juegos/normalizers';
import { toGameCacheKey } from '@/lib/games/cache';

const DEFAULT_PAGE_SIZE = 6;
const PREVIEW_BATCH_LIMIT = 6;

export function GameBrowser({
    initialGames,
    initialTotal,
    genres,
    initialGenreIds,
    initialMultiplayerFilter,
    initialSearchTerm,
    initialQueryString,
    pageSize = DEFAULT_PAGE_SIZE,
    copy,
    detailBasePath,
    onGameCardNavigate,
    onFiltersQueryChange,
    onVisibleGamesChange,
    onPreviewsChange
}: GameBrowserProps) {
    const pathname = usePathname();

    const [games, setGames] = useState<Game[]>(() => initialGames.map(normalizeGame));
    const [total, setTotal] = useState<number>(initialTotal);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<GameFiltersState>(() => ({
        genreIds: [...initialGenreIds],
        multiplayerFilter: initialMultiplayerFilter,
        searchTerm: initialSearchTerm
    }));
    const [searchInput, setSearchInput] = useState<string>(initialSearchTerm);
    const [previewsByGameId, setPreviewsByGameId] = useState<GamePreviewDictionary>({});
    const [isPreviewLoading, setIsPreviewLoading] = useState(false);

    const latestRequestIdRef = useRef(0);
    const lastSyncedQueryRef = useRef(initialQueryString ?? '');
    const latestFiltersRef = useRef<GameFiltersState>({
        genreIds: [...initialGenreIds],
        multiplayerFilter: initialMultiplayerFilter,
        searchTerm: initialSearchTerm
    });
    const previewRequestIdRef = useRef(0);

    const hasMore = games.length < total;

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
        () => buildFiltersQueryString(filters),
        [filters]
    );

    useEffect(() => {
        if (typeof onFiltersQueryChange === 'function') {
            onFiltersQueryChange(currentQueryString);
        }
    }, [currentQueryString, onFiltersQueryChange]);

    useEffect(() => {
        if (typeof onVisibleGamesChange === 'function') {
            onVisibleGamesChange(games);
        }
    }, [games, onVisibleGamesChange]);

    useEffect(() => {
        if (typeof onPreviewsChange === 'function') {
            onPreviewsChange(previewsByGameId);
        }
    }, [onPreviewsChange, previewsByGameId]);

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
                        throw new Error(`preview-fetch-failed-${response.status}`);
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
        offset: number,
        filtersToApply: GameFiltersState
    ): Promise<{ games: Game[]; total: number }> => {
        const rangeStart = offset;
        const rangeEnd = offset + pageSize - 1;

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
            throw fetchError;
        }

        const normalizedGames = (data ?? []).map((item) => normalizeGame(item as Game));

        return {
            games: normalizedGames,
            total: typeof count === 'number' ? count : normalizedGames.length
        };
    }, [pageSize]);

    const applyFilters = useCallback(async (
        nextFilters: GameFiltersState,
        { shouldUpdateHistory = true }: { shouldUpdateHistory?: boolean } = {}
    ) => {
        setError(null);
        setIsLoading(true);
        latestRequestIdRef.current += 1;
        const requestId = latestRequestIdRef.current;

        if (shouldUpdateHistory) {
            const queryString = buildFiltersQueryString(nextFilters);
            updateUrl(queryString);
        }

        try {
            const { games: fetchedGames, total: fetchedTotal } = await fetchGames(0, nextFilters);

            if (latestRequestIdRef.current !== requestId) {
                return;
            }

            setGames(fetchedGames);
            setTotal(fetchedTotal);
            latestFiltersRef.current = nextFilters;
        } catch (fetchError) {
            if (latestRequestIdRef.current !== requestId) {
                return;
            }

            console.error('[game-browser] failed to load games', fetchError);
            setError(copy.fetchErrorMessage);
        } finally {
            if (latestRequestIdRef.current === requestId) {
                setIsLoading(false);
                setIsLoadingMore(false);
            }
        }
    }, [copy.fetchErrorMessage, fetchGames, updateUrl]);

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

        setFilters(nextFilters);
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

        setFilters(nextFilters);
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

        setFilters(nextFilters);
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

            setFilters(nextFilters);
            void applyFilters(nextFilters);
        }, 300);

        return () => window.clearTimeout(timeoutId);
    }, [applyFilters, filters, searchInput]);

    const handleLoadMore = useCallback(async () => {
        if (!hasMore || isLoading || isLoadingMore) {
            return;
        }

        setIsLoadingMore(true);
        setError(null);
        latestRequestIdRef.current += 1;
        const requestId = latestRequestIdRef.current;

        try {
            const { games: fetchedGames, total: fetchedTotal } = await fetchGames(games.length, filters);

            if (latestRequestIdRef.current !== requestId) {
                return;
            }

            setGames((current) => [...current, ...fetchedGames]);
            setTotal(fetchedTotal);
        } catch (fetchError) {
            if (latestRequestIdRef.current !== requestId) {
                return;
            }

            console.error('[game-browser] failed to load more games', fetchError);
            setError(copy.loadMoreErrorMessage);
        } finally {
            if (latestRequestIdRef.current === requestId) {
                setIsLoadingMore(false);
            }
        }
    }, [copy.loadMoreErrorMessage, fetchGames, filters, games.length, hasMore, isLoading, isLoadingMore]);

    useEffect(() => {
        latestFiltersRef.current = filters;
    }, [filters]);

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

            lastSyncedQueryRef.current = buildFiltersQueryString(nextFilters);

            if (areFiltersEqual(latestFiltersRef.current, nextFilters)) {
                return;
            }

            setFilters(nextFilters);
            setSearchInput(nextFilters.searchTerm);
            void applyFilters(nextFilters, { shouldUpdateHistory: false });
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [applyFilters, initialQueryString]);

    const handleCardNavigate = useCallback((game: Game, href: string, event: MouseEvent<HTMLAnchorElement>) => {
        onGameCardNavigate?.(game, href, event);
    }, [onGameCardNavigate]);

    return (
        <div className="flex flex-col gap-14">
            <div className="rounded-3xl border border-gray-200 bg-white px-6 py-6 shadow-soft lg:px-10 lg:py-8">
                <GameFilters
                    genres={genres}
                    selectedGenreIds={filters.genreIds}
                    multiplayerFilter={filters.multiplayerFilter}
                    searchValue={searchInput}
                    onToggleGenre={handleToggleGenre}
                    onResetGenres={handleResetGenres}
                    onSelectMultiplayerFilter={handleSelectMultiplayerFilter}
                    onSearchChange={setSearchInput}
                    copy={copy}
                />
            </div>

            {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-700">
                    {error}
                </div>
            ) : null}

            <GamesGrid
                games={games}
                isLoading={isLoading}
                isLoadingMore={isLoadingMore}
                hasMore={hasMore}
                filtersQueryString={currentQueryString}
                onLoadMore={handleLoadMore}
                detailBasePath={detailBasePath}
                copy={copy}
                onGameCardNavigate={handleCardNavigate}
                previewsByGameId={previewsByGameId}
                isPreviewLoading={isPreviewLoading}
            />
        </div>
    );
}
