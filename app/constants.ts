import type { Route } from "next";
import type { UrlObject } from "url";
import { NavItem } from "@/types/allTypes";

export const navItems: NavItem[] = [
    { href: { pathname: "/", hash: "home" } satisfies UrlObject, label: "Principal" },
    { href: "/vr-buenos-aires" satisfies Route, label: "VR Buenos Aires" },
    { href: { pathname: "/", hash: "about" } satisfies UrlObject, label: "Sobre nosotros" },
    { href: { pathname: "/", hash: "features" } satisfies UrlObject, label: "Ventajas" },
    { href: { pathname: "/", hash: "gallery" } satisfies UrlObject, label: "Galería" },
    { href: "/alquiler" satisfies Route, label: "Precios" },
    { href: { pathname: "/", hash: "contact" } satisfies UrlObject, label: "Contactos" },
];