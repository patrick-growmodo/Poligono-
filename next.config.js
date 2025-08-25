/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh5.googleusercontent.com',
      'lh6.googleusercontent.com',
      'graph.facebook.com',
      'platform-lookaside.fbsbx.com',
      's.gravatar.com',
      'secure.gravatar.com',
      'cdn.auth0.com',
    ],
  },
}

module.exports = nextConfig 