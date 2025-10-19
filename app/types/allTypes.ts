import { Route } from "next";
import { UrlObject }        from "url";
import { ReactNode } from "react";
import { DialogProps }      from "@mui/material/Dialog";

export type Offer = {
    id: string;
    title: string;
    headsets: number;
    period: string;
    price: number;
    rentLimit: string;
    plusPrice?: number;
    plusUnit?: string;
};

type NavHref = Route | UrlObject;

export type NavItem = {
    href: NavHref;
    label: string;
};

export type PriceSectionProps = {
    title: string;
    offers: Offer[];
};

export type PriceCardProps = {
    offer: Offer;
};

export type AppDialogProps = {
    open: boolean;
    onClose: () => void;
    title?: ReactNode;
    description?: ReactNode;
    children?: ReactNode;
    actions?: ReactNode;
    titleId?: string;
    maxWidth?: DialogProps['maxWidth'];
    fullWidth?: boolean;
    closeLabel?: string;
};

export type ReservePlanDialogTriggerProps = {
    offerId: string;
    buttonLabel?: string;
    description?: string;
};

export type GalleryViewerProps = {
    images: string[];
};

export type AboutVideoProps = {
    referenceSelector: string;
};

export type FaqGalleryImage = {
    id: string;
    src: string;
    alt: string;
    caption?: string;
};

export type FaqGalleryItem = {
    id: string;
    question: string;
    answer: string;
    image: FaqGalleryImage;
};

export type FaqGalleryLightboxProps = {
    images: FaqGalleryImage[];
    currentIndex: number;
    open: boolean;
    onClose: () => void;
    onNavigate: (nextIndex: number) => void;
};
