import { ReserveDialog } from '@/components/client/ReserveDialog';
import type { PriceCardProps } from '@/types/allTypes';
import { hourlyRentalNotice } from "@/app/constants"

export function PriceCard({ offer }: PriceCardProps) {
    const isHourlyOffer = offer.period === '2h';

    return (
        <div className="card-glass flex h-full flex-col">
            <div className="flex flex-1 flex-col">
                <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>

                <div className="text-secondary text-5xl font-extrabold mb-1">
                    ${offer.price.toLocaleString('es-AR')}
                </div>

                {offer.plusPrice ? (
                    <div className="text-secondary text-xl font-bold mb-4">
                        + ${offer.plusPrice.toLocaleString('es-AR')}/{offer.plusUnit}
                    </div>
                ) : null}

                <ul className="space-y-2 mb-2">
                    <li>{offer.rentLimit}</li>
                    <li className="border-y-1 py-2 border-secondary">{offer.headsets} x Meta Quest 3</li>
                    <li>Envío gratis</li>

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
