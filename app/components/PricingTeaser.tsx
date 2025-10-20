import Link from "next/link";

export function PricingTeaser() {
    return (
        <section id="pricing" className="text-white text-center">
            <div className="bg-primary/90 border-4 rounded-2xl border-white/20 py-6 px-6 md:px-10 h-full">
                <h2 className="text-2xl md:text-4xl font-extrabold mb-4 md:mb-16">Alquiler VR desde $20.000 por sesión de 2 horas</h2>

                <p className="text-xl mb-6 md:mb-14">
                    Explorá planes por hora, día o semana para Meta Quest 3 con entrega y soporte en Buenos Aires
                </p>

                <Link href="/alquiler" className="btn text-lg">Ver todos los precios</Link>
            </div>
        </section>
    );
}
