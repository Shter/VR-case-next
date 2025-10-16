import Image from "next/image";
import Link from "next/link";
import { AboutVideo } from "@/components/AboutVideo";

export function About() {
    return (
        <section id="about" className="py-16 bg-white">
            <div className="container grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_auto] md:items-stretch">
                <div className="flex md:self-stretch">
                    <div className="relative w-full overflow-hidden rounded-2xl border-2 border-dark aspect-[4/3] md:aspect-auto md:h-full md:max-h-[600px]">
                        <Image
                            src="/assets/img/two-cases.webp"
                            alt="Headsets Meta Quest listos para alquiler en Buenos Aires"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 28vw, 360px"
                            priority
                        />
                    </div>
                </div>

                <div id="about-content" className="space-y-4 h-fit md:self-stretch md:flex md:flex-col md:justify-center">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Alquiler de realidad virtual con setup completo en Buenos Aires
                    </h2>
                    <p>
                        VR.CASE prepara y entrega headsets Meta Quest 3 listos para usar. Configuramos los juegos que
                        mejor se adaptan a tu evento, llevamos accesorios de respaldo y permanecemos disponibles durante
                        toda la experiencia
                    </p>
                    <p>
                        Mantenemos cada equipo higienizado, con baterías cargadas y contenido actualizado. Así garantizamos sesiones fluidas sin cables ni PC dedicadas, ideales para activaciones, team buildings y celebraciones familiares
                    </p>
                    <p>
                        Querés ver las tarifas ahora? <Link href="/alquiler" className="text-accent font-bold hover:underline">Revisá los planes de alquiler</Link> o contactanos para una propuesta a medida
                    </p>

                </div>

                <AboutVideo referenceSelector="#about-content" />
            </div>
        </section>
    );
}
