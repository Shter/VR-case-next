'use client';

import type { ReactNode } from "react";

export function FilterButton({ isActive, onClick, children }: {
    isActive: boolean;
    onClick: () => void;
    children: ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary ${
                isActive
                    ? 'border-primary bg-primary text-white shadow-sm'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary'
            }`}
        >
            {children}
        </button>
    );
}