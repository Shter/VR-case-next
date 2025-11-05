import Image from "next/image";
import { featuresItems } from "@/app/constants";
import { asset } from "@/lib/site";

export function Features() {
    return (
        <section id="features" className="bg-gradient-to-br from-light to-gray-200 py-10 md:py-16">
            <div className="container">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Por qué elegir nuestra propuesta de VR?</h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {featuresItems.map((it) => (
                        <div key={it.title} className="fade-in-up flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-soft hover:-translate-y-1 transition">
                            <Image
                                src={asset(it.img)}
                                alt={it.title}
                                width={96}
                                height={96}
                                className="mb-4 h-24 w-24 object-contain"
                            />

                            <h3 className="text-xl font-semibold mb-2">{it.title}</h3>
                            <p className="opacity-90">{it.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}