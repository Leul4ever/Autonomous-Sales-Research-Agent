import type { NextConfig } from "next";

// Sanitize backendUrl: remove trailing slash if present
const backendUrl = (process.env.BACKEND_URL || "http://localhost:8000").replace(/\/$/, "");

const nextConfig: NextConfig = {
  // Proxy backend API through Next.js dev server to avoid CORS/LAN "localhost" issues.
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },

  // Allow accessing dev server from LAN IP (Next.js will enforce this in a future major release).
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.56.1:3000",
  ],
};

export default nextConfig;
