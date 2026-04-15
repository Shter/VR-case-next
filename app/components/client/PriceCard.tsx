"use client";

import { ReserveDialog } from '@/components/client/ReserveDialog';
import type { PriceCardProps } from '@/types/allTypes';
import { hourlyRentalNotice } from '@/app/constants';

export function PriceCard({ offer }: PriceCardProps) {
    const isHourlyOffer = offer.period === '4h';

    const formattedExtraPrice = offer.plusPrice
        ? `+ ${offer.plusPrice.toLocaleString('es-AR')}${offer.plusUnit ? `/${offer.plusUnit}` : ''}`
        : null;

    return (
        <div className="card-glass flex h-full flex-col">
            <div className="flex flex-1 flex-col">
                <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>

                <div className="text-secondary text-5xl font-extrabold mb-1">
                    ${offer.price.toLocaleString('es-AR')}
                </div>

                <div className="text-secondary text-xl font-bold mb-4 min-h-[1.75rem]">
                    {formattedExtraPrice || (<span aria-hidden="true">&nbsp;</span>)}
                </div>

                <ul className="space-y-2 mb-2">
                    <li>{offer.rentLimit}</li>
                    <li className="border-y-1 py-2 border-secondary">{offer.headsets} x Meta Quest 3</li>
                    <li>Envío sin cargo (CABA)</li>
                    <li>Consultá por otras zonas</li>

                    {isHourlyOffer ? (
                        <li className="text-xs text-white/80">
                            {hourlyRentalNotice}
                        </li>
                    ) : null}
                </ul>
            </div>

            <div className="mt-auto pt-2">
                <ReserveDialog
                    offerId={offer.id}
                    description="Elige el canal de contacto para confirmar la reserva del plan"
                />
            </div>
        </div>
    );
}
