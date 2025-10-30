'use client';

import { GameCard } from './GameCard';
import type { GamesGridProps } from '@/types/allTypes';

export function GamesGrid({ games, isLoading, isLoadingMore, hasMore, filtersQueryString, onLoadMore }: GamesGridProps) {
    const showEmptyState = !isLoading && games.length === 0;

    return (
        <div className="flex flex-col gap-8">
            {showEmptyState ? (
                <p className="mx-auto max-w-xl text-center text-base text-gray-500">
                    No encontramos juegos que coincidan con los filtros seleccionados.
                </p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {games.map((game) => (
                        <GameCard key={String(game.id)} game={game} queryString={filtersQueryString} />
                    ))}
                </div>
            )}

            {isLoading ? (
                <p className="text-center text-sm text-gray-400">Actualizando lista de juegos…</p>
            ) : null}

            {hasMore ? (
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={onLoadMore}
                        disabled={isLoadingMore}
                        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoadingMore ? 'Cargando…' : 'Cargar más juegos'}
                    </button>
                </div>
            ) : null}
        </div>
    );
}
