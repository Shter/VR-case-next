'use client';

import { useEffect, useRef } from 'react';
import { GameCard } from './GameCard';
import type { GamesGridProps } from '@/types/allTypes';

export function GamesGrid({
    games,
    isLoading,
    isLoadingMore,
    hasMore,
    filtersQueryString,
    onLoadMore,
    detailBasePath,
    copy,
    onGameCardNavigate
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

    return (
        <div className="flex flex-col gap-8">
            {showEmptyState ? (
                <p className="mx-auto max-w-xl text-center text-base text-gray-500">
                    {copy.emptyState}
                </p>
            ) : (
                <div className="grid gap-6 md:grid-cols-3">
                    {games.map((game) => (
                        <GameCard
                            key={String(game.id)}
                            game={game}
                            queryString={filtersQueryString}
                            detailBasePath={detailBasePath}
                            copy={copy}
                            onNavigate={onGameCardNavigate}
                        />
                    ))}
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
                        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoadingMore ? copy.loadMoreLoadingLabel : copy.loadMoreLabel}
                    </button>
                </div>
            ) : null}
        </div>
    );
}
