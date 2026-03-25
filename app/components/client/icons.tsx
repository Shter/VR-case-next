import type { ReactNode, SVGProps } from 'react';

const baseProps: SVGProps<SVGSVGElement> = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
};

function createIcon(paths: ReactNode) {
    return function Icon(props: SVGProps<SVGSVGElement>) {
        return (
            <svg {...baseProps} {...props}>
                {paths}
            </svg>
        );
    };
}

export const ChevronLeftIcon = createIcon(
    <path d="M15 18L9 12l6-6" />,
);

export const ChevronRightIcon = createIcon(
    <path d="M9 6l6 6-6 6" />,
);

export const CloseIconGlyph = createIcon([
    <path key="close-a" d="M6 6l12 12" />,
    <path key="close-b" d="M18 6L6 18" />,
]);
