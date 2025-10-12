import { AboutVideo } from "@/components/AboutVideo";

export function About() {
    return (
        <section id="about" className="pt-16 pb-10 bg-white">
            <div className="container grid md:grid-cols-2 gap-12 items-start">
                <div id="about-content" className="space-y-4 h-fit">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Acerca de nuestro servicio de alquiler de realidad virtual VR en Buenos Aires
                    </h2>
                    <p>
                        VR.CASE ofrece alquiler de lentes VR Meta Quest 3 para cualquier propósito, desde eventos
                        corporativos y fiestas infantiles. Proporcionamos un equipo completo y soporte completo
                        durante el período de alquiler
                    </p>
                    <p>
                        Nuestra misión es hacer que la realidad virtual sea accesible para todos. Sin la necesidad
                        de comprar equipos costosos, puedes experimentar todas las posibilidades del VR
                    </p>
                    <p>
                        Nos encargamos de monitorear cuidadosamente el estado de nuestro equipo y actualizamos
                        regularmente la biblioteca de juegos y aplicaciones. Los juegos y aplicaciones se instalan
                        de forma personalizada para cada cliente
                    </p>

                    <div className="overflow-hidden rounded-2xl border-2 mt-6 border-dark">
                        <img
                            src="/assets/img/two-cases.webp"
                            alt="Alquiler realidad virtual Meta Quest 3"
                            className="w-full h-auto"
                        />
                    </div>
                </div>

                <AboutVideo referenceSelector="#about-content" />
            </div>
        </section>
    );
}
