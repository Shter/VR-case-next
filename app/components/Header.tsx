"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

export function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-0 inset-x-0 z-50 bg-dark text-white shadow font-bold">
            <div className="container flex items-center justify-between py-1.5">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <Image src="/assets/icons/logo-no-back.webp" alt="VR.CASE" width={58} height={58} priority />
                    <span className="header-logo">VR<span className="text-secondary">.CASE</span></span>
                </Link>

                <button className="md:hidden" onClick={() => setOpen(v => !v)} aria-label="Open menu">
                    <MenuIcon />
                </button>

                <nav className={"fixed md:static top-0 right-0 h-screen md:h-auto w-4/5 max-w-xs md:max-w-none bg-dark md:bg-transparent pt-20 md:pt-0 px-8 md:px-0 transition-all " + (open ? "translate-x-0" : "translate-x-full md:translate-x-0")}>
                    <ul className="flex flex-col justify-end md:flex-row gap-6 md:gap-8">
                        <li><Link href="/#home" onClick={() => setOpen(false)}>Principal</Link></li>
                        <li><Link href="/vr-buenos-aires" onClick={() => setOpen(false)}>VR Buenos Aires</Link></li>
                        <li><Link href="/#about" onClick={() => setOpen(false)}>Sobre nosotros</Link></li>
                        <li><Link href="/#features" onClick={() => setOpen(false)}>Ventajas</Link></li>
                        <li><Link href="/#gallery" onClick={() => setOpen(false)}>Galería</Link></li>
                        <li><Link href="/alquiler" onClick={() => setOpen(false)}>Alquiler precios</Link></li>
                        <li><Link href="/#contact" onClick={() => setOpen(false)}>Contactos</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}