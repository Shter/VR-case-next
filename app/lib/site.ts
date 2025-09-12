export const site = {
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://vr-case.com.ar",
    assetsBase: process.env.NEXT_PUBLIC_ASSETS_BASE || ""
};

export function asset(path: string) {
    const base = site.assetsBase.replace(/\/$/, "");
    return base ? `${base}${path}` : path;
}