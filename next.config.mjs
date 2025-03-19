import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
