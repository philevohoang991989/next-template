/** @type {import('next').NextConfig} */

const path = require('path');
const nextConfig = {
    publicRuntimeConfig: {
        // Will be available on both server and client
        backendUrl: process.env.REACT_APP_API_URL,
      },
      sassOptions: {
        includePaths: [path.join(__dirname, '*')],
      },
}

module.exports = nextConfig
