import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Features } from "@/components/Features";
import { PricingTeaser } from "@/components/PricingTeaser";
import { Contact }    from "@/components/Contact";
import { FaqGallery } from "@/components/FaqGallery";
import { JsonLd }     from "@/components/JsonLd";
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
