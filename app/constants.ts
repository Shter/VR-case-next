import type { Route } from "next";
import type { UrlObject } from "url";
import { NavItem, PricingOfferGroups, PricingSelectorOption } from '@/types/allTypes';

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
    1: [
        {
            id: '4h-1',
            rentLimit: 'Uso de 4 a 6 horas',
            title: 'VR por 4 horas',
            headsets: 1,
            period: '4h',
            price: 50000,
            plusPrice: 35000,
            plusUnit: 'hora extra'
        },
        {
            id: 'day-1',
            rentLimit: 'Uso por 24 horas desde la entrega',
            title: 'VR por día',
            headsets: 1,
            period: 'day',
            price: 77000,
            plusPrice: 60000,
            plusUnit: 'día extra'
        },
        {
            id: 'week-1',
            rentLimit: '7 días de uso',
            title: 'VR por semana',
            headsets: 1,
            period: 'week',
            price: 385000
        }
    ],
    2: [
        {
            id: '4h-2',
            rentLimit: 'Uso de 4 a 6 horas',
            title: 'VR por 4 horas',
            headsets: 2,
            period: '4h',
            price: 105000,
            plusPrice: 70000,
            plusUnit: 'hora extra'
        },
        {
            id: 'day-2',
            rentLimit: 'Uso por 24 horas desde la entrega',
            title: 'VR por día',
            headsets: 2,
            period: 'day',
            price: 145000,
            plusPrice: 120000,
            plusUnit: 'día extra'
        },
        {
            id: 'week-2',
            rentLimit: '7 días de uso',
            title: 'VR por semana',
            headsets: 2,
            period: 'week',
            price: 750000
        }
    ],
    3: [
        {
            id: '4h-3',
            rentLimit: 'Uso de 4 a 6 horas',
            title: 'VR por 4 horas',
            headsets: 3,
            period: '4h',
            price: 145000,
            plusPrice: 100000,
            plusUnit: 'hora extra'
        },
        {
            id: 'day-3',
            rentLimit: 'Uso por 24 horas desde la entrega',
            title: 'VR por día',
            headsets: 3,
            period: 'day',
            price: 230000,
            plusPrice: 180000,
            plusUnit: 'día extra'
        },
        {
            id: 'week-3',
            rentLimit: '7 días de uso',
            title: 'VR por semana',
            headsets: 3,
            period: 'week',
            price: 990000
        }
    ],
    4: [
        {
            id: '4h-4',
            rentLimit: 'Uso de 4 a 6 horas',
            title: 'VR por 4 horas',
            headsets: 4,
            period: '4h',
            price: 200000,
            plusPrice: 140000,
            plusUnit: 'hora extra'
        },
        {
            id: 'day-4',
            rentLimit: 'Uso por 24 horas desde la entrega',
            title: 'VR por día',
            headsets: 4,
            period: 'day',
            price: 310000,
            plusPrice: 240000,
            plusUnit: 'día extra'
        },
        {
            id: 'week-4',
            rentLimit: '7 días de uso',
            title: 'VR por semana',
            headsets: 4,
            period: 'week',
            price: 1500000
        }
    ]
};

export const pricingHeadsetOptions: PricingSelectorOption[] = [
    { value: 1, label: 'MINI', description: 'Demos, testing y uso individual' },
    { value: 2, label: 'DUO', description: 'Para compartir · Juegos o reuniones' },
    { value: 3, label: 'PRO', description: 'Grupo · Uso simultáneo' },
    { value: 4, label: 'PARTY', description: 'Eventos · Experiencia compartida' }
];

export const defaultEvents: Array<keyof WindowEventMap> = ['mousedown', 'touchstart'];

export const hourlyRentalNotice = 'El alquiler por horas es válido hasta las 20:00.\n' +
    'Si la reserva finaliza después, se toma como día completo';
