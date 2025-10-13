import { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date("2025-10-12T00:00:00Z");

    return [
        { url: site.url, lastModified, changeFrequency: "weekly", priority: 1 },
        { url: `${site.url}/alquiler`, lastModified, changeFrequency: "weekly", priority: 0.9 },
        { url: `${site.url}/vr-buenos-aires`, lastModified, changeFrequency: "weekly", priority: 0.9 }
    ];
}
