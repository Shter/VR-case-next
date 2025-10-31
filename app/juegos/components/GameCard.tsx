'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { GameCardProps } from '@/types/allTypes';

function buildGameHref(gameId: number | string, queryString: string): string {
    const base = `/juegos/${encodeURIComponent(String(gameId))}`;

    if (!queryString) {
        return base;
    }

    return `${base}?${queryString}`;
}

export function GameCard({ game, queryString }: GameCardProps) {
    const name = typeof game.name === 'string' && game.name.trim().length > 0
        ? game.name.trim()
        : `Juego #${game.id}`;
    const coverUrl = typeof game.image_url === 'string' && game.image_url.trim().length > 0
        ? game.image_url
        : null;
    const href = buildGameHref(game.id, queryString);

    return (
        <Link
            //TODO fix type error
            // @ts-ignore
            href={href}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-soft transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                {coverUrl ? (
                    <Image
                        src={coverUrl}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                        unoptimized
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-medium text-gray-400">
                        Imagen no disponible
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                <span className="mt-auto inline-flex items-center text-sm font-medium text-primary">
                    Ver detalles
                    <span aria-hidden className="ml-1">→</span>
                </span>
            </div>
        </Link>
    );
}
