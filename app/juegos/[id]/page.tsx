import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { supabaseClient } from '@/lib/supabase/client';
import { Game, GameFiltersState, PageProps } from '@/types/allTypes';
import {
    buildFiltersQueryString,
    normalizeLegacyShowMultiplayer,
    parseGenreIdsParam,
    parseMultiplayerParam,
    parseSearchParam
} from '@/lib/juegos/filters';
import { normalizeGame } from '@/lib/juegos/normalizers';

async function fetchGameById(rawId: string): Promise<Game | null> {
    const decodedId = decodeURIComponent(rawId.trim());

    if (!decodedId) {
        return null;
    }

    const isNumeric = /^\d+$/.test(decodedId);

    const queryValue = isNumeric ? Number(decodedId) : decodedId;

    const { data, error } = await supabaseClient
        .from('games')
        .select('*')
        .eq('id', queryValue)
        .maybeSingle();

    if (error) {
        console.error('[supabase] empty', error);
        throw new Error('Не удалось загрузить данные игры. Попробуйте позже.');
    }

    if (data) {
        return normalizeGame(data as Game);
    }

    if (!isNumeric) {
        const numericId = Number(decodedId);
        if (!Number.isNaN(numericId)) {
            const { data: numericData, error: numericError } = await supabaseClient
                .from('games')
                .select('*')
                .eq('id', numericId)
                .maybeSingle();

            if (numericError) {
                console.error('[supabase]  ID', numericError);
                throw new Error('error');
            }

            if (numericData) {
                return normalizeGame(numericData as Game);
            }
        }
    }

    return null;
}

const getGameById = cache(fetchGameById);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const paramsValue = await params;
    const game = await getGameById(paramsValue.id);

    if (!game) {
        return {
            title: 'Juego no encontrado',
            description: 'No encontramos información sobre este juego en la base de datos.'
        } satisfies Metadata;
    }

    const fallbackTitle = `Juego #${paramsValue.id}`;
    const title = game.name ?? fallbackTitle;
    const description = game.description ?? 'Detalles del juego desde la base de datos de Supabase.';

    return {
        title,
        description
    } satisfies Metadata;
}

export default async function GamePage({ params, searchParams }: PageProps) {
    const paramsValue = await params;
    const game = await getGameById(paramsValue.id);
    const searchParamsValue = await searchParams;

    if (!game) {
        notFound();
    }

    const fallbackTitle = `Juego #${paramsValue.id}`;
    const name = game.name ?? fallbackTitle;
    const description = game.description;
    const controls = game.controls;
    const multiplayerInstructions = game.multiplayer_instructions;
    const cover = game.image_url;
    const isMultiplayer = game.multiplayer === true;

    const rawMultiplayer = searchParamsValue?.multiplayer;
    const legacyMultiplayer = normalizeLegacyShowMultiplayer(searchParamsValue?.showMultiplayer);
    const multiplayerParam = typeof rawMultiplayer === 'undefined' ? legacyMultiplayer : rawMultiplayer;

    const filtersFromParams: GameFiltersState = {
        genreIds: parseGenreIdsParam(searchParamsValue?.genres),
        multiplayerFilter: parseMultiplayerParam(multiplayerParam),
        searchTerm: parseSearchParam(searchParamsValue?.search)
    };

    const filtersQuery = buildFiltersQueryString(filtersFromParams);
    const backHref = filtersQuery ? `/juegos?${filtersQuery}` : '/juegos';

    return (
        <section className="container mx-auto px-4 py-16 md:py-24">
            <div className="mb-8">
                <Link
                    href={backHref}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                    ← Volver a juegos
                </Link>
            </div>

            <div className="mx-auto flex max-w-5xl flex-col gap-12">
                <header className="space-y-6 text-center">
                    <h1 className="text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">{name}</h1>
                </header>

                {cover ? (
                    <div className="overflow-hidden rounded-3xl shadow-soft">
                        <Image
                            src={cover}
                            alt={name}
                            width={1600}
                            height={900}
                            className="h-full w-full object-cover"
                            priority
                            unoptimized
                        />
                    </div>
                ) : null}

                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Descripción</h2>
                    {description ? (
                        <p className="whitespace-pre-line text-base leading-relaxed text-gray-700">{description}</p>
                    ) : (
                        <p className="text-base text-gray-500">La descripción estará disponible próximamente.</p>
                    )}
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-900">Controles</h2>
                    {controls ? (
                        <p className="whitespace-pre-line text-base leading-relaxed text-gray-700">{controls}</p>
                    ) : (
                        <p className="text-base text-gray-500">Los controles estarán disponibles próximamente.</p>
                    )}
                </section>

                {isMultiplayer && multiplayerInstructions ? (
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900">Instrucciones multijugador</h2>
                        <p className="whitespace-pre-line text-base leading-relaxed text-gray-700">{multiplayerInstructions}</p>
                    </section>
                ) : null}
            </div>
        </section>
    );
}
