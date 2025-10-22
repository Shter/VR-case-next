import Image from 'next/image';
import Link from 'next/link';
import { asset } from '@/lib/site';

export function Hero() {
  const heroBackgroundSrc = asset('/images/hero-background.webp');

  return (
    <section id="home" className="hero-bg relative overflow-hidden">
      <Image
        src={heroBackgroundSrc}
        alt="Experiencia VR en Buenos Aires"
        fill
        priority
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[rgba(26,26,46,0.76)]" aria-hidden="true" />

      <div className="container relative">
        <div className="mx-auto max-w-3xl">
          <h1 className="fade-in-up mb-6 text-4xl font-extrabold md:text-5xl">
            Alquiler de realidad virtual VR en Buenos Aires con Meta Quest 3
          </h1>
          <p className="fade-in-up mb-8 text-lg opacity-90 md:text-xl">
            Activamos experiencias inmersivas para eventos corporativos, lanzamientos y reuniones privadas. Recibí los headsets Meta Quest 3 listos para jugar con entrega, instalación y soporte en toda CABA
          </p>
          <div className="fade-in-up flex flex-wrap items-center justify-center gap-4">
            <Link href="/alquiler" className="btn">Ver planes y precios</Link>
            <Link href="/vr-buenos-aires" className="btn btn--ghost">
              Cómo funciona el servicio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
