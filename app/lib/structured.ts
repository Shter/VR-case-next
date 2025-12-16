import { pricingItems } from '@/app/constants';
import type { Offer } from '@/types/allTypes';
import { absoluteAsset, site } from '@/lib/site';

const sameAsLinks = [
    "https://www.instagram.com/vr.case.ar",
    "https://wa.me/5491127827150"
];

const baseAddress = {
    "@type": "PostalAddress",
    addressLocality: "Buenos Aires",
    addressRegion: "CABA",
    addressCountry: "AR"
};

const geoCoordinates = {
    "@type": "GeoCoordinates",
    latitude: -34.5637,
    longitude: -58.4563
};

const serviceArea = {
    "@type": "GeoCircle",
    "@id": `${site.url}/#service-area`,
    geoMidpoint: geoCoordinates,
    geoRadius: 22000
};

const servicePlace = {
    "@type": "Place",
    "@id": `${site.url}/#service-area-place`,
    name: "Ciudad Autónoma de Buenos Aires y Zona Norte",
    geo: geoCoordinates
};

const organization = {
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: "VR.CASE",
    url: site.url,
    logo: absoluteAsset('/icons/logo-no-back.webp')
};

const contactPoints = [
    {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+541127827150",
        areaServed: "AR",
        availableLanguage: ["es-AR"],
        url: "https://wa.me/5491127827150"
    }
];

function resolveProductImage(headsets: number) {
    if (headsets >= 2) {
        return absoluteAsset('/images/on-wood.webp');
    }

    return absoluteAsset('/images/in-case.webp');
}

function createProductDescription(offer: Offer) {
    const periodLabel =
        offer.period === '2h'
            ? 'Sesiones intensivas de 2 a 4 horas'
            : offer.period === 'day'
              ? 'Cobertura completa por día'
              : 'Reserva semanal con soporte extendido';

    return `${offer.title} para ${offer.headsets} visores Meta Quest 3. ${offer.rentLimit}. ${periodLabel}. Incluye entrega coordinada, onboarding guiado y soporte remoto.`;
}

function createShippingDetails() {
    return {
        "@type": "OfferShippingDetails",
        shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: "AR",
            addressRegion: "CABA",
            addressLocality: "Ciudad Autónoma de Buenos Aires"
        },
        shippingRate: {
            "@type": "MonetaryAmount",
            value: 0,
            currency: "ARS"
        },
        transitTimeLabel: "Entrega coordinada en el día dentro de CABA",
        deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: {
                "@type": "QuantitativeValue",
                minValue: 0,
                maxValue: 1,
                unitCode: "DAY"
            },
            transitTime: {
                "@type": "QuantitativeValue",
                minValue: 0,
                maxValue: 1,
                unitCode: "DAY"
            }
        }
    };
}

function createMerchantReturnPolicy() {
    return {
        "@type": "MerchantReturnPolicy",
        "@id": `${site.url}/#return-policy`,
        name: "Política de devoluciones VR.CASE",
        applicableCountry: "AR",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 1,
        returnFees: "https://schema.org/FreeReturn",
        refundType: "https://schema.org/FullRefund",
        returnMethod: "https://schema.org/ReturnInStore",
        inStoreReturnsOffered: true
    };
}

const merchantReturnPolicy = createMerchantReturnPolicy();

function getOffers() {
    const offerGroups = Object.values(pricingItems) as Offer[][];
    const offers = offerGroups.reduce<Offer[]>((acc, group) => acc.concat(group), []);

    return offers.map((offer) => {
        const headsetsLabel = `${offer.headsets} Meta Quest 3`;
        const offerId = `${site.url}/alquiler#offer-${offer.id}`;
        const productId = `${site.url}/alquiler#product-${offer.id}`;
        const offerUrl = `${site.url}/alquiler#${offer.id}`;

        const offerSummary = {
            "@type": "Offer",
            "@id": offerId,
            priceCurrency: "ARS",
            price: offer.price,
            availability: "https://schema.org/InStock",
            url: offerUrl,
            seller: { "@id": `${site.url}/#rental-service` }
        };

        const itemOffered = {
            "@type": "Product",
            "@id": productId,
            name: `Alquiler ${headsetsLabel}`,
            description: createProductDescription(offer),
            category: "Realidad virtual",
            sku: offer.id,
            image: [resolveProductImage(offer.headsets)],
            offers: offerSummary
        };

        return {
            "@type": "Offer",
            "@id": offerId,
            name: `${offer.title} (${headsetsLabel})`,
            description: offer.rentLimit,
            priceCurrency: "ARS",
            price: offer.price,
            availability: "https://schema.org/InStock",
            url: offerUrl,
            eligibleCustomerType: "https://schema.org/Consumer",
            eligibleRegion: serviceArea,
            itemOffered,
            shippingDetails: [createShippingDetails()],
            hasMerchantReturnPolicy: merchantReturnPolicy,
            seller: { "@id": `${site.url}/#rental-service` },
            ...(offer.plusPrice
                ? {
                      additionalProperty: [
                          {
                              "@type": "PropertyValue",
                              name: `Extensión por ${offer.plusUnit}`,
                              value: offer.plusPrice,
                              unitText: offer.plusUnit
                          }
                      ]
                  }
                : {})
        };
    });
}

