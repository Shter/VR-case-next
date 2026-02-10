'use client';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { MouseEvent, isValidElement, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { HeaderMenuProps } from '@/types/allTypes';
import useClickAwayHeader from '@/lib/hooks/useClickAway';

export function HeaderMenu({ children }: HeaderMenuProps) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const toggleRef = useRef<HTMLButtonElement | null>(null);
    const portalContainer = typeof document === 'undefined' ? null : document.body;
    const closeMenu = () => setOpen(false);

    useClickAwayHeader(wrapperRef, closeMenu);

    const handleNavClick = (event: MouseEvent<HTMLDivElement>) => {
        if (!open) {
            return;
        }

        const target = event.target as HTMLElement | null;
        const link = target?.closest('a');

        if (link) {
            closeMenu();
        }
    };

    const navNode = isValidElement(children) ? children : null;
    const baseClasses = 'fixed md:static top-0 right-0 h-screen md:h-auto max-w-xs md:max-w-none bg-dark md:bg-transparent mt-14 md:mt-0 pt-6 md:pt-0 px-8 md:px-0 transition-all z-50 md:z-auto';
    const translateClasses = open ? ' translate-x-0' : ' translate-x-full md:translate-x-0';

    return (
        <>
            {open && portalContainer
                ? createPortal(
                    <div
                        className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-[2px] z-40"
                        onClick={closeMenu}
                    />,
                    portalContainer,
                )
                : null}

            <div className="flex items-center">
                <button
                    className="md:hidden cursor-pointer"
                    onClick={() => setOpen(value => !value)}
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    ref={toggleRef}
                >
                    {open ? <CloseIcon /> : <MenuIcon />}
                </button>

                <div
                    ref={wrapperRef}
                    className={baseClasses + translateClasses}
                    onClick={handleNavClick}
                >
                    {navNode}
                </div>
            </div>
        </>
    );
}
