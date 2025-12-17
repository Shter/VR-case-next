'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { GameCard } from './GameCard';
import type { GamesGridProps } from '@/types/allTypes';
import { toGameCacheKey } from '@/lib/games/cache';

export function GamesGrid({
    games,
    isLoading,
    isLoadingMore,
    hasMore,
    filtersQueryString,
    onLoadMore,
    detailBasePath,
    copy,
    onGameCardNavigate,
    previewsByGameId,
    isPreviewLoading
}: GamesGridProps) {
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!hasMore || isLoading || isLoadingMore) {
            return undefined;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    onLoadMore();
                }
            });
        }, {
            rootMargin: '240px'
        });

        const element = sentinelRef.current;

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
            observer.disconnect();
        };
    }, [hasMore, isLoading, isLoadingMore, onLoadMore]);

    const showEmptyState = !isLoading && games.length === 0;
    const pendingPreviewCount = games.filter((game) => {
        if (!game.source_url) {
            return false;
        }
        const cacheKey = toGameCacheKey(game.id);
        return !previewsByGameId[cacheKey];
    }).length;
    const showPreviewOverlay = isPreviewLoading && pendingPreviewCount > 0;

    return (
        <div className="flex flex-col gap-8">
            {showEmptyState ? (
                <p className="mx-auto max-w-xl text-center text-base text-gray-500">
                    {copy.emptyState}
                </p>
            ) : (
                <div className="relative" aria-busy={showPreviewOverlay}>
                    {showPreviewOverlay ? (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/90 backdrop-blur-sm">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200" aria-hidden="true">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-primary" />
                            </span>
                            <span className="text-sm font-semibold text-gray-700">{copy.loadingLabel}</span>
                        </div>
                    ) : null}
                    <div
                        className={clsx(
                            'grid gap-6 md:grid-cols-3 transition-opacity duration-200',
                            showPreviewOverlay && 'opacity-0'
                        )}
                        aria-hidden={showPreviewOverlay}
                    >
                        {games.map((game) => (
                            <GameCard
                                key={String(game.id)}
                                game={game}
                                queryString={filtersQueryString}
                                detailBasePath={detailBasePath}
                                copy={copy}
                                onNavigate={onGameCardNavigate}
                                preview={previewsByGameId[toGameCacheKey(game.id)]}
                            />
                        ))}
                    </div>
                </div>
            )}

            {isLoading ? (
                <p className="text-center text-sm text-gray-400">{copy.loadingLabel}</p>
            ) : null}

            {hasMore ? (
                <div className="flex flex-col items-center gap-4">
                    <div ref={sentinelRef} aria-hidden className="h-1 w-full" />
                    <button
                        type="button"
                        onClick={onLoadMore}
                        disabled={isLoadingMore}
                        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoadingMore ? copy.loadMoreLoadingLabel : copy.loadMoreLabel}
                    </button>
                </div>
            ) : null}
        </div>
    );
}
