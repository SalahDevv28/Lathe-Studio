/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'snt-solutions.com', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  env: {
    CUSTOM_KEY: 'my-value',
  },
}

module.exports = nextConfig