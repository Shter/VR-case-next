import type { Metadata } from "next";
import { Hero }          from "@/components/server/Hero";
import { About }         from "@/components/server/About";
import { Features }      from "@/components/server/Features";
import { PricingTeaser } from "@/components/server/PricingTeaser";
import { Contact }       from "@/components/server/Contact";
import { JsonLd }                                          from "@/components/server/JsonLd";
import { homeBreadcrumbLd, homeRentalLd, pricingRentalLd } from "@/lib/structured";

export const metadata: Metadata = {
    title: 'Alquiler VR Meta Quest 3 Buenos Aires',
    description: 'Alquilá lentes de realidad virtual Meta Quest 3 para eventos, corporativos y uso personal en Buenos Aires. Envío rápido, soporte incluido.',
    alternates: { canonical: "/", languages: { "es-AR": "/" } },
    openGraph: {
        title: 'Alquiler VR Meta Quest 3 Buenos Aires | VR.CASE',
        description: 'Alquilá lentes de realidad virtual Meta Quest 3 para eventos, corporativos y uso personal en Buenos Aires. Envío rápido, soporte incluido.',
        url: '/',
        type: 'website',
    },
};

export default function Page() {
    return (
        <>
            <JsonLd data={homeRentalLd()} />
            <JsonLd data={homeBreadcrumbLd()} />
            <JsonLd data={pricingRentalLd()} />

            <Hero />
            <About />
            <Features />

            <section id="contact">
                <div className="container grid grid-cols-1 gap-10 md:grid-cols-2 md:grid-flow-col md:gap-16 py-10 md:py-16">
                    <Contact />
                    <PricingTeaser />
                </div>
            </section>

        </>
    );
}
