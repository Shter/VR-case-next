import { Route } from "next";
import { UrlObject }        from "url";
import { ReactElement, ReactNode } from "react";
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

export type AboutVideoProps = {
    referenceSelector: string;
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

export type GameRecord = {
    id: number | string;
    title?: string | null;
    name?: string | null;
    description?: string | null;
    cover_url?: string | null;
    image_url?: string | null;
    category?: string | string[] | null;
    categories?: string[] | null;
    genre?: string | string[] | null;
    genres?: string[] | null;
    tags?: string[] | null;
    multiplayer?: boolean | string | number | null;
    controls?: string | null;
    multiplayer_instructions?: string | null;
    [key: string]: unknown;
};

export type GameCardProps = {
    game: GameRecord;
    queryString: string;
};

export type FilterableGamesProps = {
    games: GameRecord[];
    initialCategories: string[];
    initialShowMultiplayer: boolean;
};

export type JuegosPageProps = {
    searchParams?: Record<string, string | string[] | undefined>;
};