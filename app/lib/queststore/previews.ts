import { load } from 'cheerio';
import { sanitizeDescriptionText } from '@/lib/text/sanitizers';

export type QuestStorePreviewResult = {
    posterUrl: string | null;
    description: string | null;
    videoUrl: string | null;
    canonicalUrl: string | null;
};

const QUEST_STORE_ORIGIN = 'https://queststoredb.com';
const REQUEST_HEADERS: HeadersInit = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'accept-language': 'en-US,en;q=0.9,es;q=0.8',
    referer: 'https://queststoredb.com/'
};

function resolveUrl(value: string | null | undefined, base: string = QUEST_STORE_ORIGIN): string | null {
    if (!value) {
        return null;
    }

    const trimmed = value.trim();

    if (!trimmed || trimmed.startsWith('data:')) {
        return null;
    }

    try {
        return new URL(trimmed, base).toString();
    } catch (error) {
        console.error('[queststore] failed to resolve url', value, error);
        return null;
    }
}

function normalizeTargetUrl(rawUrl: string): string {
    if (rawUrl.trim().length === 0) {
        throw new Error('missing-target-url');
    }

    try {
        return new URL(rawUrl).toString();
    } catch {
        return new URL(rawUrl, QUEST_STORE_ORIGIN).toString();
    }
}

function extractPosterUrl($: ReturnType<typeof load>, fallbackBase: string): string | null {
    const posterCandidates = $('[data-carousel-viewport] video, .data-carousel-viewport video, video[poster]');

    for (let index = 0; index < posterCandidates.length; index += 1) {
        const candidate = posterCandidates.eq(index);
        const poster = candidate.attr('poster');

        if (poster) {
            const resolved = resolveUrl(poster, fallbackBase);
            if (resolved) {
                return resolved;
            }
        }
    }

    return null;
}

function extractDescription($: ReturnType<typeof load>): string | null {
    let paragraphs = $('[data-collapse-long-text].app-details-about p');

    if (paragraphs.length === 0) {
        paragraphs = $('[data-collapse-long-text] p');
    }
    const collected: string[] = [];

    paragraphs.each((_, element) => {
        const textNodes = $(element)
            .contents()
            .filter((_, node) => node.type === 'text' && ((node as { data?: string }).data ?? '').trim().length > 0)
            .toArray();

        if (textNodes.length === 0) {
            return;
        }

        const text = textNodes
            .map((node) => (((node as { data?: string }).data ?? '')).replace(/\s+/g, ' ').trim())
            .filter((value) => value.length > 0)
            .join(' ');

        if (text.length > 0) {
            collected.push(text);
        }
    });

    if (collected.length === 0) {
        return null;
    }

    return sanitizeDescriptionText(collected.join('\n\n'));
}

function extractVideoUrl($: ReturnType<typeof load>, fallbackBase: string): string | null {
    const videoCandidates = $('[data-carousel-viewport] video, .data-carousel-viewport video, video[src]');

    for (let index = 0; index < videoCandidates.length; index += 1) {
        const candidate = videoCandidates.eq(index);
        const source = candidate.attr('src');

        if (source) {
            const resolved = resolveUrl(source, fallbackBase);
            if (resolved) {
                return resolved;
            }
        }
    }

    return null;
}

export function parseQuestStorePreview(html: string, requestUrl: string): QuestStorePreviewResult {
    const $ = load(html);
    const canonicalAttr = $('link[rel="canonical"]').attr('href');
    const canonicalUrl = resolveUrl(canonicalAttr, requestUrl);
    const fallbackBase = canonicalUrl ?? requestUrl ?? QUEST_STORE_ORIGIN;

    return {
        posterUrl: extractPosterUrl($, fallbackBase),
        description: extractDescription($),
        videoUrl: extractVideoUrl($, fallbackBase),
        canonicalUrl
    };
}

export async function fetchQuestStorePreview(rawUrl: string): Promise<QuestStorePreviewResult> {
    const targetUrl = normalizeTargetUrl(rawUrl);
    const response = await fetch(targetUrl, {
        method: 'GET',
        cache: 'no-store',
        headers: REQUEST_HEADERS,
        next: { revalidate: 0 }
    });

    if (!response.ok) {
        throw new Error(`queststore-fetch-failed-${response.status}`);
    }

    const html = await response.text();
    return parseQuestStorePreview(html, targetUrl);
}
