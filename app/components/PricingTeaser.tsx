import Link from "next/link";

export function PricingTeaser() {
    return (
        <section id="pricing" className="p-6 border-y-4 border-white/20  bg-primary/90 text-white text-center py-14">
            <div className="container">
                <h2 className="md:text-4xl font-extrabold mb-4">Alquiler VR desde $7,000 por hora!</h2>

                <p className="text-xl mb-6">Explora nuestras tarifas flexibles para alquiler de lentes VR Meta Quest 3 en Buenos Aires</p>
                <Link href="/alquiler" className="btn">Ver todos los precios</Link>
            </div>
        </section>
    );
}