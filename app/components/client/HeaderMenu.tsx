'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent, useRef, useState } from 'react';
import type { HeaderMenuProps } from '@/types/allTypes';
import useClickAwayHeader from '@/lib/hooks/useClickAway';

const MENU_ICON = '/assets/icons/menu.svg';
const CLOSE_ICON = '/assets/icons/close.svg';

export function HeaderMenu({ items }: HeaderMenuProps) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
    const closeMenu = () => setOpen(false);

    useClickAwayHeader(wrapperRef, closeMenu, { ignoreRefs: [toggleButtonRef] });

    const handleNavClick = (event: MouseEvent<HTMLUListElement>) => {
        if (!open) {
            return;
        }

        const target = event.target as HTMLElement | null;
        const link = target?.closest('a');

        if (link) {
            closeMenu();
        }
    };

    const panelClasses = [
        'fixed top-[var(--header-offset)] right-0 h-[calc(100vh-var(--header-offset))] w-72 bg-dark/95',
        'px-7 py-6 shadow-xl transition-transform duration-300 md:hidden z-50 flex flex-col',
        open ? 'translate-x-0' : 'translate-x-full',
    ].join(' ');

    return (
        <>
            {open ? (
                <div
                    className="md:hidden fixed inset-x-0 bottom-0 top-[var(--header-offset)] bg-black/60 backdrop-blur-[2px] z-40"
                    aria-hidden="true"
                    onClick={closeMenu}
                />
            ) : null}

            <button
                type="button"
                className="md:hidden rounded-full border border-white/30 bg-white/10 p-2 text-white transition hover:bg-white/20"
                aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={open}
                aria-controls="mobile-nav"
                onClick={() => setOpen((value) => !value)}
                ref={toggleButtonRef}
            >
                <Image
                    src={open ? CLOSE_ICON : MENU_ICON}
                    width={28}
                    height={28}
                    alt=""
                    priority={false}
                />
            </button>

            <div
                ref={wrapperRef}
                className={panelClasses}
            >
                <nav className="mt-6 flex-1 overflow-y-auto">
                    <ul
                        id="mobile-nav"
                        className="flex flex-col gap-4 text-lg"
                        onClick={handleNavClick}
                    >
                        {items.map(({ href, label }) => (
                            <li key={typeof href === 'string' ? href : `${href.pathname ?? ''}#${href.hash ?? ''}`}>
                                <Link href={href} className="block py-1" data-nav-link>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
}
