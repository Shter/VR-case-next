'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { AppDialog } from '@/components/client/AppDialog';
import type { GameDetailsDialogProps } from '@/types/allTypes';

function Section({ title, content }: { title: string; content: string }) {
    return (
        <section className="flex flex-col gap-2">
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">{content}</p>
        </section>
    );
}

export function GameDetailsDialog({
    open,
    game,
    isLoading,
    error,
    copy,
    onClose,
    onRetry,
    backHref
}: GameDetailsDialogProps) {
    const fallbackTitle = game?.id ? `${copy.fallbackNamePrefix} ${game.id}` : copy.fallbackNamePrefix;
    const title = game?.name ?? fallbackTitle;
    const coverUrl = game?.image_url ?? null;
    const isMultiplayer = game?.multiplayer === true;

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
                {onRetry ? (
                    <Button variant="contained" color="primary" onClick={onRetry}>
                        {copy.retryLabel}
                    </Button>
                ) : null}
            </div>
        );
    } else if (game) {
        bodyContent = (
            <div className="flex flex-col gap-6">
                {coverUrl ? (
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

                <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {isMultiplayer ? copy.multiplayerBadgeLabel : copy.soloBadgeLabel}
                    </span>
                </div>

                <Section
                    title={copy.descriptionHeading}
                    content={game.description ?? copy.descriptionPlaceholder}
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

    const actions = backHref
        ? (
            <Button component={Link} href={backHref} color="primary" variant="outlined">
                {copy.backButtonLabel}
            </Button>
        )
        : null;

    return (
        <AppDialog
            open={open}
            onCloseAction={onClose}
            title={title}
            description={copy.tagline}
            closeLabel={copy.closeLabel}
            actions={actions}
        >
            {bodyContent}
        </AppDialog>
    );
}
