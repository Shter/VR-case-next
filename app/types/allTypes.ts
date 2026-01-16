import { Route } from "next";
import { UrlObject } from "url";
import { ReactElement, ReactNode, MouseEvent } from "react";
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

export type Game = {
    id: number | string;
    name: string | null;
    description: string | null;
    image_url: string | null;
    controls: string | null;
    multiplayer: boolean | null;
    multiplayer_instructions: string | null;
    genre: number[] | null;
    source_url?: string | null;
    created_at?: string | null;
};

export type GamePreview = {
    gameId: number | string;
    posterUrl: string | null;
    description: string | null;
    videoUrl: string | null;
    sourceUrl: string | null;
    fetchedAt: string;
};

export type GamePreviewDictionary = Record<string, GamePreview>;

export type GamePreviewRequestItem = {
    id: number | string;
    sourceUrl: string;
};

export type GamePreviewError = {
    gameId: number | string;
    message: string;
};

export type GamePreviewsResponse = {
    previews: GamePreview[];
    errors?: GamePreviewError[];
};

export type Genre = {
    id: number;
    name: string;
};

export type GameFiltersState = {
    genreIds: number[];
    multiplayerFilter: 'all' | 'multiplayer' | 'solo';
    searchTerm: string;
};

export type GameCatalogMultiplayerOption = {
    value: 'all' | 'multiplayer' | 'solo';
    label: string;
};

export type GameCatalogCopy = {
    search: {
        label: string;
        placeholder: string;
        helperText?: string;
    };
    genres: {
        label: string;
        allLabel: string;
        fallbackPrefix: string;
    };
    multiplayer: {
        label: string;
        options: GameCatalogMultiplayerOption[];
    };
    emptyState: string;
    loadingLabel: string;
    fetchErrorMessage: string;
    pagination: {
        previousLabel: string;
        nextLabel: string;
        pageStatusLabel: string;
        rangeLabel: string;
        errorMessage: string;
    };
    card: {
        fallbackNamePrefix: string;
        fallbackCoverLabel: string;
        ctaLabel: string;
    };
};

export type GameDetailsCopy = {
    fallbackNamePrefix: string;
    descriptionHeading: string;
    descriptionPlaceholder: string;
    controlsHeading: string;
    controlsPlaceholder: string;
    genreHeading: string;
    genrePlaceholder: string;
    genreFallbackPrefix: string;
    multiplayerHeading: string;
    multiplayerInstructionsHeading: string;
    multiplayerInstructionsPlaceholder: string;
    multiplayerBadgeLabel: string;
    soloBadgeLabel: string;
    multiplayerUnknownLabel: string;
    closeLabel: string;
    backButtonLabel: string;
    errorDescription: string;
    retryLabel: string;
    loadingLabel: string;
};

export type GameBrowserProps = {
    initialGames: Game[];
    initialTotal: number;
    genres: Genre[];
    initialGenreIds: number[];
    initialMultiplayerFilter: 'all' | 'multiplayer' | 'solo';
    initialSearchTerm: string;
    initialQueryString: string;
    initialPage?: number;
    pageSize?: number;
    copy: GameCatalogCopy;
    detailBasePath: string;
    onGameCardNavigateAction?: (game: Game, href: string, event: MouseEvent<HTMLAnchorElement>) => void;
    onFiltersQueryChangeAction?: (queryString: string) => void;
    onVisibleGamesChangeAction?: (games: Game[]) => void;
    onPreviewsChangeAction?: (previews: GamePreviewDictionary) => void;
};

export type GameFiltersProps = {
    genres: Genre[];
    selectedGenreIds: number[];
    multiplayerFilter: 'all' | 'multiplayer' | 'solo';
    searchValue: string;
    onToggleGenreAction: (genreId: number) => void;
    onResetGenresAction: () => void;
    onSelectMultiplayerFilterAction: (value: 'all' | 'multiplayer' | 'solo') => void;
    onSearchChangeAction: (value: string) => void;
    copy: GameCatalogCopy;
};

export type GamesGridProps = {
    games: Game[];
    isLoading: boolean;
    isUiLoading: boolean;
    currentPage: number;
    totalPages: number;
    totalResults: number;
    pageSize: number;
    filtersQueryString: string;
    onPageChangeAction: (page: number) => void;
    detailBasePath: string;
    copy: GameCatalogCopy;
    onGameCardNavigateAction?: (game: Game, href: string, event: MouseEvent<HTMLAnchorElement>) => void;
    previewsByGameId: GamePreviewDictionary;
    isPreviewLoading: boolean;
};

export type GameCardProps = {
    game: Game;
    queryString: string;
    detailBasePath: string;
    copy: GameCatalogCopy;
    onNavigateAction?: (game: Game, href: string, event: MouseEvent<HTMLAnchorElement>) => void;
    preview?: GamePreview;
};

export type JuegosPageProps = {
    searchParams?: Record<string, string | string[] | undefined>;
};

export type PageProps = {
    params: {
        id: string;
    };
    searchParams?: Record<string, string | string[] | undefined>;
};

export type GameDetailsDialogProps = {
    open: boolean;
    game: Game | null;
    isLoading: boolean;
    error: string | null;
    copy: GameDetailsCopy;
    genres: Genre[];
    onCloseAction: () => void;
    onRetryAction?: () => void;
    backHref?: Route;
    preview?: GamePreview;
};

export type GamesCatalogClientProps = GameBrowserProps & {
    detailsCopy: GameDetailsCopy;
};

export type StandaloneGameDialogProps = {
    game: Game;
    copy: GameDetailsCopy;
    backHref: Route;
    genres: Genre[];
};
