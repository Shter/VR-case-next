'use client';

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

export function GameFilters({
    genres,
    selectedGenreIds,
    multiplayerOnly,
    onToggleGenre,
    onResetGenres,
    onToggleMultiplayerOnly
}: GameFiltersProps) {
    return (
        <div className="flex flex-col gap-8">
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
                <FilterPill
                    isActive={multiplayerOnly}
                    onClick={onToggleMultiplayerOnly}
                    label={multiplayerOnly ? 'Solo multijugador' : 'Todos los juegos'}
                />
            </div>
        </div>
    );
}
