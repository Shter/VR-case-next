'use client';

import { useCallback, useState } from 'react';
import type { StandaloneGameDialogProps } from '@/types/allTypes';
import { GameDetailsDialog } from './GameDetailsDialog';

export function StandaloneGameDialog({ game, copy, backHref, genres, preview }: StandaloneGameDialogProps) {
    const [closedGameId, setClosedGameId] = useState<StandaloneGameDialogProps['game']['id'] | null>(null);
    const currentGameId = game.id;
    const open = closedGameId !== currentGameId;

    const handleClose = useCallback(() => {
        setClosedGameId(currentGameId);

        if (typeof window === 'undefined') {
            return;
        }

        const historyState = window.history.state as { modal?: boolean } | null;

        if (historyState?.modal) {
            window.history.back();
            return;
        }

        window.history.replaceState(historyState ?? null, '', backHref);
    }, [backHref, currentGameId]);
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
