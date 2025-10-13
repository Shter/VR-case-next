import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { vrBuenosAiresBreadcrumbLd, vrServiceLd } from "@/lib/structured";
import { advantages, serviceCards } from "@/app/constants";

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
        images: [{ url: "/assets/img/on-station.webp" }]
    },
    twitter: {
        card: "summary_large_image",
        title: "VR Buenos Aires — Alquiler de lentes VR Meta Quest 3 | VR.CASE",
        description:
            "Alquiler de realidad virtual en Buenos Aires con Meta Quest 3. Envío rápido, instalación y soporte.",
        images: ["/assets/img/on-station.webp"]
    },
    robots: { index: true, follow: true }
};

export default function VRBuenosAiresPage() {
  return (
    <main>
      <section className="container py-24">
        <JsonLd data={vrBuenosAiresBreadcrumbLd()} />
        <JsonLd data={vrServiceLd()} />

        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-center">VR Buenos Aires: alquiler de Meta Quest 3 para eventos</h1>

        <p className="text-lg mb-6">
          Llevamos experiencias de realidad virtual premium a empresas, agencias y particulares en Buenos Aires. Entregamos los headsets Meta Quest 3 configurados, guiamos la instalación en el lugar y brindamos soporte para que cada sesión sea un éxito
        </p>
        <p className="text-lg mb-6">
          Cubrimos toda la Ciudad Autónoma de Buenos Aires y zona norte. Desde lanzamientos de marca hasta cumpleaños, diseñamos la biblioteca de juegos y aplicaciones según la audiencia para garantizar participación y seguridad
        </p>

        <ul className="md:grid-cols-2 lg:grid-cols-3 rounded-2xl bg-dark/20 p-8 shadow-soft">
          {advantages.map(({ title, text }) => (
            <li key={title} className="my-3">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p>{text}</p>
            </li>
          ))}
        </ul>

        <div className="space-y-10 mb-6">
          <div className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Nuestros servicios de alquiler de VR</h2>

            <p className="mb-6">
              Diseñamos propuestas llave en mano para activaciones en retail, eventos corporativos, instituciones educativas y celebraciones privadas. Elegí el formato que mejor se adapte a tu ocasión
            </p>

            <ul className="md:grid-cols-2 lg:grid-cols-3 rounded-2xl bg-dark/20 p-8 shadow-soft">
              {serviceCards.map(({ heading, description }) => (
                <li key={heading} className="my-3">
                  <h3 className="text-xl font-semibold">{heading}</h3>

                  <p>{description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4">Cómo funciona?</h2>
            <ol className="space-y-4 text-base">
              <li>
                <span className="font-semibold text-secondary">1. Contactanos:</span> contanos qué necesitás y por cuánto
                tiempo querés vivir la experiencia
              </li>
              <li>
                <span className="font-semibold text-secondary">2. Coordinamos la entrega:</span> llevamos el Meta Quest 3
                directamente a tu domicilio en CABA
              </li>
              <li>
                <span className="font-semibold text-secondary">3. Disfrutá y jugá:</span> recibís una inducción express y te
                sumergís en la realidad virtual. Nosotros nos ocupamos del resto
              </li>
              <li>
                <span className="font-semibold text-secondary">4. Retiro programado:</span> al finalizar el período, pasamos a
                buscar el equipo sin que tengas que preocuparte por nada
              </li>
            </ol>
          </div>
        </div>

        <div className="rounded-2xl bg-dark/20 p-6">
          <h2 className="text-2xl font-semibold mb-4">Explorá un universo de posibilidades</h2>
          <ul className="md:grid-cols-2">
            <li>- Jugá títulos de alta gama como Beat Saber, Superhot VR o Resident Evil 4</li>
            <li>- Explorá mundos sociales en Horizon Worlds y conectate con tu comunidad sin moverte del evento</li>
            <li>- Entrená con apps de fitness inmersivo para romper la rutina</li>
            <li>- Convertí cualquier sala en un cine privado para proyecciones 360°</li>
          </ul>
        </div>

        <div className="rounded-2xl pt-6">
          <h2 className="text-2xl font-semibold mb-4">VR Buenos Aires: tu puerta de entrada a la realidad virtual</h2>

          <p className="mb-4">
            Somos más que un servicio de alquiler: acompañamos a tu equipo durante todo el proceso, desde la planificación previa hasta el retiro coordinado. Nos encargamos de la higiene de los visores, el onboarding de los invitados y la asistencia técnica in situ
          </p>

          <p>
            Qué estás esperando? La aventura está a un clic de distancia. <Link href="/alquiler" className="text-secondary underline">Consultá los precios</Link> o <Link href="/#contact" className="text-secondary underline">coordiná una demo rápida</Link> para asegurar la disponibilidad en la fecha de tu evento
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/alquiler" className="btn">Reservar Meta Quest 3</Link>
          <Link href="/#contact" className="btn btn--ghost">Hablar con un especialista</Link>
        </div>
      </section>
    </main>
  );
}
