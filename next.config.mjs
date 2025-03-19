import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost:3000', 'blogzilla-akshar.vercel.app'],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
