import IconButton from "@mui/material/IconButton";
import Stack      from "@mui/material/Stack";

export function Contact() {
    return (
        <section className="py-16">
            <div className="container flex justify-center">
                <div className="flex flex-col border-2 rounded-2xl border-secondary max-w-2xl text-center p-6">
                    <h2 className="text-4xl md:text-3xl font-extrabold mb-6">
                        Contactanos en nuestras redes sociales para recibir asesoramiento sobre <br /> VR en Buenos Aires
                    </h2>

                    <Stack direction="row" spacing={2} justifyContent="center">
                        <IconButton
                            component="a"
                            href="https://wa.me/5491127827150"
                            target="_blank"
                            rel="nofollow noopener"
                            color="success"
                            aria-label="Contactar por WhatsApp"
                            size="large"
                            sx={{ p: 2 }}
                        >
                            <img
                                src="/assets/icons/whatsapp.svg"
                                alt="WhatsApp"
                                className="h-20 w-20"
                            />
                        </IconButton>
                        <IconButton
                            component="a"
                            href="https://instagram.com/vr.case.ar"
                            target="_blank"
                            rel="nofollow noopener"
                            color="primary"
                            aria-label="Contactar por Instagram"
                            size="large"
                            sx={{ p: 2 }}
                        >
                            <img
                                src="/assets/icons/instagram.svg"
                                alt="Instagram"
                                className="h-20 w-20"
                            />
                        </IconButton>
                    </Stack>
                </div>
            </div>
        </section>
    );
}