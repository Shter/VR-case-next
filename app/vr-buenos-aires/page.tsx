import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { advantages, serviceCards } from '@/app/constants';
import { JsonLd } from '@/components/server/JsonLd';
import { asset } from '@/lib/site';
import { vrBuenosAiresBreadcrumbLd, vrServiceLd } from '@/lib/structured';

export const metadata: Metadata = {
    title: "VR Buenos Aires — Alquiler de lentes VR Meta Quest 3",
    description:
        "Lentes VR Meta Quest 3 en Buenos Aires (VR Argentina) para eventos, fiestas y empresas. Envío, instalación y soporte incluidos.",
    keywords: [
        "VR Buenos Aires",
        "VR Argentina",
        "alquiler VR Buenos Aires",
        "Meta Quest 3",
        "realidad virtual Buenos Aires",
        "VR para eventos"
    ],
    alternates: { canonical: "/vr-buenos-aires", languages: { "es-AR": "/vr-buenos-aires" } },
    openGraph: {
        type: "website",
        locale: "es_AR",
        title: "VR Buenos Aires — Alquiler de lentes VR Meta Quest 3 | VR.CASE",
        description:
            "Alquila lentes VR Meta Quest 3 en Buenos Aires. Ideal para eventos, fiestas y corporativos. Envío y soporte incluidos.",
        url: "/vr-buenos-aires",
        images: [{ url: asset('/images/on-station.webp') }]
    },
    twitter: {
        card: "summary_large_image",
        title: "VR Buenos Aires — Alquiler de lentes VR Meta Quest 3 | VR.CASE",
        description:
            "Alquiler de realidad virtual en Buenos Aires con Meta Quest 3. Envío rápido, instalación y soporte.",
        images: [asset('/images/on-station.webp')]
    },
    robots: { index: true, follow: true }
};

