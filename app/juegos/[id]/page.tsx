/* eslint-disable @next/next/no-img-element */

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { supabaseClient } from '@/lib/supabase/client';
import type { GameRecord } from '../page';

export const revalidate = 60;

type PageProps = {
    params: {
        id: string;
    };
    searchParams?: Record<string, string | string[] | undefined>;
};

async function fetchGameById(rawId: string): Promise<GameRecord | null> {
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
        console.error('[supabase] Не удалось получить запись игры', error);
        throw new Error('Не удалось загрузить данные игры. Попробуйте позже.');
    }

    if (data) {
        return data as GameRecord;
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
                console.error('[supabase] Ошибка при повторном запросе игры по числовому ID', numericError);
                throw new Error('Не удалось загрузить данные игры. Попробуйте позже.');
            }

            if (numericData) {
                return numericData as GameRecord;
            }
        }
    }

    return null;
}

const getGameById = cache(fetchGameById);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const game = await getGameById(params.id);

    if (!game) {
        return {
            title: 'Juego no encontrado',
            description: 'No encontramos información sobre este juego en la base de datos.'
        } satisfies Metadata;
    }

    const title = game.title ?? game.name ?? `Juego #${params.id}`;
    const description = (game.description as string | null | undefined)
        ?? 'Detalles del juego desde la base de datos de Supabase.';

    return {
        title,
        description
    } satisfies Metadata;
}

export default async function GamePage({ params, searchParams }: PageProps) {
    const game = await getGameById(params.id);

    if (!game) {
        notFound();
    }

    const title = game.title ?? game.name ?? `Juego #${params.id}`;
    const name = typeof game.name === 'string' && game.name.trim().length > 0
        ? game.name
        : title;
    const description = typeof game.description === 'string' && game.description.trim().length > 0
        ? game.description
        : null;
    const controls = typeof game.controls === 'string' && game.controls.trim().length > 0
        ? game.controls
        : null;
    const multiplayerInstructions = typeof game.multiplayer_instructions === 'string' && game.multiplayer_instructions.trim().length > 0
        ? game.multiplayer_instructions
        : null;
    const cover = typeof game.image_url === 'string' && game.image_url.trim().length > 0
        ? game.image_url
        : null;
    const isMultiplayer = game.multiplayer === true;

    const categoriesQuery = (() => {
        const raw = searchParams?.categories ?? searchParams?.category;
        if (!raw) return null;
        const values = Array.isArray(raw) ? raw : [raw];
        const sanitized = values
            .flatMap((value) => value.split(','))
            .map((value) => value.trim())
            .filter(Boolean);
        if (sanitized.length === 0) {
            return null;
        }
        return sanitized.join(',');
    })();

    const multiplayerQuery = (() => {
        const raw = searchParams?.showMultiplayer;
        if (!raw) return null;
        const value = Array.isArray(raw) ? raw[0] : raw;
        return value === '0' ? '0' : null;
    })();

    const backParams = new URLSearchParams();
    if (categoriesQuery) {
        backParams.set('categories', categoriesQuery);
    }
    if (multiplayerQuery === '0') {
        backParams.set('showMultiplayer', '0');
    }
    const backHref = backParams.toString() ? `/juegos?${backParams.toString()}` : '/juegos';

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
                        <img
                            src={cover}
                            alt={name}
                            className="h-full w-full object-cover"
                            loading="lazy"
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
