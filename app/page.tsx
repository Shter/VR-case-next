import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Features } from "@/components/Features";
import { Gallery } from "@/components/Gallery";
import { PricingTeaser } from "@/components/PricingTeaser";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { homeBreadcrumbLd, pricingRentalLd } from "@/lib/structured";

export const metadata: Metadata = {
    alternates: { canonical: "/", languages: { "es-AR": "/" } }
};

export default function Page() {
    return (
        <>
            <JsonLd data={homeBreadcrumbLd()} />
            <JsonLd data={pricingRentalLd()} />
            <Hero />
            <About />
            <Gallery />
            <Features />
            <PricingTeaser />
            <Contact />
            <Faq />
        </>
    );
}