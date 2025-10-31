'use client';

import type { ChangeEvent } from 'react';
import type { GameFiltersProps, Genre } from '@/types/allTypes';

type FilterPillProps = {
    isActive: boolean;
    onClick: () => void;
    label: string;
};

function FilterPill({ isActive, onClick, label }: FilterPillProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                isActive
                    ? 'border-primary bg-primary text-white shadow-sm'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary'
            }`}
        >
            {label}
        </button>
    );
}

function formatGenreName(genre: Genre): string {
    return genre.name.trim().length > 0 ? genre.name : `Género #${genre.id}`;
}

const MULTIPLAYER_OPTIONS: Array<{ value: 'all' | 'multiplayer' | 'solo'; label: string }> = [
    { value: 'all', label: 'Todos' },
    { value: 'multiplayer', label: 'Multijugador' },
    { value: 'solo', label: 'Un jugador' }
];

export function GameFilters({
    genres,
    selectedGenreIds,
    multiplayerFilter,
    searchValue,
    onToggleGenre,
    onResetGenres,
    onSelectMultiplayerFilter,
    onSearchChange
}: GameFiltersProps) {
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold uppercase tracking-wider text-gray-500" htmlFor="games-search">
                    Buscar juegos
                </label>
                <input
                    id="games-search"
                    type="search"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Ingresá el nombre del juego"
                    className="w-full rounded-full border border-gray-200 px-5 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40 lg:w-2/5"
                    autoComplete="off"
                    spellCheck={false}
                />
                <p className="text-xs text-gray-500">El buscador se activa a partir de dos letras.</p>
            </div>

            <div className="flex flex-col gap-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Géneros</h2>
                <div className="flex flex-wrap items-center gap-3">
                    <FilterPill
                        isActive={selectedGenreIds.length === 0}
                        onClick={onResetGenres}
                        label="Todos"
                    />
                    {genres.map((genre) => {
                        const isActive = selectedGenreIds.includes(genre.id);
                        return (
                            <FilterPill
                                key={genre.id}
                                isActive={isActive}
                                onClick={() => onToggleGenre(genre.id)}
                                label={formatGenreName(genre)}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">Multijugador</span>
                {MULTIPLAYER_OPTIONS.map((option) => (
                    <FilterPill
                        key={option.value}
                        isActive={multiplayerFilter === option.value}
                        onClick={() => onSelectMultiplayerFilter(option.value)}
                        label={option.label}
                    />
                ))}
            </div>
        </div>
    );
}
