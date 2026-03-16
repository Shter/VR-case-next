import Image from "next/image";
import { featuresItems } from "@/app/constants";
import { asset } from "@/lib/site";

export function Features() {
    return (
        <section id="features" className="py-10 text-white md:py-16">
            <div className="container">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Por qué elegir nuestra propuesta de VR?</h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {featuresItems.map((it) => (
                        <div
                            key={it.title}
                            className="fade-in-up flex flex-col items-center gap-2 rounded-2xl border-4 border-white/20 bg-white/5 p-8 text-center text-white shadow-soft backdrop-blur hover:-translate-y-1 transition"
                        >
                            <Image
                                src={asset(it.img)}
                                alt={it.title}
                                width={96}
                                height={96}
                                className="mb-4 h-24 w-24 object-contain"
                            />

                            <h3 className="mb-2 text-xl font-semibold">{it.title}</h3>
                            <p className="opacity-80">{it.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
