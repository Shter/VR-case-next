import { Footer }      from '@/components/server/Footer';
import { Header }      from '@/components/server/Header';
import { asset, site } from '@/lib/site';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: {
        default: "VR Buenos Aires — Alquiler de realidad virtual Meta Quest 3 | VR.CASE",
        template: "%s | VR.CASE",
    },
    description:
        "VR Buenos Aires: alquiler de lentes de realidad virtual Meta Quest 3 para eventos, corporativos y uso personal. Soporte completo y envío rápido",
    keywords: [
        "alquiler meta quest 3",
        "lentes VR Buenos Aires",
        "realidad virtual Buenos Aires",
        "VR eventos corporativos",
        "VR Buenos Aires"
    ],
    alternates: {
        canonical: "/",
        languages: { "es-AR": "/" }
    },
    openGraph: {
        type: "website",
        locale: "es_AR",
        url: site.url,
        title: "VR Buenos Aires — Alquiler VR Meta Quest 3 | VR.CASE",
        description:
            "Alquila lentes VR Meta Quest 3 en Buenos Aires: ideal para eventos y uso personal. Envío y soporte incluidos.",
        siteName: "VR.CASE",
        images: [{ url: asset('/images/on-station.webp') }]
    },
    twitter: {
        card: "summary_large_image",
        title: "VR Buenos Aires — Alquiler de lentes VR Meta Quest 3 | VR.CASE",
        description: "Alquiler de realidad virtual en Buenos Aires con Meta Quest 3. Envío rápido y soporte.",
        images: [asset('/images/on-station.webp')]
    },
    robots: { index: true, follow: true },
    icons: {
        icon: asset(site.faviconPath),
        shortcut: asset(site.faviconPath),
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es-AR">
        <body className="min-h-screen flex flex-col">
        <Header/>
        <main className="flex-1">{children}</main>
        <Footer/>
        </body>
        </html>
    );
}
