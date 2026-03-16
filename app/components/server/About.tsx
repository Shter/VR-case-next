import Image from 'next/image';
import Link from 'next/link';
import { asset } from '@/lib/site';

export function About() {
    return (
        <section id="about" className="py-10 text-white md:py-16">
            <div className="container grid gap-6 md:gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_auto] md:items-stretch">
                <div className="flex order-2 md:order-1 md:self-stretch">
                    <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border-4 border-white/30 md:aspect-auto md:h-full md:max-h-[600px]">
                        <Image
                            src={asset('/images/two-cases.webp')}
                            alt="Headsets Meta Quest listos para alquiler en Buenos Aires"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 28vw, 360px"
                            priority
                        />
                    </div>
                </div>

                <div id="about-content" className="order-1 h-fit space-y-4 text-white md:order-2 md:flex md:flex-col md:justify-center md:self-stretch">
                    <h2 className="text-3xl md:text-4xl text-center md:text-left font-bold">
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
            </div>
        </section>
    );
}
