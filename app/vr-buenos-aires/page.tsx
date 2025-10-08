import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { vrBuenosAiresBreadcrumbLd, vrServiceLd } from "@/lib/structured";
import Link from "next/link";

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
          <section className="max-w-4xl mx-auto py-20 px-4">
          <JsonLd data={vrBuenosAiresBreadcrumbLd()} />
          <JsonLd data={vrServiceLd()} />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">VR Buenos Aires: alquiler de lentes Meta Quest 3</h1>
              <p className="text-lg  mb-6">
                  незнакомы с ВР? у вас есть отличная возможность познакомиться поближе в домашних условиях. Мы предлагаем
                  VR Buenos Aires y VR Argentina para eventos, fiestas y empresas. En VR.CASE alquilamos headsets Meta Quest 3 con
                  instalación y soporte para que tu experiencia de realidad virtual sea impecable. Servicio en CABA y Zona Norte.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                  <a href="https://wa.me/5491127827150" target="_blank" rel="nofollow"
                     className="inline-flex items-center justify-center rounded bg-green-500 px-5 py-3 font-semibold text-white hover:bg-green-600">
                      Consultar por WhatsApp
                  </a>
                  <Link href="/alquiler-precios" className="inline-flex items-center justify-center rounded border border-white/20 px-5 py-3 font-semibold hover:bg-white/10">
                      Ver precios y planes
                  </Link>
                  <a href="/#contact" className="inline-flex items-center justify-center rounded border border-white/20 px-5 py-3 font-semibold hover:bg-white/10">
                      Contacto
                  </a>
              </div>

              <div className="grid md:grid-cols-2 gap-10 mb-14">
                  <div>
                      <h2 className="text-2xl font-semibold mb-3">¿Por qué elegir VR en Buenos Aires?</h2>
                      <ul className="list-disc pl-5 space-y-2 ">
                          <li>Experiencias inmersivas de alta calidad con Meta Quest 3 (standalone, sin cables).</li>
                          <li>Ideal para <strong>eventos corporativos</strong>, activaciones de marca y <strong>fiestas</strong>.</li>
                          <li>Instalación, calibración y <strong>soporte técnico</strong> durante el evento.</li>
                          <li>Catálogo de juegos y experiencias: Beat Saber, Superhot VR, Job Simulator, más títulos familiares.</li>
                          <li>Servicio de <strong>VR Argentina</strong>: cobertura en CABA y Zona Norte (Olivos, Vicente López, Núñez, Belgrano, Palermo, San Isidro, Martínez).</li>
                      </ul>
                  </div>
                  <div>
                      <h2 className="text-2xl font-semibold mb-3">¿Qué incluye el alquiler?</h2>
                      <ul className="list-disc pl-5 space-y-2 ">
                          <li>Headsets Meta Quest 3 con correas cómodas y cargadores.</li>
                          <li>Juegos/experiencias preinstalados según el tipo de evento.</li>
                          <li>Brief rápido de uso y mejores prácticas para los invitados.</li>
                          <li>Opcional: monitores para proyección, señalética y stands.</li>
                          <li>Envío a domicilio en Buenos Aires y retiro programado.</li>
                      </ul>
                  </div>
              </div>

              <div className="mb-12">
                  <h2 className="text-2xl font-semibold mb-3">Casos de uso populares</h2>
                  <div className="grid md:grid-cols-3 gap-6 ">
                      <div className="rounded border border-white/10 p-4">
                          <h3 className="font-semibold mb-1">Eventos corporativos</h3>
                          <p>Team building, lanzamientos, ferias y congresos. Atraé visitas con una demo VR impactante.</p>
                      </div>
                      <div className="rounded border border-white/10 p-4">
                          <h3 className="font-semibold mb-1">Fiestas y cumpleaños</h3>
                          <p>Experiencias seguras y divertidas para todas las edades. Juegos activos y party-friendly.</p>
                      </div>
                      <div className="rounded border border-white/10 p-4">
                          <h3 className="font-semibold mb-1">Educación y training</h3>
                          <p>Simuladores, recorridos virtuales y contenidos didácticos para escuelas y capacitaciones.</p>
                      </div>
                  </div>
              </div>

              <div className="mb-12">
                  <h2 className="text-2xl font-semibold mb-3">Zonas de cobertura</h2>
                  <p className="">CABA (Palermo, Recoleta, Belgrano, Núñez, Caballito, Microcentro) y Zona Norte (Olivos, Vicente López, Florida, Martínez, San Isidro). Consultá por otras zonas de Buenos Aires.</p>
              </div>

              <div className="mb-12">
                  <h2 className="text-2xl font-semibold mb-3">Planes recomendados</h2>
                  <ul className="list-disc pl-5 space-y-2 ">
                      <li>1 headset — ideal para grupos chicos o demos continuas.</li>
                      <li>2 headsets — más rotación de invitados y menos tiempo de espera.</li>
                      <li>Por hora o por día — elegí la modalidad según tu evento.</li>
                  </ul>
                  <div className="mt-4">
                      <Link href="/alquiler-precios" className="text-secondary underline font-semibold">Ver precios de alquiler VR en Buenos Aires</Link>
                  </div>
              </div>

              <div className="mb-14">
                  <h2 className="text-2xl font-semibold mb-3">Preguntas frecuentes (VR Buenos Aires / VR Argentina)</h2>
                  <div className="space-y-4 ">
                      <details className="rounded border border-white/10 p-4">
                          <summary className="font-semibold cursor-pointer">¿En qué barrios de Buenos Aires trabajan?</summary>
                          <p>CABA completa (Palermo, Recoleta, Belgrano, Núñez, Caballito, Microcentro) y Zona Norte (Olivos, Vicente López, Florida, Martínez, San Isidro). Consultá por disponibilidad en otras zonas de <strong>VR Argentina</strong>.</p>
                      </details>
                      <details className="rounded border border-white/10 p-4">
                          <summary className="font-semibold cursor-pointer">¿Qué juegos y experiencias incluyen?</summary>
                          <p>Beat Saber, Superhot VR, Job Simulator y más títulos para todas las edades. Podemos adaptar el contenido según tu evento.</p>
                      </details>
                      <details className="rounded border border-white/10 p-4">
                          <summary className="font-semibold cursor-pointer">¿Proveen instalación y asistencia?</summary>
                          <p>Sí. Llevamos, instalamos y dejamos todo listo. También podemos asistir durante el evento para guiar a los invitados.</p>
                      </details>
                      <details className="rounded border border-white/10 p-4">
                          <summary className="font-semibold cursor-pointer">¿Cuánto tiempo de alquiler recomiendan?</summary>
                          <p>Para fiestas, 2–4 horas suele ser ideal. Para stands o activaciones, recomendamos jornada completa para maximizar el alcance.</p>
                      </details>
                  </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                  <a href="https://wa.me/5491127827150" target="_blank" rel="nofollow"
                     className="inline-flex items-center justify-center rounded bg-green-500 px-5 py-3 font-semibold text-white hover:bg-green-600">
                      Reservar por WhatsApp
                  </a>
                  <a href="mailto:info@vr-case.com.ar" className="inline-flex items-center justify-center rounded border border-white/20 px-5 py-3 font-semibold hover:bg-white/10">
                      Escribir por Email
                  </a>
              </div>
        </section>
      </main>
  );
}