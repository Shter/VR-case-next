function normalizeId(value: string) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
    const explicitId = typeof data["@id"] === "string" ? data["@id"] : undefined;
    const urlId = typeof data["url"] === "string" ? data["url"] : undefined;
    const type = typeof data["@type"] === "string" ? data["@type"] : undefined;

    const rawId = explicitId ?? urlId ?? type ?? crypto.randomUUID();
    const scriptId = `ld-json-${normalizeId(rawId)}` || `ld-json-${crypto.randomUUID()}`;
    const json = JSON.stringify(data).replace(/</g, "\\u003c");

    return <script id={scriptId} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
