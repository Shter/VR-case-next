import type { Metadata } from 'next';
import { supabaseClient }              from '@/lib/supabase/client';
import { FilterableGames }             from '@/components/client/FilterableGames';
import { GameRecord, JuegosPageProps } from "@/types/allTypes";

export const metadata: Metadata = {
    title: 'Juegos',
    description: 'Lista de juegos disponibles en la base de datos de Supabase.'
};

async function fetchGames(): Promise<GameRecord[]> {
    const { data, error } = await supabaseClient
        .from('games')
        .select('*');

    if (error) {
        console.error('[supabase] Не удалось получить список игр', error);
        throw new Error('Не удалось загрузить игры. Попробуйте обновить страницу позже.');
    }

    return (data ?? []) as GameRecord[];
}

function parseCategoriesParam(raw: string | string[] | undefined): string[] {
    if (!raw) return [];

    const values = Array.isArray(raw) ? raw : [raw];
    const result: string[] = [];
    const seen = new Set<string>();

    values.forEach((value) => {
        value
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean)
            .forEach((item) => {
                if (!seen.has(item)) {
                    seen.add(item);
                    result.push(item);
                }
            });
    });

    return result;
}

function parseShowMultiplayerParam(raw: string | string[] | undefined): boolean {
    if (!raw) return true;
    const value = Array.isArray(raw) ? raw[0] : raw;
    return value !== '0';
}

export default async function JuegosPage({ searchParams }: JuegosPageProps) {
    const games = await fetchGames();
    const searchParamsValue = await searchParams
    const categoriesParam =  searchParamsValue?.categories ?? searchParamsValue?.category;
    const showMultiplayerParam = searchParamsValue?.showMultiplayer;
    const initialCategories = parseCategoriesParam(categoriesParam);
    const initialShowMultiplayer = parseShowMultiplayerParam(showMultiplayerParam);

    return (
        <section className="container mx-auto px-4 py-16 md:py-24">
            <header className="mb-12 text-center">
                <h1 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">Juegos disponibles</h1>
                <p className="mt-4 text-base text-gray-600 md:text-lg">
                    Seleccionamos títulos populares y experiencias inmersivas para tu Meta Quest 3.
                </p>
            </header>

            {games.length === 0 ? (
                <p className="mx-auto max-w-2xl text-center text-gray-500">
                    Empty
                </p>
            ) : (
                <FilterableGames
                    games={games}
                    initialCategories={initialCategories}
                    initialShowMultiplayer={initialShowMultiplayer}
                />
            )}
        </section>
    );
}
