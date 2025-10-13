import Link from "next/link";

export function PricingTeaser() {
    return (
        <section id="pricing" className="p-6 border-y-4 border-white/20  bg-primary/90 text-white text-center py-14">
            <div className="container">
                <h2 className="md:text-4xl font-extrabold mb-4">Alquiler VR desde $20.000 por sesión de 2 horas</h2>

                <p className="text-xl mb-6">Explorá planes por hora, día o semana para Meta Quest 3 con entrega y soporte en Buenos Aires</p>
                <Link href="/alquiler" className="btn">Ver todos los precios</Link>
            </div>
        </section>
    );
}
