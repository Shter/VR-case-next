import Script from "next/script";

function pascalCase(value: string) {
    return value
        .replace(/(^\w|[-_\s]\w)/g, (match) => match.replace(/[-_\s]/, "").toUpperCase())
        .replace(/[^a-zA-Z0-9]/g, "")
        .replace(/^\d+/, (digits) => `_${digits}`);
}

export function JsonLd({ data }: { data: Record<string, any> }) {
    const context = typeof data["@context"] === "string" ? data["@context"] : undefined;
    const type = typeof data["@type"] === "string" ? data["@type"] : undefined;
    const fallbackId = type ? pascalCase(type) : undefined;
    const scriptId = context?.toLowerCase?.() ?? fallbackId ?? crypto.randomUUID();

    return (
        <Script id={scriptId} type="application/ld+json" strategy="afterInteractive">
            {JSON.stringify(data)}
        </Script>
    );
}