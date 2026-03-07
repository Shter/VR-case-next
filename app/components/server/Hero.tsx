import Link from 'next/link';

export function Hero() {
  return (
    <section id="home" className="hero-bg relative">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <h1 className="fade-in-up mb-6 text-4xl font-extrabold md:text-5xl">
            Alquiler de realidad virtual VR en Buenos Aires con Meta Quest 3
          </h1>
          <p className="fade-in-up mb-8 text-lg opacity-90 md:text-xl">
            Activamos experiencias inmersivas para eventos corporativos, lanzamientos y reuniones privadas. Recibí los headsets Meta Quest 3 listos para jugar con entrega, instalación y soporte en toda CABA y alrededores
          </p>
          <div className="fade-in-up flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/alquiler" className="btn w-full text-center sm:w-64">Ver planes y precios</Link>
            <Link href="/vr-buenos-aires" className="btn btn--ghost w-full text-center sm:w-64">
              Cómo funciona el servicio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
