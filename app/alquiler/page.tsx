import { JsonLd } from '@/components/server/JsonLd';
import { Pricing } from '@/components/server/Pricing';
import { asset } from '@/lib/site';
import { pricingBreadcrumbLd, pricingRentalLd } from '@/lib/structured';
import type { Metadata } from 'next';
import Link from 'next/link';

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
        images: [{ url: asset('/images/in-case.webp') }]
    },
    twitter: {
        card: "summary_large_image",
        title: "Precios de alquiler VR — VR Buenos Aires | VR.CASE",
        description: "Consulta tarifas de Meta Quest 3 en Buenos Aires.",
        images: [asset('/images/in-case.webp')]
    }
};

export default function Page() {
    return (
        <>
            <JsonLd data={pricingBreadcrumbLd()} />
            <JsonLd data={pricingRentalLd()} />

            <div className="container pt-24">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 md:mb-8">
                        Precios de alquiler de realidad virtual VR en Buenos Aires
                    </h1>

                    <p className="text-lg opacity-90">
                        Elegí entre planes por sesión, día completo o semana y recibí los headsets Meta Quest 3 listos
                        para usar con entrega en Buenos Aires (BA). Todas las tarifas incluyen asesoramiento previo,
                        instalación guiada, soporte remoto durante la experiencia del equipamiento
                    </p>
                </div>
            </div>

            <section className="container mt-8">
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-4 rounded-2xl bg-gray-200 p-8 shadow-soft">
                        <h2 className="text-2xl font-semibold">Qué incluye cada alquiler</h2>

                        <ul className="space-y-3 text-base opacity-90">
                            <li>- Headsets Meta Quest 3 configurados con librería de juegos premium</li>
                            <li>- Controles, correas higiénicas, estación de carga y Chromecast para casting</li>
                            <li>- Onboarding express para tu equipo y soporte en vivo vía WhatsApp</li>
                            <li>- Delivery y retiro coordinado en horarios extendidos</li>
                        </ul>
                    </div>

                    <div className="space-y-4 rounded-2xl bg-gray-200  p-8 shadow-soft">
                        <h2 className="text-2xl font-semibold">Cómo elegir el plan ideal</h2>

                        <p>
                            Para demos breves o stands itinerantes recomendamos la modalidad por 2 a 4 horas. Los
                            eventos corporativos y activaciones de marketing suelen funcionar mejor con el plan diario,
                            mientras que producciones prolongadas optan por la semana completa
                        </p>

                        <p>
                            Si necesitás asistencia presencial o mayor cantidad de visores,&nbsp;

                            <Link href="/#contact" className="text-accent font-bold hover:underline">
                                escribinos
                            </Link>

                            &nbsp;para preparar un paquete personalizado
                        </p>
                    </div>
                </div>
            </section>

            <Pricing />

            <section className="container mb-12">
                <div className="space-y-2">
                    <div className="flex flex-col gap-1 text-center md:text-left md:flex-row md:items-center md:gap-3">
                        <h2 className="text-2xl font-semibold">Beneficios de alquilar con</h2>
                        <span className="header-logo font-bold text-xl">VR<span className="text-secondary">.CASE</span></span>
                    </div>

                    <p>
                        Aprovechá la logística especializada en VR: monitoreamos estado de baterías, actualizaciones
                        de software y protocolos de higiene para que no pierdas tiempo técnico. Visitá la página de&nbsp;
                        <Link href="/vr-buenos-aires" className="text-accent font-bold hover:underline">VR Buenos Aires</Link>
                        &nbsp;para conocer escenarios de uso, testimonios y recomendaciones de experiencias temáticas
                    </p>
                </div>
            </section>
        </>
    );
}
