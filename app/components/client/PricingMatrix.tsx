'use client';

import { useState } from 'react';
import { PriceCard } from '@/components/client/PriceCard';
import type { PricingMatrixProps } from '@/types/allTypes';

const formatHeadsetCountLabel = (count: number) => (count === 1 ? '1 visor' : `${count} visores`);

export function PricingMatrix({ options, offersByHeadsets }: PricingMatrixProps) {
    const fallbackValue = options[0]?.value ?? 1;
    const [selectedValue, setSelectedValue] = useState<number>(fallbackValue);
    const selectedOffers = offersByHeadsets[selectedValue] ?? [];

    return (
        <div className="card-glass rounded-2xl border-4 p-4 md:p-6">
            <div className="flex flex-col gap-4">
                <div className="text-center">
                    <p className="text-base font-semibold uppercase tracking-wide text-secondary">
                        Elegí cuántos visores necesitás
                    </p>
                </div>

                <div
                    role="radiogroup"
                    aria-label="Cantidad de visores Meta Quest 3"
                    className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4"
                >
                    {options.map((option) => {
                        const isActive = option.value === selectedValue;
                        return (
                            <button
                                key={option.value}
                                type="button"
                                role="radio"
                                aria-checked={isActive}
                                onClick={() => setSelectedValue(option.value)}
                                className={[
                                    'rounded-2xl border-2 px-4 py-3 text-left transition focus-visible:outline-offset-4 focus-visible:outline-secondary cursor-pointer',
                                    isActive
                                        ? 'border-secondary bg-secondary/20 text-white shadow-[0_10px_25px_rgba(0,0,0,0.35)]'
                                        : 'border-white/20 bg-white/5 text-white/80 hover:border-secondary/60'
                                ].join(' ')}
                            >
                                <span className="block text-lg font-semibold">
                                    {option.label}
                                </span>
                                <span className="block text-base text-white">
                                    {formatHeadsetCountLabel(option.value)}
                                </span>
                                <span className="block text-sm text-white/70">
                                    {option.description}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mt-8">


                {selectedOffers.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-3">
                        {selectedOffers.map((offer) => (
                            <PriceCard key={offer.id} offer={offer} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-sm text-white/70">
                        No encontramos tarifas para esta combinación. Escribinos para un paquete a medida.
                    </p>
                )}
            </div>
        </div>
    );
}
