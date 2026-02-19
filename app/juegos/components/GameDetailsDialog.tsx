'use client';

import Image from 'next/image';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { AppDialog } from '@/components/client/AppDialog';
import type { GameDetailsDialogProps } from '@/types/allTypes';
import { formatPlayerCountLabel, isMultiplayerGame } from '@/lib/juegos/playerCounts';

function resolveGenreValue(
    genreIds: number[] | null | undefined,
    genres: GameDetailsDialogProps['genres'],
    fallbackPrefix: string
): string | null {
    if (!Array.isArray(genreIds) || genreIds.length === 0) {
        return null;
    }

    const lookup = new Map<number, string>();

    genres.forEach((genre) => {
        const trimmed = genre.name?.trim();
        if (trimmed) {
            lookup.set(genre.id, trimmed);
        }
    });

    const labels = genreIds
        .map((id) => lookup.get(id) ?? `${fallbackPrefix} ${id}`)
        .map((label) => label.trim())
        .filter((label) => label.length > 0);

    if (labels.length === 0) {
        return null;
    }

    return labels.join(', ');
}

function Section({ title, content }: { title: string; content: string }) {
    return (
        <section className="flex flex-col gap-2">
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">{content}</p>
        </section>
    );
}

function SummaryCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white/80 px-4 py-4 shadow-sm">
            <div className="flex w-full flex-row flex-wrap items-baseline justify-between gap-4">
                <p className="text-base font-semibold uppercase tracking-wide text-gray-400 whitespace-nowrap">
                    {title}
                </p>
                <p className="break-words text-right text-base font-semibold text-gray-900">
                    {value}
                </p>
            </div>
        </div>
    );
}

export function GameDetailsDialog({
    open,
    game,
    isLoading,
    error,
    copy,
    genres,
    onCloseAction,
    onRetryAction,
    preview
}: GameDetailsDialogProps) {
    const fallbackTitle = game?.id ? `${copy.fallbackNamePrefix} ${game.id}` : copy.fallbackNamePrefix;
    const title = game?.name ?? fallbackTitle;
    const coverUrl = preview?.posterUrl ?? null;
    const description = preview?.description ?? copy.descriptionPlaceholder;
    const videoUrl = preview?.videoUrl ?? null;
    const isMultiplayer = isMultiplayerGame(game ?? undefined);
    const playerCountLabel = formatPlayerCountLabel(game ?? undefined, copy);
    let bodyContent;

    if (isLoading) {
        bodyContent = (
            <div className="flex flex-col items-center gap-3 py-6 text-sm text-gray-500">
                <CircularProgress size={32} />
                <span>{copy.loadingLabel}</span>
            </div>
        );
    } else if (error) {
        bodyContent = (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
                <p className="text-base text-gray-700">{error}</p>
                {onRetryAction ? (
                    <Button variant="contained" color="primary" onClick={onRetryAction}>
                        {copy.retryLabel}
                    </Button>
                ) : null}
            </div>
        );
    } else if (game) {
        const genreContent = resolveGenreValue(game.genre, genres, copy.genreFallbackPrefix) ?? copy.genrePlaceholder;

        bodyContent = (
            <div className="flex flex-col gap-6">
                {videoUrl ? (
                    <div className="overflow-hidden rounded-2xl">
                        <video
                            controls
                            playsInline
                            poster={coverUrl ?? undefined}
                            className="h-full w-full"
                        >
                            <source src={videoUrl} />
                        </video>
                    </div>
                ) : coverUrl ? (
                    <div className="overflow-hidden rounded-2xl">
                        <Image
                            src={coverUrl}
                            alt={title}
                            width={960}
                            height={540}
                            className="h-full w-full object-cover"
                            sizes="(min-width: 768px) 60vw, 90vw"
                            unoptimized
                        />
                    </div>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-2">
                    <SummaryCard title={copy.genreHeading} value={genreContent} />
                    <SummaryCard title={copy.playersHeading} value={playerCountLabel} />
                </div>

                <Section
                    title={copy.descriptionHeading}
                    content={description}
                />

                <Section
                    title={copy.controlsHeading}
                    content={game.controls ?? copy.controlsPlaceholder}
                />

                {isMultiplayer ? (
                    <Section
                        title={copy.multiplayerInstructionsHeading}
                        content={game.multiplayer_instructions ?? copy.multiplayerInstructionsPlaceholder}
                    />
                ) : null}
            </div>
        );
    } else {
        bodyContent = (
            <p className="py-6 text-center text-sm text-gray-500">{copy.descriptionPlaceholder}</p>
        );
    }

    return (
        <AppDialog
            open={open}
            onCloseAction={onCloseAction}
            title={title}
            closeLabel={copy.closeLabel}
        >
            {bodyContent}
        </AppDialog>
    );
}
