import { Route } from "next";
import { UrlObject } from "url";
import { ReactElement, ReactNode } from "react";
import { DialogProps } from "@mui/material/Dialog";

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

export type PricingOfferGroups = {
    oneHeadset: Offer[];
    twoHeadsets: Offer[];
};

type NavHref = Route | UrlObject;

export type NavItem = {
    href: NavHref;
    label: string;
};

export type HeaderNavigationProps = {
    items: NavItem[];
};

export type HeaderMenuProps = {
    children: ReactElement;
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
    onCloseAction: () => void;
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

export type GalleryImage = {
    id: string;
    src: string;
    alt: string;
    caption?: string;
    width: number;
    height: number;
};

export type FaqGalleryItem = {
    id: string;
    question: string;
    answer: string;
};

export type FaqGalleryLightboxProps = {
    images: GalleryImage[];
    currentIndex: number;
    open: boolean;
    onCloseAction: () => void;
    onNavigateAction: (nextIndex: number) => void;
};

export type MediaAssetKind = 'photo' | 'video';

export type MediaAsset = {
    kind: MediaAssetKind;
    pathname: string;
    url: string;
    size: number;
    uploadedAt: string;
    contentType: string;
};

export type UploadMediaOptions = {
    file: File;
    kind: MediaAssetKind;
    targetPath?: string;
    addRandomSuffix?: boolean;
    contentType?: string;
};

export type UploadMediaResult = {
    asset: MediaAsset;
    downloadUrl: string;
    contentDisposition?: string;
};

export type ListMediaOptions = {
    kind?: MediaAssetKind;
    prefixOverride?: string;
    limit?: number;
    cursor?: string;
};

export type ListMediaResult = {
    items: MediaAsset[];
    cursor?: string | null;
    hasMore: boolean;
};
