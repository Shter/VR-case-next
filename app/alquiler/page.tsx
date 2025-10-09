import type { Metadata } from "next";
import { Pricing } from "@/components/Pricing";
import { JsonLd } from "@/components/JsonLd";
import { pricingBreadcrumbLd, pricingRentalLd } from "@/lib/structured";

export const metadata: Metadata = {
    title: "VR Buenos Aires — Precios de alquiler de lentes VR (Meta Quest 3) | VR.CASE",
    description:
        "Precios de alquiler VR en Buenos Aires: Meta Quest 3 por horas, día o semana. Envío gratis y soporte",
    alternates: { canonical: "/alquiler", languages: { "es-AR": "/alquiler" } },
    openGraph: {
        type: "website",
        locale: "es_AR",
        title: "VR Buenos Aires — Precios de alquiler de lentes VR | VR.CASE",
        description: "Tarifas flexibles por horas/día/semana para Meta Quest 3. Envío gratis.",
        url: "/alquiler",
        images: [{ url: "/assets/img/in-case.webp" }]
    },
    twitter: {
        card: "summary_large_image",
        title: "Precios de alquiler VR — VR Buenos Aires | VR.CASE",
        description: "Consulta tarifas de Meta Quest 3 en Buenos Aires."
    }
};

export default function Page() {
    return (
        <>
            <JsonLd data={pricingBreadcrumbLd()} />
            <JsonLd data={pricingRentalLd()} />
            <div className="container pt-20">
                <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-10">
                    Precios de alquiler realidad virtual VR en Buenos Aires
                </h1>
                <p className="text-center mx-auto mb-10 opacity-90">
                    Buscas precios de alquiler realidad virtual VR en Buenos Aires? Nuestras tarifas son competitivas y flexibles. Contacta para descuentos en eventos corporativos. Descubre nuestras tarifas flexibles para alquiler lentes de realidad virtual VR Meta Quest 3 en Buenos Aires. Incluye envío gratis y soporte completo
                </p>
            </div>
            <Pricing />
        </>
    );
}