export default function VRBuenosAiresPage() {
    return (
        <main>
            <section className="container pt-24 pb-8 md:pb-16 ">
                <JsonLd data={vrBuenosAiresBreadcrumbLd()}/>
                <JsonLd data={vrServiceLd()}/>

                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">
                    VR Buenos Aires: alquiler de Meta Quest 3 para eventos
                </h1>

                <p className="text-lg mb-6">
                    Llevamos experiencias de realidad virtual premium a empresas, agencias y particulares en Buenos
                    Aires. Entregamos los headsets Meta Quest 3 configurados, guiamos la instalación en el lugar y
                    brindamos soporte para que cada sesión sea un éxito
                </p>
                <p className="text-lg mb-6">
                    Cubrimos toda la Ciudad Autónoma de Buenos Aires y zona norte. Desde lanzamientos de marca hasta
                    cumpleaños, diseñamos la biblioteca de juegos y aplicaciones según la audiencia para garantizar
                    participación y seguridad
                </p>

                <div
                    className="flex flex-col md:grid md:grid-cols-[1fr_auto] md:justify-between rounded-2xl bg-gray-200 p-8 shadow-soft border-3 border-dark">
                    <ul className="order-2 md:order-1 md:grid-cols-2 lg:grid-cols-3 md:me-16 md:border-e-3 md:border-dark">
                        {advantages.map(({title, text}) => (
                            <li key={title} className="my-3">
                                <h2 className="text-xl font-semibold">{title}</h2>
                                <p>{text}</p>
                            </li>
                        ))}
                    </ul>

                    <Image
                        src={asset('/images/kitchen.webp')}
                        alt="Meta Quest 3 listados para eventos corporativos en Buenos Aires"
                        width={256}
                        height={256}
                        className="order-1 md:order-2 rounded-xl aspect-square object-cover w-full md:w-auto md:h-full border-3 border-dark"
                        sizes="(min-width: 768px) 10rem, 9rem"
                    />
                </div>

                <div className="space-y-8 mb-8">
                    <div className="pt-6">
                        <h2 className="text-2xl font-semibold mb-4">Nuestros servicios de alquiler de VR</h2>

                        <p className="mb-6">
                            Diseñamos propuestas llave en mano para activaciones en retail, eventos corporativos,
                            instituciones educativas y celebraciones privadas. Elegí el formato que mejor se adapte a tu
                            ocasión
                        </p>

                        <div
                            className="flex flex-col md:grid md:grid-cols-[1fr_auto] rounded-2xl bg-gray-200 p-8 shadow-soft border-3 border-dark">
                            <Image
                                src={asset('/images/corporative.webp')}
                                alt="Experiencias VR configuradas por VR.CASE"
                                width={256}
                                height={256}
                                className="order-1 md:order-1 rounded-xl aspect-square object-cover w-full md:w-auto md:h-full border-3 border-dark"
                                sizes="(min-width: 768px) 10rem, 9rem"
                            />

                            <ul className="order-2 md:grid-cols-2 lg:grid-cols-3 md:ps-49 md:border-s-3 md:border-dark">
                                {serviceCards.map(({heading, description}) => (
                                    <li key={heading} className="my-3">
                                        <h3 className="text-xl font-semibold">{heading}</h3>

                                        <p>{description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="rounded-2xl">
                        <h2 className="text-2xl font-semibold mb-4">Cómo funciona?</h2>
                        <ol className="space-y-2 text-base">
                            <li>
                                <span className="font-semibold text-secondary">1. Contactanos:</span> contanos qué
                                necesitás y por cuánto
                                tiempo querés vivir la experiencia
                            </li>
                            <li>
                                <span
                                    className="font-semibold text-secondary">2. Coordinamos la entrega:</span> llevamos
                                el Meta Quest 3
                                directamente a tu domicilio en CABA
                            </li>
                            <li>
                                <span className="font-semibold text-secondary">3. Disfrutá y jugá:</span> recibís una
                                inducción express y te
                                sumergís en la realidad virtual. Nosotros nos ocupamos del resto
                            </li>
                            <li>
                                <span className="font-semibold text-secondary">4. Retiro programado:</span> al finalizar
                                el período, pasamos a
                                buscar el equipo sin que tengas que preocuparte por nada
                            </li>
                        </ol>
                    </div>
                </div>

                <div
                    className="flex flex-col md:grid md:grid-cols-[1fr_auto] rounded-2xl bg-gray-200 p-8 border-3 border-dark">
                    <div className="order-2 md:order-1 md:me-16 md:border-e-3 md:border-dark mt-6 md:mt-0">
                        <h2 className="text-2xl font-semibold mb-4">Explorá un universo de posibilidades</h2>
                        <ul className="space-y-3">
                            <li>- Jugá títulos de alta gama como Beat Saber, Superhot VR o Resident Evil 4</li>
                            <li>- Explorá mundos sociales en Horizon Worlds y conectate con tu comunidad sin moverte del
                                evento
                            </li>
                            <li>- Entrená con apps de fitness inmersivo para romper la rutina</li>
                            <li>- Convertí cualquier sala en un cine privado para proyecciones 360°</li>
                        </ul>
                    </div>

                    <Image
                        src={asset('/images/nature.webp')}
                        alt="Equipo de soporte VR listo para asistir"
                        width={224}
                        height={224}
                        className="order-1 md:order-2 rounded-xl aspect-square object-cover w-full md:w-auto md:h-full border-3 border-dark"
                        sizes="(min-width: 768px) 9rem, 8rem"
                    />
                </div>

                <div className="rounded-2xl pt-6">
                    <h2 className="text-2xl font-semibold mb-4">VR Buenos Aires: tu puerta de entrada a la realidad
                        virtual</h2>

                    <p className="mb-4">
                        Somos más que un servicio de alquiler: acompañamos a tu equipo durante todo el proceso, desde la
                        planificación
                        previa hasta el retiro coordinado. Nos encargamos del onboarding de los invitados y la
                        asistencia técnica
                        in situ. La aventura está a un clic de distancia.&nbsp;
                        <Link href="/alquiler" className="text-accent font-bold hover:underline">Consultá</Link> los
                        precios o
                        la disponibilidad en la fecha de tu evento
                    </p>
                </div>

                <div className="mt-4 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
                    <Link href="/alquiler" className="btn w-full sm:w-64 text-center">Reservar Meta Quest 3</Link>
                    <Link href="/#contact" className="btn btn--ghost w-full sm:w-64 text-center">Hablar con un
                        especialista</Link>
                </div>
            </section>
        </main>
    );
}
