import type { Game, GamePreview } from '@/types/allTypes';
import { fetchQuestStorePreview } from '@/lib/queststore/previews';

export async function fetchPreviewForGame(game: Game | null): Promise<GamePreview | null> {
    if (!game || typeof game.source_url !== 'string' || game.source_url.trim().length === 0) {
        return null;
    }

    try {
        const preview = await fetchQuestStorePreview(game.source_url);
        return {
            gameId: game.id,
            posterUrl: preview.posterUrl,
            description: preview.description,
            videoUrl: preview.videoUrl,
            sourceUrl: preview.canonicalUrl ?? game.source_url,
            fetchedAt: new Date().toISOString()
        } satisfies GamePreview;
    } catch (error) {
        console.error('[games] failed to fetch preview for game', game.id, error);
        return null;
    }
}
