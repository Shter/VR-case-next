const nextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },
  async redirects() {
// Отражает существующие редиректы из vercel.json
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/alquiler-precios.html", destination: "/alquiler-precios", permanent: true }
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