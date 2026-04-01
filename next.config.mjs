// next.config.mjs
// Next.js configuration

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Image domains ──────────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // ── Headers — security + performance ──────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",   value: "nosniff" },
          { key: "X-Frame-Options",          value: "DENY" },
          { key: "X-XSS-Protection",         value: "1; mode=block" },
          { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",       value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Long cache for static assets
        source: "/(.*)\\.(ico|png|jpg|jpeg|svg|webp|woff2|woff|ttf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Cache resume PDF
        source: "/resume/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
          {
            key: "Content-Disposition",
            value: 'attachment; filename="swagata-ganguly-resume.pdf"',
          },
        ],
      },
    ];
  },

  // ── Redirects ──────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Redirect /cv to the resume download
      {
        source: "/cv",
        destination: "/resume/swagata-ganguly-resume.pdf",
        permanent: false,
      },
    ];
  },

  // ── Experimental ──────────────────────────────────────────────────────────
  experimental: {
    // Optimise package imports for smaller bundles
    optimizePackageImports: ["framer-motion", "@prisma/client"],
  },
};

export default nextConfig;
