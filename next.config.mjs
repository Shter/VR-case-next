const assetBase = process.env.NEXT_PUBLIC_ASSETS_BASE;
const remotePatterns = [];

if (assetBase) {
  try {
    const url = new URL(assetBase);
    remotePatterns.push({
      protocol: url.protocol.replace(':', ''),
      hostname: url.hostname,
      port: url.port || undefined,
      pathname: `${url.pathname.replace(/\/$/, '') || ''}/**`,
    });
  } catch {
    // Ignore invalid asset base configuration; Next.js will fall back to local assets.
  }
}

const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  images: {
    remotePatterns,
    dangerouslyAllowSVG: true,
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/alquiler-precios.html", destination: "/alquiler", permanent: true }
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "all" }]
      }
    ];
  }
};
export default nextConfig;