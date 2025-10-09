import Link from "next/link";

export function PricingTeaser() {
    return (
        <section id="pricing" className="bg-primary text-white text-center py-14">
            <div className="container">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Alquiler VR desde $7,000 por hora!</h2>
                <p className="opacity-90 max-w-3xl mx-auto mb-6">Explora nuestras tarifas flexibles para alquiler de lentes VR Meta Quest 3 en Buenos Aires.</p>
                <Link href="/alquiler" className="btn">Ver todas las tarifas</Link>
            </div>
        </section>
    );
}