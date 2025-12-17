import { NextResponse } from 'next/server';
import { fetchQuestStorePreview } from '@/lib/queststore/previews';
import type {
    GamePreview,
    GamePreviewError,
    GamePreviewRequestItem,
    GamePreviewsResponse
} from '@/types/allTypes';

export const runtime = 'nodejs';

const MAX_GAMES_PER_REQUEST = 6;

type Payload = {
    games?: Array<{
        id: number | string;
        sourceUrl?: string | null;
    }>;
};

function sanitizeUrl(value: unknown): string | null {
    if (typeof value !== 'string') {
        return null;
    }

    try {
        const parsed = new URL(value);
        if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
            return null;
        }
        return parsed.toString();
    } catch {
        return null;
    }
}

function sanitizeGameId(rawId: unknown): string | number | null {
    if (typeof rawId === 'number' && Number.isFinite(rawId)) {
        return rawId;
    }

    if (typeof rawId === 'string' && rawId.trim().length > 0) {
        return rawId.trim();
    }

    return null;
}

function redactTargets(payload: Payload): GamePreviewRequestItem[] {
    if (!payload.games || !Array.isArray(payload.games)) {
        return [];
    }

    return payload.games.slice(0, MAX_GAMES_PER_REQUEST)
        .map((entry) => {
            const id = sanitizeGameId(entry.id);
            const sourceUrl = sanitizeUrl(entry.sourceUrl);

            if (!id || !sourceUrl) {
                return null;
            }

            return { id, sourceUrl } satisfies GamePreviewRequestItem;
        })
        .filter((target): target is GamePreviewRequestItem => target !== null);
}

function buildResponse(previews: GamePreview[], errors: GamePreviewError[] = []) {
    const body: GamePreviewsResponse = errors.length > 0
        ? { previews, errors }
        : { previews };
    const status = previews.length === 0 && errors.length > 0 ? 502 : 200;

    return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
    let payload: Payload;

    try {
        payload = await request.json();
    } catch (error) {
        console.error('[game-previews] invalid payload', error);
        return NextResponse.json({ error: 'invalid-payload' }, { status: 400 });
    }

    const targets = redactTargets(payload);

    if (targets.length === 0) {
        return NextResponse.json({ previews: [] } satisfies GamePreviewsResponse);
    }

    const settled = await Promise.allSettled(targets.map(async (target) => {
        const preview = await fetchQuestStorePreview(target.sourceUrl);

        return {
            gameId: target.id,
            posterUrl: preview.posterUrl,
            description: preview.description,
            videoUrl: preview.videoUrl,
            sourceUrl: target.sourceUrl,
            fetchedAt: new Date().toISOString()
        } satisfies GamePreview;
    }));

    const previews: GamePreview[] = [];
    const errors: GamePreviewError[] = [];

    settled.forEach((result, index) => {
        const target = targets[index];

        if (result.status === 'fulfilled') {
            previews.push(result.value);
            return;
        }

        console.error('[game-previews] failed to fetch', target?.sourceUrl, result.reason);
        errors.push({
            gameId: target.id,
            message: result.reason instanceof Error ? result.reason.message : 'preview-failed'
        });
    });

    return buildResponse(previews, errors);
}
