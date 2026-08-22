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
  async redirects() {
    // Case studies were renamed from positional slugs to client names.
    // 308s so the old URLs keep any link equity they picked up.
    return [
      {
        source: '/case-studies/first-case-study',
        destination: '/case-studies/raynor-landing-solutions',
        permanent: true,
      },
      {
        source: '/case-studies/second-case-study',
        destination: '/case-studies/purple-jest',
        permanent: true,
      },
      {
        source: '/case-studies/third-case-study',
        destination: '/case-studies/meridian-engineering',
        permanent: true,
      },
    ]
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
