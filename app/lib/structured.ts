import { site } from "@/lib/site";

export const vrBuenosAiresBreadcrumbLd = () => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": `${site.url}/` },
        { "@type": "ListItem", "position": 2, "name": "VR Buenos Aires", "item": `${site.url}/vr-buenos-aires` }
    ]
});

export const vrServiceLd = () => ({
    "@context": "https://schema.org",
    "@type": "RentalService",
    "name": "VR.CASE",
    "serviceType": "Alquiler de lentes VR Meta Quest 3",
    "url": `${site.url}/vr-buenos-aires`,
    // + address, areaServed, telephone, sameAs, offers...
});

export const homeBreadcrumbLd = () => ({
    "@context": "https://schema.org",
    "@type": "RentalService",
    "areaServed": [
        { "@type": "City", "name": "Buenos Aires" },
        { "@type": "AdministrativeArea", "name": "Provincia de Buenos Aires" }
    ],
    "serviceArea": { "@type": "Place", "name": "CABA y Zona Norte (Olivos, Vicente López, San Isidro, Núñez)" },
    "address": { "@type": "PostalAddress", "addressLocality": "Buenos Aires", "addressCountry": "AR" },
    "geo": { "@type": "GeoCoordinates", "latitude": -34.6037, "longitude": -58.3816 },
    "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "10:00","closes": "22:00"
    }],
    "sameAs": ["https://www.instagram.com/vr.case.ar","https://wa.me/541127827150"],
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Alquiler de lentes VR Meta Quest 3",
        "itemListElement": [
            { "@type": "Offer", "name": "2 horas - 1 headset", "priceCurrency": "ARS", "price": "20000", "availability": "https://schema.org/InStock" },
            { "@type": "Offer", "name": "Día - 1 headset", "priceCurrency": "ARS", "price": "55000", "availability": "https://schema.org/InStock" },
            { "@type": "Offer", "name": "2 horas - 2 headsets", "priceCurrency": "ARS", "price": "35000", "availability": "https://schema.org/InStock" }
        ]
    }
});

export const pricingBreadcrumbLd = () => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://vr-case.com.ar/" },
        { "@type": "ListItem", "position": 2, "name": "Alquiler precios", "item": "https://vr-case.com.ar/alquiler" }
    ]
});

export const pricingRentalLd = () => ({
    "@context": "https://schema.org",
    "@type": "RentalService",
    "name": "VR.CASE",
    "address": { "@type": "PostalAddress", "addressLocality": "Buenos Aires", "addressCountry": "AR" },
    "telephone": "+541127827150",
    "url": "https://vr-case.com.ar/alquiler",
    "offers": [
        { "@type": "Offer", "priceCurrency": "ARS", "price": "35000", "itemOffered": "Alquiler por 2 horas de 2 Meta Quest 3", "availability": "https://schema.org/InStock" },
        { "@type": "Offer", "priceCurrency": "ARS", "price": "100000", "itemOffered": "Alquiler por dia de 2 Meta Quest 3", "availability": "https://schema.org/InStock" },
        { "@type": "Offer", "priceCurrency": "ARS", "price": "380000", "itemOffered": "Alquiler por semana de 2 Meta Quest 3","availability": "https://schema.org/InStock" },
        { "@type": "Offer", "priceCurrency": "ARS", "price": "20000", "itemOffered": "Alquiler por 2 horas de 1 Meta Quest 3", "availability": "https://schema.org/InStock" },
        { "@type": "Offer", "priceCurrency": "ARS", "price": "55000", "itemOffered": "Alquiler por dia de 1 Meta Quest 3", "availability": "https://schema.org/InStock" },
        { "@type": "Offer", "priceCurrency": "ARS", "price": "220000", "itemOffered": "Alquiler por semana de 1 Meta Quest 3","availability": "https://schema.org/InStock" }
    ]
});