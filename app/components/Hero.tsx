import Link from "next/link";

export function Hero() {
    return (
        <section id="home" className="hero-bg pt-24">
            <div className="container">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 fade-in-up">
                        Realidad virtual VR en Buenos Aires. Alquiler lentes VR Meta Quest 3
                    </h1>
                    <p className="text-lg md:text-xl mb-8 opacity-90 fade-in-up">
                        Sumérgete en la realidad virtual con Meta Quest 3 en Buenos Aires. Ideal para eventos corporativos, fiestas infantiles y uso personal
                    </p>
                    <div className="flex items-center justify-center gap-4 fade-in-up">
                        <Link href="/alquiler" className="btn">Seleccionar tarifa</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}