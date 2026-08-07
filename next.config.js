/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    dataDispatch: true,
  },
  images: {
    domains: ['*'],
  },
  output: 'standalone',
};

export default nextConfig;