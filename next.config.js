/** @type {import('next').NextConfig} */
const nextConfig = {
    publicRuntimeConfig: {
        // Will be available on both server and client
        backendUrl: process.env.REACT_APP_API_URL,
      },
}

module.exports = nextConfig
