import Link from "next/link";

export function Hero() {
    return (
        <section id="home" className="hero-bg pt-24">
            <div className="container">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 fade-in-up">
                        Alquiler de realidad virtual VR en Buenos Aires con Meta Quest 3
                    </h1>
                    <p className="text-lg md:text-xl mb-8 opacity-90 fade-in-up">
                        Activamos experiencias inmersivas para eventos corporativos, lanzamientos y reuniones privadas. Recibí los headsets Meta Quest 3 listos para jugar con entrega, instalación y soporte en toda CABA
                    </p>
                    <div className="flex items-center justify-center gap-4 flex-wrap fade-in-up">
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
