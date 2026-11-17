/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Local images served from /public need no domain config
    unoptimized: false,
  },
  // Faster page loads
  compress: true,
};

module.exports = nextConfig;
