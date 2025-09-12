import Script from "next/script";

export function JsonLd({ data }: { data: Record<string, any> }) {
    return (
        <Script id={JSON.stringify(data).slice(0, 32)} type="application/ld+json" strategy="afterInteractive">
            {JSON.stringify(data)}
        </Script>
    );
}