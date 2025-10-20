"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { navItems } from "@/app/constants";

export function Header() {
    const [open, setOpen] = useState(false);
    const handleLinkClick = () => setOpen(false);

    return (
        <header className="fixed top-0 inset-x-0 z-50 bg-dark text-white shadow font-bold">
            <div className="container flex items-center justify-between py-1.5">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <Image src="/assets/icons/logo-no-back.webp" alt="VR.CASE" width={58} height={58} priority />
                    <span className="header-logo">VR<span className="text-secondary">.CASE</span></span>
                </Link>

                <button
                    className="md:hidden cursor-pointer"
                    onClick={() => setOpen(v => !v)}
                    aria-label={open ? "Close menu" : "Open menu"}
                >
                    {open ? <CloseIcon /> : <MenuIcon />}
                </button>

                <nav className={"fixed md:static top-0 right-0 h-screen md:h-auto max-w-xs md:max-w-none bg-dark md:bg-transparent mt-14 md:mt-0 pt-6 md:pt-0 px-8 md:px-0 transition-all " + (open ? "translate-x-0" : "translate-x-full md:translate-x-0")}>
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