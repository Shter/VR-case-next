import Button from "@mui/material/Button";
import Stack  from "@mui/material/Stack";

export function Contact() {
    return (
        <section className="py-16">
            <div className="container flex justify-center">
                <div className="flex flex-col border-y-4 rounded-2xl border-secondary max-w-2xl text-center py-6 px-10">
                    <h2 className="text-4xl md:text-3xl font-extrabold mb-6">
                        Contactanos en nuestras redes sociales para recibir asesoramiento sobre <br /> VR en Buenos Aires
                    </h2>

                    <Stack direction="row" spacing={6} justifyContent="center" flexWrap="wrap">
                        <Button
                            component="a"
                            href="https://wa.me/5491127827150"
                            target="_blank"
                            rel="nofollow noopener"
                            variant="contained"
                            disableElevation
                            aria-label="Contactar por WhatsApp"
                            sx={{
                                backgroundColor: "var(--color-accent)",
                                color: "white",
                                borderRadius: "9999px",
                                px: 3,
                                py: 1.5,
                                fontWeight: 600,
                                textTransform: "none",
                                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 1.5,
                                '&:hover': {
                                    backgroundColor: "var(--color-accent)",
                                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.18)",
                                    transform: "translateY(-2px)",
                                },
                            }}
                        >
                            <img src="/assets/icons/whatsapp.svg" alt="WhatsApp" className="h-10 w-10" />
                            <span className="text-lg">WhatsApp</span>
                        </Button>
                        <Button
                            component="a"
                            href="https://instagram.com/vr.case.ar"
                            target="_blank"
                            rel="nofollow noopener"
                            variant="contained"
                            disableElevation
                            aria-label="Contactar por Instagram"
                            sx={{
                                backgroundColor: "color-mix(in srgb, #1B449E 90%, transparent)",
                                color: "white",
                                borderRadius: "9999px",
                                px: 3,
                                py: 1.5,
                                fontWeight: 600,
                                textTransform: "none",
                                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 1.5,
                                '&:hover': {
                                    backgroundColor: "var(--color-primary)",
                                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.18)",
                                    transform: "translateY(-2px)",
                                },
                            }}
                        >
                            <img src="/assets/icons/instagram.svg" alt="Instagram" className="h-10 w-10" />
                            <span className="text-lg">Instagram</span>
                        </Button>
                    </Stack>
                </div>
            </div>
        </section>
    );
}