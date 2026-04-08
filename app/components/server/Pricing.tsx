import { PricingMatrix } from '@/components/client/PricingMatrix';
import { pricingHeadsetOptions, pricingItems } from '@/app/constants';

export function Pricing() {
    return (
        <section id="price" className="py-6">
            <div className="container space-y-6">
                <PricingMatrix options={pricingHeadsetOptions} offersByHeadsets={pricingItems} />

                <p className="text-center text-sm text-white/70">
                    ¿Necesitás más de 4 visores o asistencia presencial? <span className="font-semibold text-secondary">Escribinos</span> para diseñar un paquete a medida.
                </p>
            </div>
        </section>
    );
}
