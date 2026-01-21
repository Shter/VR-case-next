'use client';

import { useCallback, useEffect, useState } from 'react';
import type { StandaloneGameDialogProps } from '@/types/allTypes';
import { GameDetailsDialog } from './GameDetailsDialog';

export function StandaloneGameDialog({ game, copy, backHref, genres, preview }: StandaloneGameDialogProps) {
    const [open, setOpen] = useState(true);

    const handleClose = useCallback(() => {
        setOpen(false);

        if (typeof window === 'undefined') {
            return;
        }

        const historyState = window.history.state as { modal?: boolean } | null;

        if (historyState?.modal) {
            window.history.back();
            return;
        }

        window.history.replaceState(historyState ?? null, '', backHref);
    }, [backHref]);

    useEffect(() => {
        setOpen(true);
    }, [game]);

    return (
        <GameDetailsDialog
            open={open}
            game={game}
            isLoading={false}
            error={null}
            copy={copy}
            genres={genres}
            onCloseAction={handleClose}
            backHref={backHref}
            preview={preview ?? undefined}
        />
    );
}
