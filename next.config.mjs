/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    unoptimized: process.env.IMAGES_UNOPTIMIZED === "true",
  },
};

export default nextConfig;
