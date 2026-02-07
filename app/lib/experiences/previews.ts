import { load } from 'cheerio';
import { sanitizeDescriptionText } from '@/lib/text/sanitizers';

export type ExperiencePreviewResult = {
    posterUrl: string | null;
    description: string | null;
    videoUrl: string | null;
    canonicalUrl: string | null;
};

const META_EXPERIENCES_ORIGIN = 'https://www.meta.com';
const REQUEST_HEADERS: HeadersInit = {
    'user-agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'accept-language': 'es-ES,es;q=0.9,en;q=0.8',
    referer: 'https://www.meta.com/'
};

type JsonLdNode = Record<string, unknown>;

function resolveUrl(value: string | null | undefined, base: string = META_EXPERIENCES_ORIGIN): string | null {
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
        console.warn('[experiences] failed to resolve url', value, error);
        return null;
    }
}

function stripMetaTrackingSegments(url: URL): void {
    const host = url.hostname.toLowerCase();
    const isMetaHost = host.includes('meta.com') || host.includes('oculus.com');

    if (!isMetaHost) {
        return;
    }

    const segments = url.pathname
        .split('/')
        .filter((segment) => segment.length > 0);
    let mutated = false;

    // Meta share URLs occasionally end with /$0 style tracking segments that 404; strip them.
    while (segments.length > 0 && /^\$[a-z0-9_-]+$/i.test(segments[segments.length - 1])) {
        segments.pop();
        mutated = true;
    }

    if (!mutated) {
        return;
    }

    url.pathname = segments.length > 0 ? `/${segments.join('/')}` : '/';
}

function resolveTargetUrl(trimmed: string): URL {
    if (/^https?:\/\//i.test(trimmed)) {
        return new URL(trimmed);
    }

    if (trimmed.startsWith('//')) {
        return new URL(`https:${trimmed}`);
    }

    if (/^[a-z0-9.-]+\.[a-z]{2,}.*$/i.test(trimmed)) {
        return new URL(`https://${trimmed}`);
    }

    return new URL(trimmed, META_EXPERIENCES_ORIGIN);
}

function normalizeTargetUrl(rawUrl: string): string {
    const trimmed = rawUrl.trim();

    if (trimmed.length === 0) {
        throw new Error('missing-target-url');
    }

    const resolved = resolveTargetUrl(trimmed);
    stripMetaTrackingSegments(resolved);

    return resolved.toString();
}

function pickMetaContent($: ReturnType<typeof load>, selectors: string[]): string | null {
    for (const selector of selectors) {
        const attr = $(selector).attr('content') ?? $(selector).attr('href');

        if (attr) {
            const trimmed = attr.trim();
            if (trimmed.length > 0) {
                return trimmed;
            }
        }
    }

    return null;
}

function coerceText(value: unknown): string | null {
    if (typeof value === 'string') {
        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed : null;
    }

    return null;
}

function resolveMediaValue(value: unknown, base: string): string | null {
    if (!value) {
        return null;
    }

    if (typeof value === 'string') {
        return resolveUrl(value, base);
    }

    if (Array.isArray(value)) {
        for (const entry of value) {
            const resolved = resolveMediaValue(entry, base);
            if (resolved) {
                return resolved;
            }
        }
        return null;
    }

    if (typeof value === 'object') {
        const objectValue = value as Record<string, unknown>;
        const keys = ['contentUrl', 'url', '@id', 'thumbnailUrl', 'image', 'embedUrl'];

        for (const key of keys) {
            if (key in objectValue) {
                const resolved = resolveMediaValue(objectValue[key], base);
                if (resolved) {
                    return resolved;
                }
            }
        }
    }

    return null;
}

function collectJsonLdNodes($: ReturnType<typeof load>): JsonLdNode[] {
    const nodes: JsonLdNode[] = [];

    $('script[type="application/ld+json"]').each((_, element) => {
        const raw = $(element).text();

        if (!raw || raw.trim().length === 0) {
            return;
        }

        try {
            const parsed = JSON.parse(raw);
            appendJsonLdNode(parsed, nodes);
        } catch (error) {
            console.warn('[experiences] failed to parse ld+json block', error);
        }
    });

    return nodes;
}

function appendJsonLdNode(input: unknown, target: JsonLdNode[]): void {
    if (!input) {
        return;
    }

    if (Array.isArray(input)) {
        input.forEach((entry) => appendJsonLdNode(entry, target));
        return;
    }

    if (typeof input === 'object') {
        const node = input as JsonLdNode;
        target.push(node);

        const graph = node['@graph'];
        if (Array.isArray(graph)) {
            graph.forEach((entry) => appendJsonLdNode(entry, target));
        } else if (graph && typeof graph === 'object') {
            appendJsonLdNode(graph, target);
        }
    }
}

