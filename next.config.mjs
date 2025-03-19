import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['payload-cms-project-iota.vercel.app', 'localhost'],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
