import type { Route } from "next";
import type { UrlObject } from "url";
import { NavItem, PricingOfferGroups } from '@/types/allTypes';

export const navItems: NavItem[] = [
    { href: '/' satisfies Route, label: 'Principal' },
    { href: '/vr-buenos-aires' satisfies Route, label: 'VR Buenos Aires' },
    { href: { pathname: '/', hash: 'about' } satisfies UrlObject, label: 'Sobre nosotros' },
    { href: { pathname: '/', hash: 'features' } satisfies UrlObject, label: 'Ventajas' },
    { href: '/juegos' satisfies Route, label: 'Juegos' },
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
