'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import type { Game, GamesCatalogClientProps } from '@/types/allTypes';
import { buildGameDetailHref, buildGamesListHref } from '@/lib/games/links';
import { fetchGameClientById } from '@/lib/games/client';
import { GameDetailsDialog } from './GameDetailsDialog';
import { GameBrowser } from "@/app/juegos/components/GameBrowser"

function toCacheKey(id: string | number): string {
    return decodeURIComponent(String(id));
}

function normalizeBasePath(path: string): string {
    if (!path) {
        return '';
    }

    const prefixed = path.startsWith('/') ? path : `/${path}`;

    if (prefixed === '/') {
        return prefixed;
    }

    return prefixed.endsWith('/') ? prefixed.slice(0, -1) : prefixed;
}

export function GamesCatalogClient({
    detailBasePath,
    copy,
    detailsCopy,
    ...browserProps
}: GamesCatalogClientProps) {
    const [currentQueryString, setCurrentQueryString] = useState(browserProps.initialQueryString ?? '');
    const [modalGame, setModalGame] = useState<Game | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [modalError, setModalError] = useState<string | null>(null);

    const knownGamesRef = useRef(new Map<string, Game>());
    const pendingIdRef = useRef<string | null>(null);

    const normalizedBase = normalizeBasePath(detailBasePath);
    const listHref = buildGamesListHref(detailBasePath, currentQueryString);

    const cacheGames = useCallback((games: Game[]) => {
        const store = knownGamesRef.current;
        games.forEach((game) => {
            store.set(toCacheKey(game.id), game);
        });
    }, []);

    const pushModalHistory = useCallback((href: string) => {
        if (typeof window === 'undefined') {
            return;
        }

        if (window.location.pathname + window.location.search === href) {
            return;
        }

        window.history.pushState({ modal: true }, '', href);
    }, []);

    const openModalWithGame = useCallback((game: Game, href: string, { skipHistory } = { skipHistory: false }) => {
        knownGamesRef.current.set(toCacheKey(game.id), game);
        pendingIdRef.current = toCacheKey(game.id);
        setModalError(null);
        setModalGame(game);
        setIsModalOpen(true);
        setIsModalLoading(false);

        if (!skipHistory) {
            pushModalHistory(href);
        }
    }, [pushModalHistory]);

    const fetchAndOpenById = useCallback(async (encodedId: string, { skipHistory = false } = {}) => {
        const decodedId = decodeURIComponent(encodedId);
        pendingIdRef.current = decodedId;
        setIsModalLoading(true);
        setModalError(null);

        try {
            const fetched = await fetchGameClientById(decodedId);
            const href = buildGameDetailHref(detailBasePath, fetched.id, currentQueryString);
            openModalWithGame(fetched, href, { skipHistory });
        } catch (error) {
            console.error('[games] failed to open modal', error);
            setModalGame(null);
            setIsModalOpen(true);
            setModalError(detailsCopy.errorDescription);
        } finally {
            setIsModalLoading(false);
        }
    }, [currentQueryString, detailBasePath, detailsCopy.errorDescription, openModalWithGame]);

    const handleCardNavigate = useCallback((game: Game, href: string, event?: MouseEvent<HTMLAnchorElement>) => {
        if (event?.currentTarget) {
            event.currentTarget.blur();
        }
        openModalWithGame(game, href);
    }, [openModalWithGame]);

    const closeModal = useCallback(() => {
        if (typeof window === 'undefined') {
            setIsModalOpen(false);
            setModalGame(null);
            setModalError(null);
            return;
        }

        window.history.back();
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const handlePopState = () => {
            const resolvedPath = normalizeBasePath(window.location.pathname);

            if (normalizedBase && resolvedPath.startsWith(`${normalizedBase}/`)) {
                const id = resolvedPath.slice(normalizedBase.length + 1) || '';
                const cacheKey = decodeURIComponent(id);
                const cached = knownGamesRef.current.get(cacheKey);
                const href = `${window.location.pathname}${window.location.search}`;

                if (cached) {
                    openModalWithGame(cached, href, { skipHistory: true });
                    return;
                }

                void fetchAndOpenById(id, { skipHistory: true });
                return;
            }

            setIsModalOpen(false);
            setModalGame(null);
            setModalError(null);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [fetchAndOpenById, normalizedBase, openModalWithGame]);

    const handleRetry = useCallback(() => {
        const id = pendingIdRef.current;
        if (!id) {
            return;
        }

        void fetchAndOpenById(encodeURIComponent(id), { skipHistory: true });
    }, [fetchAndOpenById]);

    return (
        <>
            <GameBrowser
                {...browserProps}
                copy={copy}
                detailBasePath={detailBasePath}
                onGameCardNavigate={handleCardNavigate}
                onFiltersQueryChange={setCurrentQueryString}
                onVisibleGamesChange={cacheGames}
            />

            <GameDetailsDialog
                open={isModalOpen}
                game={modalGame}
                isLoading={isModalLoading}
                error={modalError}
                copy={detailsCopy}
                onClose={closeModal}
                onRetry={handleRetry}
                backHref={listHref}
            />
        </>
    );
}
