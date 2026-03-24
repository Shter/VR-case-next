import Image from 'next/image';
import { galleryImages } from '@/app/constants';
import { asset } from '@/lib/site';
import { GalleryLightboxController } from '@/components/client/GalleryLightboxController';

const gridContainerClass =
    'grid grid-flow-col auto-cols-[minmax(260px,1fr)] gap-5 overflow-x-auto lg:auto-cols-auto lg:grid-flow-row lg:grid-cols-2 lg:max-h-[680px] lg:overflow-x-hidden lg:overflow-y-auto';

const galleryContainerId = 'gallery-grid';

export function Gallery() {
    return (
        <>
            <div className="flex w-full flex-col justify-between lg:w-[55%]" id={galleryContainerId}>
                <div className={gridContainerClass}>
                    {galleryImages.map((item, index) => (
                        <button
                            key={item.id}
                            type="button"
                            className="group relative flex min-w-[260px] overflow-hidden rounded-2xl border border-white/30 duration-300 no-scr"
                            data-gallery-trigger="true"
                            data-gallery-index={index}
                        >
                            <div className="relative h-56 w-full cursor-pointer">
                                <Image
                                    src={asset(item.src)}
                                    alt={item.alt}
                                    width={item.width}
                                    height={item.height}
                                    className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                                    sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 80vw"
                                    loading="lazy"
                                />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <GalleryLightboxController containerId={galleryContainerId} images={galleryImages} />
        </>
    );
}
