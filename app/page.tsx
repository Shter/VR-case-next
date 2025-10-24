import type { Metadata } from "next";
import { Hero }          from "@/components/server/Hero";
import { About }         from "@/components/server/About";
import { Features }      from "@/components/server/Features";
import { PricingTeaser } from "@/components/server/PricingTeaser";
import { Contact }       from "@/components/server/Contact";
import { FaqGallery }                                      from "@/components/FaqGallery";
import { JsonLd }                                          from "@/components/server/JsonLd";
import { homeBreadcrumbLd, homeRentalLd, pricingRentalLd } from "@/lib/structured";

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
            <FaqGallery />
        </>
    );
}
