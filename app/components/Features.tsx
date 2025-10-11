export function Features() {
    const items = [
        { img: "/assets/img/gamepad.webp", title: "Más de 100 juegos", text: "Una enorme biblioteca de los juegos y aplicaciones VR más populares." },
        { img: "/assets/img/lightning.webp", title: "Favorito por su rendimiento", text: "Pantalla mejorada y procesador para una experiencia fluida." },
        { img: "/assets/img/support.webp", title: "Online soporte completo", text: "Asesoramiento y asistencia durante todo el período de alquiler." },
        { img: "/assets/img/prise.webp", title: "Equipo profesional", text: "Solo dispositivos originales con garantía y mantenimiento." },
        { img: "/assets/img/dron.webp", title: "Envío rápido", text: "Te llevamos el equipo cuando y donde te convenga." },
        { img: "/assets/img/flex.webp", title: "Condiciones flexibles", text: "Desde horas hasta semanas a tarifas competitivas." },
    ];
    return (
        <section id="features" className="bg-gradient-to-br from-light to-gray-200 pt-8 pb-16">
            <div className="container">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Por qué elegir nuestra virtual realidad?</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((it) => (
                        <div key={it.title} className="fade-in-up flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-soft hover:-translate-y-1 transition">
                            <img src={it.img} alt="icon" className="h-24 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{it.title}</h3>
                            <p className="opacity-90">{it.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}