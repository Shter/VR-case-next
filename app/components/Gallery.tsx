import { GalleryViewer } from "@/components/GalleryViewer";
import { images } from "@/app/constants";

export function Gallery() {
    return (
        <section id="gallery" className="bg-white pb-12">
            <div className="container">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                    Nuestras lentes virtual realidad VR Meta Quest 3
                </h2>

                <GalleryViewer images={images} />
            </div>
        </section>
    );
}
