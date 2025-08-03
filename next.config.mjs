/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      'pino-pretty': 'commonjs pino-pretty',
      lokijs: 'commonjs lokijs',
      'encoding': 'commonjs encoding',
    })
    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
