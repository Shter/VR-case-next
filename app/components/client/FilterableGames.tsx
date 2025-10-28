'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams }         from 'next/navigation';
import { FilterableGamesProps, GameCardProps, GameRecord } from "@/types/allTypes";
import { FilterButton }                                    from "@/components/client/FiltereButton";

const CATEGORY_FIELDS = ['category', 'categories', 'genre', 'genres', 'tags'] as const;

function sanitizeCategories(list: string[]): string[] {
    const seen = new Set<string>();
    const result: string[] = [];

    list.forEach((item) => {
        const value = item.trim();
        if (!value || seen.has(value)) {
            return;
        }

        seen.add(value);
        result.push(value);
    });

    return result;
}

function areArraysEqual(a: string[], b: string[]): boolean {
    if (a.length !== b.length) {
        return false;
    }

    return a.every((value, index) => value === b[index]);
}

function normalizeCategoryValue(value: unknown): string[] {
    if (!value) return [];

    if (typeof value === 'string') {
        return value
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean);
    }

    if (Array.isArray(value)) {
        return value
            .flatMap((item) => normalizeCategoryValue(item))
            .filter(Boolean);
    }

    return [];
}

function collectCategories(game: GameRecord): string[] {
    const categories = new Set<string>();

    CATEGORY_FIELDS.forEach((field) => {
        const value = game[field];
        normalizeCategoryValue(value).forEach((item) => categories.add(item));
    });

    return Array.from(categories);
}

function isMultiplayer(game: GameRecord): boolean {
    const value = game.multiplayer;

    if (typeof value === 'boolean') {
        return value;
    }

    return false;
}

function GameCard({ game, queryString }: GameCardProps) {
    const title = game.title ?? game.name ?? `Juego #${game.id}`;
    const description = game.description as string | null | undefined;
    const cover = game.image_url as string | null | undefined;
    const href = `/juegos/${encodeURIComponent(String(game.id))}${queryString}`;

    return (
        <Link
            //Todo fix
            // @ts-ignore
            href={href}
            className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
            {cover ? (
                <div className="h-48 w-full overflow-hidden">
                    <img
                        src={cover}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                </div>
            ) : null}

            <div className="flex flex-1 flex-col gap-4 p-6">
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                {description ? (
                    <p className="text-sm text-gray-600">{description}</p>
                ) : (
                    <p className="text-sm text-gray-500">Descripción aparecerá pronto.</p>
                )}
                <span className="mt-auto text-sm font-medium text-primary">Ver detalles →</span>
            </div>
        </Link>
    );
}

export function FilterableGames({ games, initialCategories, initialShowMultiplayer }: FilterableGamesProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [selectedCategories, setSelectedCategories] = useState<string[]>(() => sanitizeCategories(initialCategories));
    const [showMultiplayer, setShowMultiplayer] = useState<boolean>(initialShowMultiplayer);

    useEffect(() => {
        const categoriesParam = searchParams.get('categories');
        const showParam = searchParams.get('showMultiplayer');

        const nextCategories = categoriesParam ? sanitizeCategories(categoriesParam.split(',')) : [];
        const nextShowMultiplayer = showParam !== '0';

        setSelectedCategories((prev) => (areArraysEqual(prev, nextCategories) ? prev : nextCategories));
        setShowMultiplayer((prev) => (prev === nextShowMultiplayer ? prev : nextShowMultiplayer));
    }, [searchParams]);

    const { categories, filteredGames } = useMemo(() => {
        const categorySet = new Set<string>();

        games.forEach((game) => {
            collectCategories(game).forEach((category) => {
                if (!categorySet.has(category)) {
                    categorySet.add(category);
                }
            });
        });

        const derivedCategories = Array.from(categorySet).sort((a, b) => a.localeCompare(b));

        const loweredSelected = selectedCategories.map((item) => item.toLowerCase());

        const filteredByCategory = loweredSelected.length === 0
            ? games
            : games.filter((game) => {
                const gameCategories = collectCategories(game).map((item) => item.toLowerCase());
                return loweredSelected.some((selected) => gameCategories.includes(selected));
            });

        const filtered = filteredByCategory.filter((game) => {
            if (showMultiplayer) {
                return true;
            }

            return !isMultiplayer(game);
        });

        return {
            categories: derivedCategories,
            filteredGames: filtered
        };
    }, [games, selectedCategories, showMultiplayer]);

    const visibleGames = filteredGames.slice(0, 6);
    const hiddenCount = filteredGames.length - visibleGames.length;

    const filterQuery = useMemo(() => {
        const params = new URLSearchParams();

        if (selectedCategories.length > 0) {
            params.set('categories', selectedCategories.join(','));
        }

        if (!showMultiplayer) {
            params.set('showMultiplayer', '0');
        }

        const queryString = params.toString();

        return queryString ? `?${queryString}` : '';
    }, [selectedCategories, showMultiplayer]);

    useEffect(() => {
        const desired = filterQuery ? filterQuery.slice(1) : '';
        const current = searchParams.toString();

        if (desired === current) {
            return;
        }

        const target = desired ? `${pathname}?${desired}` : pathname;
        // Todo fix
        // @ts-ignore
        router.replace(target, { scroll: false });
    }, [filterQuery, pathname, router, searchParams]);

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-wrap items-center gap-3">
                <FilterButton
                    isActive={selectedCategories.length === 0}
                    onClick={() => setSelectedCategories([])}
                >
                    Todas
                </FilterButton>

                {categories.map((category) => {
                    const isActive = selectedCategories.some((item) => item === category);
                    const toggleCategory = () => {
                        setSelectedCategories((prev) => (
                            prev.some((item) => item === category)
                                ? prev.filter((item) => item !== category)
                                : [...prev, category]
                        ));
                    };

                    return (
                        <FilterButton
                            key={category}
                            isActive={isActive}
                            onClick={toggleCategory}
                        >
                            {category}
                        </FilterButton>
                    );
                })}
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">Multijugador</span>
                <FilterButton
                    isActive={showMultiplayer}
                    onClick={() => setShowMultiplayer((prev) => !prev)}
                >
                    {showMultiplayer ? 'Ocultar juegos multijugador' : 'Mostrar juegos multijugador'}
                </FilterButton>
            </div>

            {visibleGames.length === 0 ? (
                <p className="mx-auto max-w-2xl text-center text-gray-500">
                    No hay juegos que coincidan con los filtros seleccionados.
                </p>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleGames.map((game) => (
                        <GameCard key={String(game.id)} game={game} queryString={filterQuery} />
                    ))}
                </div>
            )}

            {hiddenCount > 0 ? (
                <p className="text-center text-sm text-gray-500">
                    Se muestran {visibleGames.length} de {filteredGames.length} juegos. Ajustá los filtros para encontrar un título específico.
                </p>
            ) : null}
        </div>
    );
}
