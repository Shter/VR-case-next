import Link                           from 'next/link';
import type { HeaderNavigationProps } from '@/types/allTypes';

export function HeaderNavigation({ items, orientation = 'vertical' }: HeaderNavigationProps) {
    const listClass = orientation === 'horizontal'
        ? 'flex flex-row items-center gap-6 lg:gap-8'
        : 'flex flex-col gap-4';

    return (
        <nav>
            <ul className={listClass}>
                {items.map(({ href, label }) => (
                    <li key={typeof href === 'string' ? href : `${href.pathname ?? ''}#${href.hash ?? ''}`}>
                        <Link href={href}>{label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
