export function toGameCacheKey(id: string | number): string {
    return decodeURIComponent(String(id));
}
