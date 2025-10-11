"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import { AppDialog } from "@/components/AppDialog";
import { ReservePlanDialogTriggerProps } from "@/types/allTypes";

export function ReserveDialog({
    offerId,
    buttonLabel = "Reservar",
    description = "Elige el canal de contacto para confirmar la reserva del plan.",
}: ReservePlanDialogTriggerProps) {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => setDialogOpen(false);

    return (
        <>
            <Button
                variant="contained"
                onClick={handleOpenDialog}
                disableElevation
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
                    '&:hover': {
                        backgroundColor: "var(--color-accent)",
                        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.18)",
                        transform: "translateY(-2px)",
                    },
                }}
            >
                {buttonLabel}
            </Button>

            <AppDialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                title="Coordina tu reserva"
                description={description}
                titleId={`reserve-plan-${offerId}`}
            >
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
            </AppDialog>
        </>
    );
}