function nodeMatchesType(node: JsonLdNode, types: string[]): boolean {
    const type = node['@type'];

    if (typeof type === 'string') {
        return types.includes(type);
    }

    if (Array.isArray(type)) {
        return type.some((entry) => typeof entry === 'string' && types.includes(entry));
    }

    return false;
}

function extractMetaDescription($: ReturnType<typeof load>, nodes: JsonLdNode[]): string | null {
    const metaDescription = pickMetaContent($, [
        'meta[name="description"]',
        'meta[property="og:description"]'
    ]);

    const sanitized = sanitizeDescriptionText(metaDescription);
    if (sanitized) {
        return sanitized;
    }

    for (const node of nodes) {
        const candidate = sanitizeDescriptionText(coerceText(node['description']));
        if (candidate) {
            return candidate;
        }
    }

    return null;
}

function extractMetaPosterUrl(
    $: ReturnType<typeof load>,
    base: string,
    nodes: JsonLdNode[]
): string | null {
    const metaImage = pickMetaContent($, [
        'meta[property="og:image:secure_url"]',
        'meta[property="og:image:url"]',
        'meta[property="og:image"]',
        'meta[name="twitter:image"]'
    ]);

    const resolved = resolveUrl(metaImage, base);
    if (resolved) {
        return resolved;
    }

    for (const node of nodes) {
        const fromNode = resolveMediaValue(
            node['primaryImageOfPage'] ?? node['image'] ?? node['thumbnailUrl'],
            base
        );

        if (fromNode) {
            return fromNode;
        }
    }

    return null;
}

function extractMetaVideoUrl(
    $: ReturnType<typeof load>,
    base: string,
    nodes: JsonLdNode[]
): string | null {
    const metaVideo = pickMetaContent($, [
        'meta[property="og:video:secure_url"]',
        'meta[property="og:video:url"]',
        'meta[property="og:video"]',
        'meta[name="twitter:player:stream"]',
        'meta[name="twitter:player"]'
    ]);

    const resolved = resolveUrl(metaVideo, base);
    if (resolved) {
        return resolved;
    }

    for (const node of nodes) {
        if (nodeMatchesType(node, ['VideoObject'])) {
            const fromMedia = resolveMediaValue(
                node['contentUrl'] ?? node['embedUrl'] ?? node['url'] ?? node['@id'],
                base
            );

            if (fromMedia) {
                return fromMedia;
            }
        }
    }

    for (const node of nodes) {
        const fallback = resolveMediaValue(node['video'], base);
        if (fallback) {
            return fallback;
        }
    }

    return null;
}

function parseMetaExperiencePreview(html: string, requestUrl: string): ExperiencePreviewResult {
    const $ = load(html);
    const canonicalAttr = $('link[rel="canonical"]').attr('href')
        ?? pickMetaContent($, ['meta[property="og:url"]']);
    const canonicalUrl = resolveUrl(canonicalAttr, requestUrl);
    const fallbackBase = canonicalUrl ?? requestUrl ?? META_EXPERIENCES_ORIGIN;
    const jsonLdNodes = collectJsonLdNodes($);

    return {
        posterUrl: extractMetaPosterUrl($, fallbackBase, jsonLdNodes),
        description: extractMetaDescription($, jsonLdNodes),
        videoUrl: extractMetaVideoUrl($, fallbackBase, jsonLdNodes),
        canonicalUrl
    };
}

export async function fetchExperiencePreview(rawUrl: string): Promise<ExperiencePreviewResult> {
    const targetUrl = normalizeTargetUrl(rawUrl);
    const response = await fetch(targetUrl, {
        method: 'GET',
        cache: 'no-store',
        headers: REQUEST_HEADERS,
        next: { revalidate: 0 }
    });

    const html = await response.text();

    if (!response.ok && response.status !== 400) {
        throw new Error(`experience-fetch-failed-${response.status}`);
    }

    if (response.status === 400) {
        console.warn('[experiences] upstream 400, attempting parse', targetUrl);
    }

    const preview = parseMetaExperiencePreview(html, targetUrl);

    if (!preview.posterUrl && !preview.description && !preview.videoUrl) {
        throw new Error(`experience-empty-response-${response.status}`);
    }

    return preview;
}
