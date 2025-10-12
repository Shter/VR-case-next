import { faqItems } from "@/app/constants";

export function Faq() {
    return (
        <section id="faq" className="bg-white py-16">
            <div className="container">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Preguntas Frecuentes</h2>

                <div className="max-w-3xl mx-auto">
                    {faqItems.map((it) => (
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