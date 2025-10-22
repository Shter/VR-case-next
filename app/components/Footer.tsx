import Image from 'next/image';
import Link from 'next/link';
import { asset } from '@/lib/site';

export function Footer() {
    return (
        <footer className="bg-dark text-white pt-16 pb-6">
            <div className="container grid gap-10 grid-cols-3 md:grid-cols-4">
                <div className="col-span-3 md:col-span-1">
                    <h3 className="font-bold header-logo">VR<span className="text-secondary">.CASE</span></h3>
                    <p>Servicio de alquiler de lentes VR Meta Quest 3 para eventos, activaciones y experiencias privadas en Buenos Aires.</p>
                </div>
                <div>
                    <h3 className="text-secondary mb-4 text-xl">Menú</h3>
                    <ul className="space-y-2">
                        <li><Link href="/#home">Principal</Link></li>
                        <li><Link href="/vr-buenos-aires">VR Buenos Aires</Link></li>
                        <li><Link href="/#about">Sobre nosotros</Link></li>
                        <li><Link href="/#features">Ventajas</Link></li>
                        <li><Link href="/#gallery">Galería</Link></li>
                        <li><Link href="/alquiler">Precios</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-secondary mb-4 text-xl">Servicios</h3>
                    <ul className="space-y-2">
                        <li><Link href="/alquiler">Alquiler de lentes VR</Link></li>
                        <li><span className="opacity-70">Eventos corporativos</span></li>
                        <li><span className="opacity-70">Fiestas infantiles</span></li>
                        <li><span className="opacity-70">Excursiones VR</span></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-secondary mb-4 text-xl">Contactos</h3>
                    <address className="not-italic leading-6">
                        VR.CASE<br />Buenos Aires, Argentina<br />Teléfono: +541127827150
                    </address>
                    <div className="flex gap-3 mt-4">
                        <a href="https://wa.me/5491127827150" rel="nofollow" target="_blank">
                            <Image src={asset('/icons/whatsapp.svg')} alt="WhatsApp" width={32} height={32} />
                        </a>
                        <a href="https://instagram.com/vr.case.ar" rel="nofollow" target="_blank">
                            <Image src={asset('/icons/instagram.svg')} alt="Instagram" width={32} height={32} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="container mt-10 border-t border-white/10 pt-5 text-center text-white/70">
                © {new Date().getFullYear()} VR.CASE Todos los derechos reservados
            </div>
        </footer>
    );
}
