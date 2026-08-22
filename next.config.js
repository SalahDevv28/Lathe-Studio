/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // `domains` is deprecated in Next 14 in favour of remotePatterns.
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
    formats: ['image/webp', 'image/avif'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Stop browsers second-guessing declared content types.
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // No reason for this site to be framed by anyone.
          { key: 'X-Frame-Options', value: 'DENY' },
          // Send the origin cross-site, the full path same-site.
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Nothing here needs camera, microphone or location.
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
