import type { Metadata } from "next";
import { Hero }          from "@/components/server/Hero";
import { About }         from "@/components/server/About";
import { Features }      from "@/components/server/Features";
import { PricingTeaser } from "@/components/server/PricingTeaser";
import { Contact }       from "@/components/server/Contact";
import { JsonLd }                                          from "@/components/server/JsonLd";
import { homeBreadcrumbLd, homeRentalLd, pricingRentalLd } from "@/lib/structured";
import { Faq } from "@/components/server/Faq";
import { Gallery } from "@/components/client/Gallery";

export const metadata: Metadata = {
    alternates: { canonical: "/", languages: { "es-AR": "/" } }
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

            <div className="container grid grid-cols-1 gap-10 md:grid-cols-2 md:grid-flow-col md:gap-16 py-10 md:py-16">
                <Contact />
                <PricingTeaser />
            </div>

            <div className="container flex flex-col gap-12 lg:flex-row bg-white py-10 md:py-16">
                <Faq />
                <Gallery />
            </div>
        </>
    );
}
