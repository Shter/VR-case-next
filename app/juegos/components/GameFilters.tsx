'use client';

import type { ChangeEvent } from 'react';
import type { GameFiltersProps } from '@/types/allTypes';

type FilterPillProps = {
    isActive: boolean;
    onClick: () => void;
    label: string;
};

const pillBaseClasses =
    'rounded-full border px-5 py-3 text-sm font-medium transition focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary focus-visible:ring-2 focus-visible:ring-primary/40';
const pillActiveClasses = 'border-primary bg-primary text-white shadow-lg';
const pillInactiveClasses =
    'border-white/20 text-white/75 hover:border-white hover:bg-white/10 hover:text-white focus-visible:border-white/70';

function FilterPill({ isActive, onClick, label }: FilterPillProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`${pillBaseClasses} ${isActive ? pillActiveClasses : pillInactiveClasses}`}
        >
            {label}
        </button>
    );
}

export function GameFilters({
    genres,
    selectedGenreIds,
    multiplayerFilter,
    searchValue,
    onToggleGenreAction,
    onResetGenresAction,
    onSelectMultiplayerFilterAction,
    onSearchChangeAction,
    copy
}: GameFiltersProps) {
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearchChangeAction(event.target.value);
    };

    return (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
            <div className="flex flex-col gap-2 lg:w-2/5">
                <label className="text-sm font-semibold uppercase tracking-wider" htmlFor="games-search">
                    {copy.search.label}
                </label>
                <input
                    id="games-search"
                    type="search"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder={copy.search.placeholder}
                    className="w-full rounded-full border border-white/20 px-5 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
                    autoComplete="off"
                    spellCheck={false}
                />
                {copy.search.helperText ? (
                    <p className="text-xs text-gray-500">{copy.search.helperText}</p>
                ) : null}
            </div>

            <div className="flex flex-col gap-2 lg:flex-1 border border-white/20 rounded-2xl p-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider">{copy.genres.label}</h2>
                <div className="flex flex-wrap gap-3">
                    <FilterPill
                        isActive={selectedGenreIds.length === 0}
                        onClick={onResetGenresAction}
                        label={copy.genres.allLabel}
                    />
                    {genres.map((genre) => {
                        const isActive = selectedGenreIds.includes(genre.id);
                        const label = genre.name?.trim().length ? genre.name : `${copy.genres.fallbackPrefix} ${genre.id}`;

                        return (
                            <FilterPill
                                key={genre.id}
                                isActive={isActive}
                                onClick={() => onToggleGenreAction(genre.id)}
                                label={label}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-col gap-2 lg:w-1/4 border border-white/20 rounded-2xl p-3">
                <span className="text-sm font-semibold uppercase tracking-wider">{copy.multiplayer.label}</span>
                <div className="flex flex-wrap gap-3">
                    {copy.multiplayer.options.map((option) => (
                        <FilterPill
                            key={option.value}
                            isActive={multiplayerFilter === option.value}
                            onClick={() => onSelectMultiplayerFilterAction(option.value)}
                            label={option.label}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
