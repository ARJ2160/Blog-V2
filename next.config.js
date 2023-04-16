/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // images: {
  //   domains: ['images.unsplash.com']
  // }
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  }
};
