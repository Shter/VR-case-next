'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { GameCard } from './GameCard';
import type { GamesGridProps } from '@/types/allTypes';
import { toGameCacheKey } from '@/lib/games/cache';

const MIN_SINGLE_ROW_HEIGHT = 320;

function formatTemplate(template: string, values: Record<string, string>): string {
    return Object.entries(values).reduce((output, [key, value]) => (
        output.replace(new RegExp(`\\{${key}\\}`, 'g'), value)
    ), template);
}

export function GamesGrid({
    games,
    isLoading,
    isUiLoading,
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
    const showEmptyState = !isUiLoading && !isLoading && games.length === 0;
    const pendingPreviewCount = games.filter((game) => {
        if (!game.source_url) {
            return false;
        }
        const cacheKey = toGameCacheKey(game.id);
        return !previewsByGameId[cacheKey];
    }).length;
    const showPreviewOverlay = isPreviewLoading && pendingPreviewCount > 0;
    const showResultsOverlay = isUiLoading || showPreviewOverlay;
    const containerRef = useRef<HTMLDivElement | null>(null);
    const gridRef = useRef<HTMLDivElement | null>(null);
    const [frozenHeight, setFrozenHeight] = useState<number | null>(null);
    const lastRowHeightRef = useRef<number | null>(null);

    useLayoutEffect(() => {
        if (!showResultsOverlay) {
            if (frozenHeight !== null) {
                setFrozenHeight(null);
            }
            return;
        }

        const node = containerRef.current;
        if (!node) {
            if (frozenHeight === null) {
                setFrozenHeight(MIN_SINGLE_ROW_HEIGHT);
            }
            return;
        }

        const measured = node.getBoundingClientRect().height;
        if (!Number.isFinite(measured) || measured <= 0) {
            if (frozenHeight === null) {
                setFrozenHeight(MIN_SINGLE_ROW_HEIGHT);
            }
            return;
        }

        if (frozenHeight === null || Math.abs(frozenHeight - measured) > 1) {
            setFrozenHeight(measured);
        }
    }, [showResultsOverlay, frozenHeight]);

    useLayoutEffect(() => {
        if (showResultsOverlay || games.length === 0) {
            return;
        }

        const node = gridRef.current;
        if (!node) {
            return;
        }

        const height = node.getBoundingClientRect().height;
        if (Number.isFinite(height) && height > 0) {
            lastRowHeightRef.current = Math.max(height, MIN_SINGLE_ROW_HEIGHT);
        }
    }, [games.length, showResultsOverlay]);

    const lastRowHeight = Math.max(lastRowHeightRef.current ?? 0, MIN_SINGLE_ROW_HEIGHT);
    const resolvedEmptyMinHeight = showEmptyState && frozenHeight === null && !showResultsOverlay
        ? lastRowHeight
        : null;
    const frozenStyle = frozenHeight !== null
        ? { minHeight: frozenHeight }
        : resolvedEmptyMinHeight !== null
            ? { minHeight: resolvedEmptyMinHeight }
            : undefined;

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
            <div
                ref={containerRef}
                className="relative rounded-3xl border border-gray-200 bg-white p-4 md:p-6 shadow-soft"
                aria-busy={showResultsOverlay && !showEmptyState}
                style={frozenStyle}
            >
                {showResultsOverlay ? (
                    <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center justify-center gap-3 rounded-3xl bg-white/90 backdrop-blur-sm" style={{ minHeight: lastRowHeight }}>
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200" aria-hidden="true">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-primary" />
                        </span>
                        <span className="text-sm font-semibold text-gray-700">{copy.loadingLabel}</span>
                    </div>
                ) : null}

                <div
                    ref={showEmptyState ? undefined : gridRef}
                    className={clsx(
                        'min-h-[240px] transition-opacity duration-200',
                        showEmptyState
                            ? 'flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 px-6 py-10 text-center text-base text-gray-500'
                            : 'grid gap-6 md:grid-cols-3',
                        showResultsOverlay && 'opacity-0'
                    )}
                    aria-hidden={showResultsOverlay}
                    style={showEmptyState ? { minHeight: lastRowHeight } : undefined}
                >
                    {showEmptyState
                        ? copy.emptyState
                        : games.map((game) => (
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

                {!showEmptyState && hasResults ? (
                    <div className="mt-5 flex flex-col gap-4 rounded-3xl bg-white/80 p-3 md:flex-row md:items-center md:justify-between md:p-5">
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
                                className="inline-flex items-center rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover-border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {copy.pagination.nextLabel}
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
