import { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date("2025-09-07T00:00:00Z");
    return [
        { url: site.url, lastModified, changeFrequency: "weekly", priority: 1 },
        { url: `${site.url}/alquiler-precios`, lastModified, changeFrequency: "monthly", priority: 0.8 }
    ];
}
