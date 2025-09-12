export function Faq() {
    const items = [
        { q: "Cómo alquilar Meta Quest 3 en Buenos Aires?", a: "Ofrecemos alquiler con envío rápido y soporte completo. Contáctanos por WhatsApp o Instagram para reservar." },
        { q: "Es posible alquilar lentes VR cerca de mí en Buenos Aires?", a: "Sí, entregamos Meta Quest 3 en cualquier punto de Buenos Aires." },
        { q: "Qué incluye el alquiler de Meta Quest 3?", a: "Estuche, headset Meta Quest 3, controles, Chromecast, estación de carga con baterías." },
        { q: "Puedo usar Meta Quest 3 para eventos corporativos?", a: "Sí, configuraciones personalizadas y asistencia para eventos corporativos." },
        { q: "Cuánto cuesta alquilar Meta Quest 3 por día?", a: "Desde $60.000 por día para 1 Meta Quest 3, con envío gratis." }
    ];
    return (
        <section id="faq" className="bg-white py-16">
            <div className="container">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Preguntas Frecuentes</h2>
                <div className="max-w-3xl mx-auto">
                    {items.map((it) => (
                        <details key={it.q} className="border-b py-4">
                            <summary>{it.q}</summary>
                            <p className="mt-2 opacity-90">{it.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}