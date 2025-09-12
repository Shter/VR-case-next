export function About() {
    return (
        <section id="about" className="py-16 bg-white">
            <div className="container grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4 fade-in-up">
                    <h2 className="text-3xl md:text-4xl font-bold">Acerca de nuestro servicio de alquiler de realidad virtual VR en Buenos Aires</h2>
                    <p>VR.CASE ofrece alquiler de lentes VR Meta Quest 3 para cualquier propósito, desde eventos corporativos y fiestas infantiles. Proporcionamos un equipo completo y soporte completo durante el período de alquiler.</p>
                    <p>Nuestra misión es hacer que la realidad virtual sea accesible para todos. Sin la necesidad de comprar equipos costosos, puedes experimentar todas las posibilidades del VR.</p>
                    <p>Nos encargamos de monitorear cuidadosamente el estado de nuestro equipo y actualizamos regularmente la biblioteca de juegos y aplicaciones. Los juegos y aplicaciones se instalan de forma personalizada para cada cliente.</p>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="overflow-hidden rounded-2xl border border-dark/20">
                        <img src="/public/assets/img/two-cases.webp" alt="Alquiler realidad virtual Meta Quest 3" className="w-full h-auto" />
                    </div>
                    <video className="w-full rounded-2xl border-2 border-dark/50" preload="metadata" poster="/public/assets/video/action.webm" autoPlay muted loop playsInline>
                        <source src="/public/assets/video/action.webm" type="video/webm" />
                        Tu navegador no soporta el video.
                    </video>
                </div>
            </div>
        </section>
    );
}