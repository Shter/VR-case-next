const defaultSiteUrl = 'https://vr-case.com.ar';
const configuredAssetsBase = process.env.NEXT_PUBLIC_ASSETS_BASE ?? '';

export const site = {
    url: process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl,
    assetsBase: configuredAssetsBase.replace(/\/$/, ''),
};

export function asset(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (!site.assetsBase) {
    throw new Error(
      `NEXT_PUBLIC_ASSETS_BASE is not configured. Provide the public blob URL so "${normalizedPath}" can be resolved.`,
    );
  }

  return `${site.assetsBase}${normalizedPath}`;
}

export function absoluteAsset(path: string) {
  const resolved = asset(path);

  if (/^https?:\/\//.test(resolved)) {
    return resolved;
  }

  const siteBase = site.url.replace(/\/$/, '');

  return `${siteBase}${resolved}`;
}
