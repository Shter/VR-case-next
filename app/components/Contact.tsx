export function Contact() {
    return (
        <section id="contact" className="bg-gradient-to-br from-light to-gray-200 py-16">
            <div className="container">
                <div className="max-w-2xl mx-auto text-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-6">Contáctanos en nuestras redes sociales</h3>
                    <div className="flex items-center justify-center gap-4">
                        <a href="https://wa.me/5491127827150" rel="nofollow" target="_blank">
                            <img src="/public/assets/icons/whatsapp.svg" alt="WhatsApp" className="h-10 w-10" />
                        </a>
                        <a href="https://instagram.com/vr.case.ar" rel="nofollow" target="_blank">
                            <img src="/public/assets/icons/instagram.svg" alt="Instagram" className="h-10 w-10" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}