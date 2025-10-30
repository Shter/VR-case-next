'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase/client';
import { GameFilters } from './GameFilters';
import { GamesGrid } from './GamesGrid';
import type { Game, GameBrowserProps, GameFiltersState } from '@/types/allTypes';
import {
    areFiltersEqual,
    buildFiltersQueryString,
    parseGenreIdsParam,
    parseMultiplayerParam
} from '@/lib/juegos/filters';
import { normalizeGame } from '@/lib/juegos/normalizers';

const DEFAULT_PAGE_SIZE = 6;

export function GameBrowser({
    initialGames,
    initialTotal,
    genres,
    initialGenreIds,
    initialMultiplayerOnly,
    initialQueryString,
    pageSize = DEFAULT_PAGE_SIZE
}: GameBrowserProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [games, setGames] = useState<Game[]>(() => initialGames.map(normalizeGame));
    const [total, setTotal] = useState<number>(initialTotal);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<GameFiltersState>(() => ({
        genreIds: [...initialGenreIds],
        multiplayerOnly: initialMultiplayerOnly
    }));

    const latestRequestIdRef = useRef(0);
    const lastSyncedQueryRef = useRef(initialQueryString ?? '');

    const hasMore = games.length < total;

    const currentQueryString = useMemo(
        () => buildFiltersQueryString(filters),
        [filters]
    );

    const updateUrl = useCallback((queryString: string) => {
        const target = queryString ? `${pathname}?${queryString}` : pathname;
        //TODO fix
        // @ts-ignore
        router.replace(target, { scroll: false });
    }, [pathname, router]);

    const fetchGames = useCallback(async (
        offset: number,
        filtersToApply: GameFiltersState
    ): Promise<{ games: Game[]; total: number }> => {
        const rangeStart = offset;
        const rangeEnd = offset + pageSize - 1;

        let query = supabaseClient
            .from('games')
            .select(
                'id, name, description, image_url, controls, multiplayer, multiplayer_instructions, genre',
                { count: 'exact' }
            )
            .order('name', { ascending: true })
            .range(rangeStart, rangeEnd);

        if (filtersToApply.genreIds.length > 0) {
            query = query.overlaps('genre', filtersToApply.genreIds);
        }

        if (filtersToApply.multiplayerOnly) {
            query = query.eq('multiplayer', true);
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
            lastSyncedQueryRef.current = queryString;
            updateUrl(queryString);
        }

        try {
            const { games: fetchedGames, total: fetchedTotal } = await fetchGames(0, nextFilters);

            if (latestRequestIdRef.current !== requestId) {
                return;
            }

            setGames(fetchedGames);
            setTotal(fetchedTotal);
        } catch (fetchError) {
            if (latestRequestIdRef.current !== requestId) {
                return;
            }

            console.error('[juegos] failed to load games', fetchError);
            setError('No pudimos cargar los juegos. Por favor, intentá nuevamente.');
        } finally {
            if (latestRequestIdRef.current === requestId) {
                setIsLoading(false);
                setIsLoadingMore(false);
            }
        }
    }, [fetchGames, updateUrl]);

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

    const handleToggleMultiplayerOnly = useCallback(() => {
        const nextFilters: GameFiltersState = {
            ...filters,
            multiplayerOnly: !filters.multiplayerOnly
        };

        if (areFiltersEqual(filters, nextFilters)) {
            return;
        }

        setFilters(nextFilters);
        void applyFilters(nextFilters);
    }, [applyFilters, filters]);

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

            console.error('[juegos] failed to load more games', fetchError);
            setError('No pudimos cargar más juegos. Revisá tu conexión e intentá nuevamente.');
        } finally {
            if (latestRequestIdRef.current === requestId) {
                setIsLoadingMore(false);
            }
        }
    }, [fetchGames, filters, games.length, hasMore, isLoading, isLoadingMore]);

    useEffect(() => {
        const queryFromRouter = searchParams.toString();

        if (queryFromRouter === lastSyncedQueryRef.current) {
            return;
        }

        const nextFilters: GameFiltersState = {
            genreIds: parseGenreIdsParam(searchParams.get('genres') ?? undefined),
            multiplayerOnly: parseMultiplayerParam(searchParams.get('multiplayer') ?? undefined)
        };

        if (areFiltersEqual(filters, nextFilters)) {
            lastSyncedQueryRef.current = queryFromRouter;
            return;
        }

        lastSyncedQueryRef.current = queryFromRouter;
        setFilters(nextFilters);
        void applyFilters(nextFilters, { shouldUpdateHistory: false });
    }, [applyFilters, filters, searchParams]);

    return (
        <div className="flex flex-col gap-12">
            <GameFilters
                genres={genres}
                selectedGenreIds={filters.genreIds}
                multiplayerOnly={filters.multiplayerOnly}
                onToggleGenre={handleToggleGenre}
                onResetGenres={handleResetGenres}
                onToggleMultiplayerOnly={handleToggleMultiplayerOnly}
            />

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
            />
        </div>
    );
}
