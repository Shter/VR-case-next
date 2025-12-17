'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { AppDialog } from '@/components/client/AppDialog';
import type { GameDetailsDialogProps } from '@/types/allTypes';

const EXCLUDED_FIELDS = new Set(['id', 'created_at']);

type FieldEntry = {
    key: string;
    label: string;
    value: string;
    href?: string;
};

function formatLabel(key: string): string {
    return key
        .replace(/_/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/^(\w)/, (match) => match.toUpperCase());
}

function formatValue(value: unknown): { display: string; href?: string } {
    if (value === null || typeof value === 'undefined') {
        return { display: 'Sin datos' };
    }

    if (Array.isArray(value)) {
        if (value.length === 0) {
            return { display: 'Sin datos' };
        }
        return { display: value.map((item) => String(item)).join(', ') };
    }

    if (typeof value === 'boolean') {
        return { display: value ? 'Sí' : 'No' };
    }

    if (typeof value === 'number') {
        return { display: value.toString() };
    }

    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed) {
            return { display: 'Sin datos' };
        }

        if (/^https?:\/\//i.test(trimmed)) {
            return { display: trimmed, href: trimmed };
        }

        return { display: trimmed };
    }

    try {
        return { display: JSON.stringify(value) };
    } catch {
        return { display: 'Sin datos' };
    }
}

function buildFieldEntries(game: GameDetailsDialogProps['game']): FieldEntry[] {
    if (!game) {
        return [];
    }

    const entries: FieldEntry[] = [];

    Object.entries(game as Record<string, unknown>).forEach(([key, value]) => {
        if (EXCLUDED_FIELDS.has(key)) {
            return;
        }

        const { display, href } = formatValue(value);
        entries.push({ key, label: formatLabel(key), value: display, href });
    });

    return entries;
}

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
    backHref,
    preview
}: GameDetailsDialogProps) {
    const fallbackTitle = game?.id ? `${copy.fallbackNamePrefix} ${game.id}` : copy.fallbackNamePrefix;
    const title = game?.name ?? fallbackTitle;
    const coverUrl = preview?.posterUrl ?? null;
    const description = preview?.description ?? copy.descriptionPlaceholder;
    const videoUrl = preview?.videoUrl ?? null;
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

                <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {isMultiplayer ? copy.multiplayerBadgeLabel : copy.soloBadgeLabel}
                    </span>
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

                {(() => {
                    const fieldEntries = buildFieldEntries(game);

                    if (fieldEntries.length === 0) {
                        return null;
                    }

                    return (
                        <div className="flex flex-col gap-3">
                            <h3 className="text-base font-semibold text-gray-900">Campos de la tabla</h3>
                            <dl className="grid gap-3">
                                {fieldEntries.map((entry) => (
                                    <div key={entry.key} className="flex flex-col gap-1">
                                        <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            {entry.label}
                                        </dt>
                                        <dd className="text-sm text-gray-800 break-words">
                                            {entry.href ? (
                                                <Link href={entry.href} target="_blank" rel="noreferrer noopener" className="text-primary underline">
                                                    {entry.value}
                                                </Link>
                                            ) : (
                                                entry.value
                                            )}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    );
                })()}
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
