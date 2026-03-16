'use client';

import type { MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { GameCardProps } from '@/types/allTypes';
import { buildGameDetailHref } from '@/lib/games/links';

function isModifiedEvent(event: MouseEvent<HTMLAnchorElement>): boolean {
    return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

export function GameCard({ game, queryString, detailBasePath, copy, onNavigateAction, preview }: GameCardProps) {
    const name = typeof game.name === 'string' && game.name.trim().length > 0
        ? game.name.trim()
        : `${copy.card.fallbackNamePrefix} ${game.id}`;
    const previewPoster = typeof preview?.posterUrl === 'string' ? preview.posterUrl.trim() : '';
    const coverUrl = previewPoster.length > 0 ? previewPoster : null;
    const href = buildGameDetailHref(detailBasePath, game.id, queryString);

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (!onNavigateAction || isModifiedEvent(event)) {
            return;
        }

        event.preventDefault();
        onNavigateAction(game, href, event);
    };

    return (
        <Link
            href={href}
            onClick={handleClick}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/20 bg-white/5 text-white shadow-soft backdrop-blur transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-primary/60"
        >
            <div className="relative h-48 w-full overflow-hidden border-b border-white/10 bg-white/10">
                {coverUrl ? (
                    <Image
                        src={coverUrl}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                        unoptimized
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-medium text-white/60">
                        {copy.card.fallbackCoverLabel}
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="flex-1 self-center text-lg font-semibold text-white">{name}</h3>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 text-lg text-white/80 transition group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                        <span aria-hidden>→</span>
                    </span>
                </div>
            </div>
        </Link>
    );
}
