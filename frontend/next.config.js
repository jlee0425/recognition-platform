/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  async redirects() {
    return [
      { 
        source: '/',
        destination: '/employee',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
