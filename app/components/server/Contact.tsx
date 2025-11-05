import Image from 'next/image';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { asset } from '@/lib/site';

export function Contact() {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col border-4 rounded-2xl border-secondary max-w-2xl text-center py-6 px-10">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                    Hablemos sobre tu próximo evento de realidad virtual en Buenos Aires
                </h2>

                <p className="mb-6 text-lg opacity-90">
                    Coordinamos reservas por WhatsApp e Instagram para brindarte disponibilidad inmediata,
                    recomendaciones de contenido y asistencia logística
                </p>

                <Stack
                    direction={{xs: "column", md: "row"}}
                    spacing={{xs: 3, md: 6}}
                    justifyContent="center"
                    alignItems={{xs: "stretch", md: "center"}}
                >
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
                            color          : "white",
                            borderRadius   : "9999px",
                            px             : 3,
                            py             : 1.5,
                            fontWeight     : 600,
                            textTransform  : "none",
                            boxShadow      : "0 10px 20px rgba(0, 0, 0, 0.15)",
                            transition     : "transform 0.2s ease, box-shadow 0.2s ease",
                            display        : "inline-flex",
                            width          : {xs: "100%", md: 260},
                            alignItems     : "center",
                            gap            : 1.5,
                            '&:hover'      : {
                                backgroundColor: "var(--color-accent)",
                                boxShadow      : "0 12px 24px rgba(0, 0, 0, 0.18)",
                                transform      : "translateY(-2px)",
                            },
                        }}
                    >
                        <Image src={asset('/icons/whatsapp.svg')} alt="WhatsApp" width={40} height={40} priority/>
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
                            color          : "white",
                            borderRadius   : "9999px",
                            px             : 3,
                            py             : 1.5,
                            fontWeight     : 600,
                            textTransform  : "none",
                            boxShadow      : "0 10px 20px rgba(0, 0, 0, 0.15)",
                            transition     : "transform 0.2s ease, box-shadow 0.2s ease",
                            display        : "inline-flex",
                            width          : {xs: "100%", md: 260},
                            alignItems     : "center",
                            gap            : 1.5,
                            '&:hover'      : {
                                backgroundColor: "var(--color-primary)",
                                boxShadow      : "0 12px 24px rgba(0, 0, 0, 0.18)",
                                transform      : "translateY(-2px)",
                            },
                        }}
                    >
                        <Image src={asset('/icons/instagram.svg')} alt="Instagram" width={40} height={40}/>
                        <span className="text-lg">Instagram</span>
                    </Button>
                </Stack>
            </div>
        </div>
    );
}
