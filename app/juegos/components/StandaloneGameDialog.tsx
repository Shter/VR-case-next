'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { StandaloneGameDialogProps } from '@/types/allTypes';
import { GameDetailsDialog } from './GameDetailsDialog';

export function StandaloneGameDialog({ game, copy, backHref, genres, preview }: StandaloneGameDialogProps) {
    const router = useRouter();
    const [open, setOpen] = useState(true);

    const handleClose = useCallback(() => {
        setOpen(false);
        router.push(backHref, { scroll: true });
    }, [backHref, router]);

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
