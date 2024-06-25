import { fileURLToPath } from 'url'
import { next } from '@million/lint'
import createJiti from 'jiti'

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))('./src/env')

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ['@a/api', '@a/auth', '@a/db', '@a/ui', '@a/validators'],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: { remotePatterns: [{ hostname: '*' }] }
}

export default next({ rsc: true })(config)
