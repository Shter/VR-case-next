import type { GameCatalogCopy, GameDetailsCopy } from '@/types/allTypes';

export const GAME_CATALOG_COPY_JUEGOS: GameCatalogCopy = {
    search: {
        label: 'Buscar juegos',
        placeholder: 'Ingresá el nombre del juego',
        helperText: 'El buscador se activa a partir de dos letras.'
    },
    genres: {
        label: 'Géneros',
        allLabel: 'Todos',
        fallbackPrefix: 'Género'
    },
    multiplayer: {
        label: 'Modalidad',
        options: [
            { value: 'all', label: 'Todo' },
            { value: 'multiplayer', label: 'Multijugador' },
            { value: 'solo', label: 'Un jugador' }
        ]
    },
    emptyState: 'No encontramos juegos de realidad virtual con esos filtros en Buenos Aires.',
    loadingLabel: 'Actualizando catálogo…',
    fetchErrorMessage: 'No pudimos cargar los juegos. Intentá nuevamente.',
    pagination: {
        previousLabel: 'Anterior',
        nextLabel: 'Siguiente',
        pageStatusLabel: 'Página {current} de {total}',
        rangeLabel: 'Mostrando {from}-{to} de {total} juegos',
        errorMessage: 'No pudimos cargar más resultados. Revisá tu conexión e intentá otra vez.'
    },
    card: {
        fallbackNamePrefix: 'Juego',
        fallbackCoverLabel: 'Imagen no disponible',
        ctaLabel: 'Ver detalles'
    }
};

export const GAME_DETAILS_COPY_JUEGOS: GameDetailsCopy = {
    fallbackNamePrefix: 'Juego VR',
    descriptionHeading: 'Descripción',
    descriptionPlaceholder: 'Muy pronto sumaremos la descripción completa de este juego.',
    controlsHeading: 'Controles e interacción',
    controlsPlaceholder: 'Estamos documentando los controles para que puedas prepararte antes del evento.',
    genreHeading: 'Género',
    genrePlaceholder: 'Muy pronto vas a ver el género principal de este juego.',
    genreFallbackPrefix: 'Género',
    multiplayerHeading: 'Modalidad',
    multiplayerInstructionsHeading: 'Guía multijugador',
    multiplayerInstructionsPlaceholder: 'Coordiná con nuestro equipo VR.CASE para habilitar esta modalidad.',
    multiplayerBadgeLabel: 'Multijugador',
    soloBadgeLabel: 'Un jugador',
    multiplayerUnknownLabel: 'Sin confirmar',
    closeLabel: 'Cerrar juego',
    backButtonLabel: 'Volver al catálogo',
    errorDescription: 'No pudimos cargar este juego. Reintentá en unos segundos.',
    retryLabel: 'Reintentar',
    loadingLabel: 'Cargando detalles…'
};
