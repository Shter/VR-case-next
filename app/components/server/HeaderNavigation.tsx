import Link                           from 'next/link';
import type { HeaderNavigationProps } from '@/types/allTypes';

export function HeaderNavigation({ items }: HeaderNavigationProps) {
    return (
        <nav>
            <ul className="flex flex-col justify-end md:flex-row gap-6 md:gap-8">
                {items.map(({ href, label }) => (
                    <li key={typeof href === 'string' ? href : `${href.pathname ?? ''}#${href.hash ?? ''}`}>
                        <Link href={href}>{label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