function createOfferCatalog() {
    return {
        "@type": "OfferCatalog",
        "@id": `${site.url}/alquiler#offer-catalog`,
        name: "Planes de alquiler de realidad virtual Meta Quest 3",
        itemListElement: getOffers().map((offer, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: offer
        }))
    };
}

export const homeRentalLd = () => ({
    "@context": "https://schema.org",
    "@type": "RentalService",
    "@id": `${site.url}/#rental-service`,
    name: "VR.CASE",
    url: site.url,
    image: absoluteAsset('/images/on-station.webp'),
    logo: absoluteAsset('/icons/logo-no-back.webp'),
    description:
        "Alquiler de lentes VR Meta Quest 3 en Buenos Aires para eventos corporativos, activaciones y uso personal con entrega y soporte incluidos.",
    serviceType: "Alquiler de realidad virtual Meta Quest 3",
    telephone: "+541127827150",
    priceRange: "$$",
    address: baseAddress,
    areaServed: [
        { "@type": "City", name: "Ciudad Autónoma de Buenos Aires" },
        { "@type": "AdministrativeArea", name: "Zona Norte - Vicente López y San Isidro" }
    ],
    serviceArea: servicePlace,
    geo: geoCoordinates,
    sameAs: sameAsLinks,
    contactPoint: contactPoints,
    hasOfferCatalog: createOfferCatalog(),
    makesOffer: getOffers(),
    provider: organization
});

export const homeBreadcrumbLd = () => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${site.url}/#breadcrumb`,
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
        { "@type": "ListItem", position: 2, name: "Precios de alquiler VR", item: `${site.url}/alquiler` },
        { "@type": "ListItem", position: 3, name: "VR Buenos Aires", item: `${site.url}/vr-buenos-aires` }
    ]
});

export const pricingBreadcrumbLd = () => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${site.url}/alquiler#breadcrumb`,
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
        { "@type": "ListItem", position: 2, name: "Precios de alquiler VR", item: `${site.url}/alquiler` }
    ]
});

export const pricingRentalLd = () => ({
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${site.url}/alquiler#offer-catalog`,
    url: `${site.url}/alquiler`,
    inLanguage: "es-AR",
    name: "Planes de alquiler VR Meta Quest 3",
    description: "Tarifas por hora, día y semana para alquiler de lentes VR Meta Quest 3 en Buenos Aires.",
    itemListElement: getOffers().map((offer, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: offer
    })),
    provider: { "@id": `${site.url}/#rental-service` }
});

export const vrBuenosAiresBreadcrumbLd = () => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${site.url}/vr-buenos-aires#breadcrumb`,
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
        { "@type": "ListItem", position: 2, name: "VR Buenos Aires", item: `${site.url}/vr-buenos-aires` }
    ]
});

export const vrServiceLd = () => ({
    "@context": "https://schema.org",
    "@type": "RentalService",
    "@id": `${site.url}/vr-buenos-aires#service`,
    name: "VR.CASE Buenos Aires",
    url: `${site.url}/vr-buenos-aires`,
    image: absoluteAsset('/images/on-station.webp'),
    description:
        "Servicio de alquiler de realidad virtual con Meta Quest 3 en Buenos Aires. Incluye entrega, instalación guiada y soporte en el lugar.",
    serviceType: "Alquiler de lentes VR Meta Quest 3",
    telephone: "+541127827150",
    priceRange: "$$",
    areaServed: [
        { "@type": "City", name: "Ciudad Autónoma de Buenos Aires" },
        { "@type": "AdministrativeArea", name: "Zona Norte" }
    ],
    address: baseAddress,
    serviceArea: servicePlace,
    sameAs: sameAsLinks,
    contactPoint: contactPoints,
    hasOfferCatalog: { "@id": `${site.url}/alquiler#offer-catalog` },
    makesOffer: getOffers(),
    provider: organization
});
