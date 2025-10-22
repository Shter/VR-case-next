"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { navItems } from '@/app/constants';
import { asset } from '@/lib/site';

export function Header() {
    const [open, setOpen] = useState(false);
    const navRef = useRef<HTMLElement | null>(null);
    const toggleRef = useRef<HTMLButtonElement | null>(null);
    const handleLinkClick = () => setOpen(false);

    useEffect(() => {
        if (!open) {
            return undefined;
        }

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node;
            const navElement = navRef.current;
            const toggleElement = toggleRef.current;

            if (!navElement || !toggleElement) {
                return;
            }

            const isInsideMenu = navElement.contains(target);
            const isToggle = toggleElement.contains(target);

            if (!isInsideMenu && !isToggle) {
                setOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);
        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [open]);

    return (
        <header className="fixed top-0 inset-x-0 z-50 bg-dark text-white shadow font-bold">
            <div className="container flex items-center justify-between py-1.5">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <Image src={asset('/icons/vrcase-logo.webp')} alt="VR.CASE" width={58} height={58} priority />
                    <span className="header-logo">VR<span className="text-secondary">.CASE</span></span>
                </Link>

                <button
                    className="md:hidden cursor-pointer"
                    onClick={() => setOpen(v => !v)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    ref={toggleRef}
                >
                    {open ? <CloseIcon /> : <MenuIcon />}
                </button>

                <nav
                    ref={navRef}
                    className={"fixed md:static top-0 right-0 h-screen md:h-auto max-w-xs md:max-w-none bg-dark md:bg-transparent mt-14 md:mt-0 pt-6 md:pt-0 px-8 md:px-0 transition-all z-50 md:z-auto " + (open ? "translate-x-0" : "translate-x-full md:translate-x-0")}
                >
                    <ul className="flex flex-col justify-end md:flex-row gap-6 md:gap-8">
                        {navItems.map(({ href, label }) => (
                            <li key={typeof href === "string" ? href : `${href.pathname ?? ""}#${href.hash ?? ""}`}>
                                <Link href={href} onClick={handleLinkClick}>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
