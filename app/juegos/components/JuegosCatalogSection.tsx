import { GamesCatalogClient } from '@/app/juegos/components/GamesCatalogClient';
import type { GamesCatalogClientProps } from '@/types/allTypes';

export function JuegosCatalogSection(props: GamesCatalogClientProps) {
    return (
        <section className="container mx-auto px-4 pb-12 pt-20 md:py-24">
            <div className="flex flex-col items-center text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary"></p>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 md:mb-8">
                    Catálogo de juegos y aplicaciones de realidad virtual en Buenos Aires por VR-CASE
                </h1>
                <p className="text-lg opacity-90 mb-4 md:mb-8">
                    Nuestro catálogo reúne una selección curada de juegos y aplicaciones de realidad virtual,
                    cuidadosamente probados y recomendados, con fichas detalladas que incluyen jugabilidad, controles,
                    modos multijugador y características clave para que elijas la mejor experiencia VR
                </p>
            </div>

            <GamesCatalogClient {...props} />
        </section>
    );
}
