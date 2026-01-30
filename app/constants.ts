import type { Route } from "next";
import type { UrlObject } from "url";
import { FaqGalleryItem, GalleryImage, NavItem, PricingOfferGroups } from '@/types/allTypes';

export const navItems: NavItem[] = [
    { href: '/' satisfies Route, label: 'Principal' },
    { href: '/vr-buenos-aires' satisfies Route, label: 'VR Buenos Aires' },
    { href: { pathname: '/', hash: 'about' } satisfies UrlObject, label: 'Sobre nosotros' },
    { href: { pathname: '/', hash: 'features' } satisfies UrlObject, label: 'Ventajas' },
    { href: { pathname: '/', hash: 'faq-gallery' } satisfies UrlObject, label: 'FAQ/Gallery' },
    { href: '/alquiler' satisfies Route, label: 'Precios' },
    { href: { pathname: '/', hash: 'contact' } satisfies UrlObject, label: 'Contactos' },
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

export const featuresItems = [
  { img: '/images/gamepad.webp', title: 'Más de 100 juegos', text: 'Una enorme biblioteca de los juegos y aplicaciones VR más populares' },
  { img: '/images/lightning.webp', title: 'Favorito por su rendimiento', text: 'Pantalla mejorada y procesador para una experiencia fluida' },
  { img: '/images/support.webp', title: 'Online soporte completo', text: 'Asesoramiento y asistencia durante todo el período de alquiler' },
  { img: '/images/prise.webp', title: 'Equipo profesional', text: 'Solo dispositivos originales con garantía y mantenimiento' },
  { img: '/images/dron.webp', title: 'Envío rápido', text: 'Te llevamos el equipo cuando y donde te convenga' },
  { img: '/images/flex.webp', title: 'Condiciones flexibles', text: 'Desde horas hasta semanas a tarifas competitivas' },
];

export const faqItems: FaqGalleryItem[] = [
    {
        id: 'delivery',
        question: 'Cómo funciona la entrega y devolución?',
        answer: 'Coordinamos la entrega del Meta Quest 3 en el día y lo retiramos cuando termina tu reserva. Todo sin cargos extra dentro de CABA y alrededores',
    },
    {
        id: 'events',
        question: 'Sirve para eventos o activaciones?',
        answer: 'Sí, tenemos paquetes para eventos corporativos y sociales con soporte remoto y contenido temático para sorprender a tus invitados',
    },
    {
        id: 'support',
        question: 'Qué pasa si tengo dudas durante el alquiler?',
        answer: 'Nos escribís por WhatsApp y te ayudamos al instante. Incluimos soporte técnico remoto sin costo durante toda tu experiencia',
    },
    {
        id: 'setup',
        question: 'Necesito instalar algo para empezar?',
        answer: 'El equipo llega configurado con tu sesión demo y los juegos precargados. Solo encendés el visor, seguís la guía rápida y ya estás dentro',
    },
];

export const galleryImages: GalleryImage[] = [
    {
        id: 'on-station',
        src: '/images/on-station.webp',
        alt: 'Meta Quest 3 en estación',
        caption: 'Entrega con estación',
        width: 1024,
        height: 1536,
    },
    {
        id: 'two-cases',
        src: '/images/on-wood.webp',
        alt: 'Dos estuches de Meta Quest 3 listos para traslado',
        caption: 'Múltiples visores para tu evento',
        width: 860,
        height: 1290,
    },
    {
        id: 'nature',
        src: '/images/on-station-front.webp',
        alt: 'Persona usando Meta Quest 3 en un ambiente natural',
        caption: 'Soporte permanente para aprovechar la VR',
        width: 1024,
        height: 1536,
    },
    {
        id: 'in-case',
        src: '/images/in-case.webp',
        alt: 'Meta Quest 3 dentro de estuche rígido',
        caption: 'Todo ordenado en un estuche de transporte',
        width: 788,
        height: 1182,
    },
];

export const pricingItems: PricingOfferGroups = {
    oneHeadset : [
        {
            id       : '2h-1',
            rentLimit: 'De 2 a 4 horas de experiencia',
            title    : 'VR por 2 horas',
            headsets : 1,
            period   : '2h',
            price    : 25000,
            plusPrice: 9000,
            plusUnit : 'hora'
        },
        {
            id       : 'day-1',
            rentLimit: 'Desde 1 dia',
            title    : 'VR por dia',
            headsets : 1,
            period   : 'day',
            price    : 60000,
            plusPrice: 40000,
            plusUnit : 'dia'
        },
        {
            id       : 'week-1',
            rentLimit: 'Desde 1 semana',
            title    : 'VR por semana',
            headsets : 1,
            period   : 'week',
            price    : 230000,
            plusPrice: 150000,
            plusUnit : 'semana'
        }
    ],
    twoHeadsets: [
        {
            id       : '2h-2',
            rentLimit: 'De 2 a 4 horas de experiencia',
            title    : 'VR por 2 horas',
            headsets : 2,
            period   : '2h',
            price    : 42000,
            plusPrice: 18000,
            plusUnit : 'hora'
        },
        {
            id       : 'day-2',
            rentLimit: 'Desde 1 dia',
            title    : 'VR por dia',
            headsets : 2,
            period   : 'day',
            price    : 110000,
            plusPrice: 55000,
            plusUnit : 'dia'
        },
        {
            id       : 'week-2',
            rentLimit: 'Desde 1 semana',
            title    : 'VR por semana',
            headsets : 2,
            period   : 'week',
            price    : 399000,
            plusPrice: 170000,
            plusUnit : 'semana'
        }
    ]
}

export const defaultEvents: Array<keyof WindowEventMap> = ['mousedown', 'touchstart'];

export const hourlyRentalNotice = 'El alquiler por horas es válido hasta las 20:00.\n' +
    'Las reservas que finalicen después de las 20:00 se consideran alquiler por día completo.';
