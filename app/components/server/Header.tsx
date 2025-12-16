import Image from 'next/image';
import Link from 'next/link';
import { navItems } from '@/app/constants';
import { asset } from '@/lib/site';
import { HeaderMenu } from '@/components/client/HeaderMenu';
import { HeaderNavigation } from '@/components/server/HeaderNavigation';

export function Header() {
    return (
        <header className="fixed top-0 inset-x-0 z-50 bg-dark text-white shadow font-bold">
            <div className="container flex items-center justify-between py-1.5">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <Image src={asset('/icons/vrcase-logo.webp')} alt="VR.CASE" width={58} height={58} priority />
                    <span className="header-logo">VR<span className="text-secondary">.CASE</span></span>
                </Link>

                <HeaderMenu>
                    <HeaderNavigation items={navItems} />
                </HeaderMenu>
            </div>
        </header>
    );
}
