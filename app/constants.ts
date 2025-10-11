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

export const images = [
    "/assets/img/on-station.webp",
    "/assets/img/in-case.webp",
    "/assets/img/on-wood.webp",
];

export const advantages = [
    {
        title: 'Libertad total',
        text: 'Disfrutá de la VR sin estar atado a una PC. Llevamos el equipo a tu casa, oficina o evento',
    },
    {
        title: 'Experiencia completa',
        text: 'Entregamos el Meta Quest 3 configurado, cargado y con juegos listos para usar',
    },
    {
        title: 'Tecnología de punta',
        text: 'Resolución nítida, seguimiento de manos preciso y confort excepcional en cada sesión',
    },
    {
        title: 'Planes flexibles',
        text: 'Alquiler por día, fin de semana o semana, adaptado a tus tiempos y necesidades',
    },
];

export const serviceCards = [
    {
        heading: 'Alquiler para el hogar',
        description: 'Fin de semana en familia, reuniones con amigos o exploración personal: llevamos la VR a tu living',
    },
    {
        heading: 'Eventos corporativos',
        description: 'Team building, lanzamientos o ferias. Generá impacto y diferenciá tu marca con experiencias VR',
    },
    {
        heading: 'Fiestas y celebraciones',
        description: 'Cumpleaños, despedidas o eventos especiales. Garantizamos la diversión de tus invitados',
    },
];