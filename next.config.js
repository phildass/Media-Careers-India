/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
    bodyParser: false, // We'll use custom body parsing for file uploads
  },
}

module.exports = nextConfig
