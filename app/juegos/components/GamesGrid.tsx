'use client';

import clsx from 'clsx';
import { GameCard } from './GameCard';
import type { GamesGridProps } from '@/types/allTypes';
import { toGameCacheKey } from '@/lib/games/cache';

function formatTemplate(template: string, values: Record<string, string>): string {
    return Object.entries(values).reduce((output, [key, value]) => (
        output.replace(new RegExp(`\\{${key}\\}`, 'g'), value)
    ), template);
}

export function GamesGrid({
    games,
    isLoading,
    currentPage,
    totalPages,
    totalResults,
    pageSize,
    filtersQueryString,
    onPageChange,
    detailBasePath,
    copy,
    onGameCardNavigateAction,
    previewsByGameId,
    isPreviewLoading
}: GamesGridProps) {
    const showEmptyState = !isLoading && games.length === 0;
    const pendingPreviewCount = games.filter((game) => {
        if (!game.source_url) {
            return false;
        }
        const cacheKey = toGameCacheKey(game.id);
        return !previewsByGameId[cacheKey];
    }).length;
    const showPreviewOverlay = isPreviewLoading && pendingPreviewCount > 0;

    const safeTotalPages = Math.max(totalPages, 1);
    const safeCurrentPage = Math.min(Math.max(currentPage, 1), safeTotalPages);
    const hasResults = totalResults > 0;
    const rangeStart = hasResults ? (safeCurrentPage - 1) * pageSize + 1 : 0;
    const rangeEnd = hasResults ? Math.min(rangeStart + games.length - 1, totalResults) : 0;
    const rangeLabel = formatTemplate(copy.pagination.rangeLabel, {
        from: String(hasResults ? rangeStart : 0),
        to: String(hasResults ? Math.max(rangeEnd, rangeStart) : 0),
        total: String(totalResults)
    });
    const pageStatusLabel = formatTemplate(copy.pagination.pageStatusLabel, {
        current: String(safeCurrentPage),
        total: String(safeTotalPages)
    });

    const handlePrevious = () => {
        if (safeCurrentPage <= 1) {
            return;
        }
        onPageChange(safeCurrentPage - 1);
    };

    const handleNext = () => {
        if (safeCurrentPage >= safeTotalPages) {
            return;
        }
        onPageChange(safeCurrentPage + 1);
    };

    return (
        <div className="flex flex-col gap-8">
            {showEmptyState ? (
                <p className="mx-auto max-w-xl text-center text-base text-gray-500">
                    {copy.emptyState}
                </p>
            ) : (
                <div className="relative rounded-3xl border border-gray-200 bg-white p-4 md:p-6 shadow-soft" aria-busy={showPreviewOverlay}>
                    {showPreviewOverlay ? (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-3xl bg-white/90 backdrop-blur-sm">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200" aria-hidden="true">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-primary" />
                            </span>
                            <span className="text-sm font-semibold text-gray-700">{copy.loadingLabel}</span>
                        </div>
                    ) : null}

                    <div
                        className={clsx(
                            'grid gap-6 transition-opacity duration-200 md:grid-cols-3',
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
                                onNavigate={onGameCardNavigateAction}
                                preview={previewsByGameId[toGameCacheKey(game.id)]}
                            />
                        ))}
                    </div>
                    {hasResults ? (
                        <div className="flex flex-col gap-4 rounded-3xl bg-white/80 md:flex-row md:items-center md:justify-between p-3 md:p-5">
                            <p className="text-sm text-gray-600">{rangeLabel}</p>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handlePrevious}
                                    disabled={safeCurrentPage <= 1 || isLoading}
                                    className="inline-flex items-center rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {copy.pagination.previousLabel}
                                </button>
                                <span className="text-sm font-semibold text-gray-800">{pageStatusLabel}</span>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={safeCurrentPage >= safeTotalPages || isLoading}
                                    className="inline-flex items-center rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {copy.pagination.nextLabel}
                                </button>
                            </div>
                        </div>
                    ) : null}
                </div>
            )}

            {isLoading ? (
                <p className="text-center text-sm text-gray-400">{copy.loadingLabel}</p>
            ) : null}


        </div>
    );
}
