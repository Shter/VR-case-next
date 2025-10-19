import type { Route } from "next";
import type { UrlObject } from "url";
import { FaqGalleryItem, NavItem } from "@/types/allTypes";

export const navItems: NavItem[] = [
    { href: { pathname: "/", hash: "home" } satisfies UrlObject, label: "Principal" },
    { href: "/vr-buenos-aires" satisfies Route, label: "VR Buenos Aires" },
    { href: { pathname: "/", hash: "about" } satisfies UrlObject, label: "Sobre nosotros" },
    { href: { pathname: "/", hash: "features" } satisfies UrlObject, label: "Ventajas" },
    { href: { pathname: "/", hash: "faq-gallery" } satisfies UrlObject, label: "FAQ/Gallery" },
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

export const faqItems = [
    { q: "Cómo alquilar Meta Quest 3 en Buenos Aires?", a: "Ofrecemos alquiler con envío rápido y soporte completo. Contáctanos por WhatsApp o Instagram para reservar" },
    { q: "Es posible alquilar lentes VR cerca de mí en Buenos Aires?", a: "Sí, entregamos Meta Quest 3 en cualquier punto de Buenos Aires" },
    { q: "Qué incluye el alquiler de Meta Quest 3?", a: "Estuche, headset Meta Quest 3, controles, Chromecast, estación de carga con baterías" },
    { q: "Puedo usar Meta Quest 3 para eventos corporativos?", a: "Sí, configuraciones personalizadas y asistencia para eventos corporativos" },
    { q: "Cuánto cuesta alquilar Meta Quest 3 por día?", a: "Desde $55000 por día para 1 Meta Quest 3, con envío gratis" },
];

export const featuresItems = [
    { img: "/assets/img/gamepad.webp", title: "Más de 100 juegos", text: "Una enorme biblioteca de los juegos y aplicaciones VR más populares" },
    { img: "/assets/img/lightning.webp", title: "Favorito por su rendimiento", text: "Pantalla mejorada y procesador para una experiencia fluida" },
    { img: "/assets/img/support.webp", title: "Online soporte completo", text: "Asesoramiento y asistencia durante todo el período de alquiler" },
    { img: "/assets/img/prise.webp", title: "Equipo profesional", text: "Solo dispositivos originales con garantía y mantenimiento" },
    { img: "/assets/img/dron.webp", title: "Envío rápido", text: "Te llevamos el equipo cuando y donde te convenga" },
    { img: "/assets/img/flex.webp", title: "Condiciones flexibles", text: "Desde horas hasta semanas a tarifas competitivas" },
];

export const faqWithGalleryItems: FaqGalleryItem[] = [
    {
        id: 'delivery',
        question: 'Cómo funciona la entrega y devolución?',
        answer: 'Coordinamos la entrega del Meta Quest 3 en el día y lo retiramos cuando termina tu reserva. Todo sin cargos extra dentro de CABA',
        image: {
            id: 'on-station',
            src: '/assets/img/on-station.webp',
            alt: 'Meta Quest 3 en estación',
            caption: 'Entrega con estación',
        },
    },
    {
        id: 'events',
        question: 'Sirve para eventos o activaciones?',
        answer: 'Sí, tenemos paquetes para eventos corporativos y sociales con soporte remoto y contenido temático para sorprender a tus invitados',
        image: {
            id: 'two-cases',
            src: '/assets/img/on-wood.webp',
            alt: 'Dos estuches de Meta Quest 3 listos para traslado',
            caption: 'Múltiples visores para tu evento',
        },
    },
    {
        id: 'support',
        question: 'Qué pasa si tengo dudas durante el alquiler?',
        answer: 'Nos escribís por WhatsApp y te fv al instante. Incluimos soporte técnico remoto sin costo durante toda tu experiencia',
        image: {
            id: 'nature',
            src: '/assets/img/on-station-front.webp',
            alt: 'Persona usando Meta Quest 3 en un ambiente natural',
            caption: 'Soporte permanente para aprovechar la VR',
        },
    },
    {
        id: 'setup',
        question: 'Necesito instalar algo para empezar?',
        answer: 'El equipo llega configurado con tu sesión demo y los juegos precargados. Solo encendés el visor, seguís la guía rápida y ya estás dentro',
        image: {
            id: 'in-case',
            src: '/assets/img/in-case.webp',
            alt: 'Meta Quest 3 dentro de estuche rígido',
            caption: 'Todo ordenado en un estuche de transporte',
        },
    },
];
