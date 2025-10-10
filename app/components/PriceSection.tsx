import type { PriceSectionProps } from "@/types/allTypes";
import { PriceCard }              from "@/components/PriceCard";

export function PriceSection({ title, offers }: PriceSectionProps) {
    return (
        <div className="bg-primary/90 rounded-2xl p-6 border-4 border-white/20 shadow">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">
                {title}
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
                {offers.map((offer) => (
                    <PriceCard key={offer.id} offer={offer} />
                ))}
            </div>
        </div>
    );
}