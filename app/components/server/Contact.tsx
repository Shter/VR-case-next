import Image from 'next/image';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { asset } from '@/lib/site';

const contactButtonBaseSx = {
    color        : 'white',
    borderRadius : '9999px',
    px           : 3,
    py           : 1.5,
    fontWeight   : 600,
    textTransform: 'none',
    boxShadow    : '0 10px 20px rgba(0, 0, 0, 0.15)',
    transition   : 'transform 0.2s ease, box-shadow 0.2s ease',
    display      : 'inline-flex',
    width        : 72,
    alignItems   : 'center',
};

const contactButtonHoverSx = {
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.18)',
    transform: 'translateY(-2px)',
};

const contactButtonSx = (backgroundColor: string, hoverBackgroundColor: string) => ({
    ...contactButtonBaseSx,
    backgroundColor,
    '&:hover': {
        ...contactButtonHoverSx,
        backgroundColor: hoverBackgroundColor,
    },
});

export function Contact() {
    return (
        <div className="flex flex-col h-full border-4 rounded-2xl backdrop-blur bg-white/5 border-white/20 text-center py-6 px-6 md:px-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                Hablemos sobre tu próximo evento de realidad virtual en Buenos Aires
            </h2>

            <p className="mb-6 text-lg opacity-90">
                Coordinamos reservas por WhatsApp, Instagram y email para brindarte disponibilidad inmediata,
                recomendaciones de contenido y asistencia logística
            </p>

            <Stack
                direction="row"
                spacing={3}
                justifyContent="center"
                alignItems="center"
            >
                <Tooltip title="WhatsApp: +54 9 11 2782-7150" enterDelay={200} leaveDelay={0}>
                    <Button
                        component="a"
                        href="https://wa.me/5491127827150"
                        target="_blank"
                        rel="nofollow noopener"
                        variant="contained"
                        disableElevation
                        aria-label="Contactar por WhatsApp"
                        sx={contactButtonSx('var(--color-accent)', 'var(--color-accent)')}
                    >
                        <Image src={asset('/icons/whatsapp.svg')} alt="" width={40} height={40} priority/>
                    </Button>
                </Tooltip>

                <Tooltip title="instagram.com/vr.case.ar" enterDelay={200} leaveDelay={0}>
                    <Button
                        component="a"
                        href="https://instagram.com/vr.case.ar"
                        target="_blank"
                        rel="nofollow noopener"
                        variant="contained"
                        disableElevation
                        aria-label="Contactar por Instagram"
                        sx={contactButtonSx('color-mix(in srgb, #1B449E 90%, transparent)', 'var(--color-primary)')}
                    >
                        <Image src={asset('/icons/instagram.svg')} alt="" width={40} height={40}/>
                    </Button>
                </Tooltip>

                <Tooltip title="vr.case.ar@gmail.com" enterDelay={200} leaveDelay={0}>
                    <Button
                        component="a"
                        href="mailto:vr.case.ar@gmail.com"
                        variant="contained"
                        disableElevation
                        aria-label="Contactar por email"
                        sx={contactButtonSx('var(--color-secondary)', 'var(--color-primary)')}
                    >
                        <Image
                            src="/assets/icons/email-icon.svg"
                            alt=""
                            width={40}
                            height={40}
                            className="brightness-0 invert"
                        />
                    </Button>
                </Tooltip>
            </Stack>
        </div>
    );
}
