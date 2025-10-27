"use client";

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { isValidElement, useEffect, useRef, useState } from 'react';
import type { HeaderMenuProps }                        from '@/types/allTypes';

export function HeaderMenu({ children }: HeaderMenuProps) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const toggleRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (!open) {
            return undefined;
        }

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node;
            const wrapper = wrapperRef.current;
            const toggle = toggleRef.current;

            if (!wrapper || !toggle) {
                return;
            }

            const isInsideMenu = wrapper.contains(target);
            const isToggle = toggle.contains(target);

            if (!isInsideMenu && !isToggle) {
                setOpen(false);
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);
        return () => document.removeEventListener('pointerdown', handlePointerDown);
    }, [open]);

    useEffect(() => {
        const wrapper = wrapperRef.current;

        if (!wrapper) {
            return undefined;
        }

        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;

            if (target?.closest('a')) {
                setOpen(false);
            }
        };

        wrapper.addEventListener('click', handleClick);
        return () => wrapper.removeEventListener('click', handleClick);
    }, []);

    const navNode = isValidElement(children) ? children : null;
    const baseClasses = 'fixed md:static top-0 right-0 h-screen md:h-auto max-w-xs md:max-w-none bg-dark md:bg-transparent mt-14 md:mt-0 pt-6 md:pt-0 px-8 md:px-0 transition-all z-50 md:z-auto';
    const translateClasses = open ? ' translate-x-0' : ' translate-x-full md:translate-x-0';

    return (
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
            >
                {navNode}
            </div>
        </div>
    );
}
