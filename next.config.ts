import type { NextConfig } from "next";

const allowedHostnames = ["corporate.mcdonalds.com", "source.unsplash.com", "od.lk"];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: allowedHostnames.map((hostname) => ({ hostname })),
}, };

export default nextConfig;