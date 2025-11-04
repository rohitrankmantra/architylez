/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  output: "standalone", // ✅ enables easy server deployment
};

module.exports = nextConfig;
