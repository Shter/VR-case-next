import Image from "next/image";
import Link from "next/link";
import { AboutVideo } from "@/components/AboutVideo";

export function About() {
    return (
        <section id="about" className="pt-16 pb-10 bg-white">
            <div className="container grid md:grid-cols-2 gap-12 items-start">
                <div id="about-content" className="space-y-4 h-fit">
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
                        Querés ver las tarifas ahora? <Link href="/alquiler" className="text-secondary underline">Revisá los planes de alquiler</Link> o contactanos para una propuesta a medida
                    </p>

                    <div className="overflow-hidden rounded-2xl border-2 mt-6 border-dark">
                        <Image
                            src="/assets/img/two-cases.webp"
                            alt="Headsets Meta Quest listos para alquiler en Buenos Aires"
                            width={960}
                            height={720}
                            className="h-auto w-full object-cover"
                            sizes="(max-width: 768px) 100vw, 480px"
                            priority
                        />
                    </div>
                </div>

                <AboutVideo referenceSelector="#about-content" />
            </div>
        </section>
    );
}
