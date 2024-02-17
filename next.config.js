/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/audiobooks/:slug*',
        destination: '/audiobooks/:slug*', // Путь к папке public, где хранятся файлы
      },
    ]
  },
}

module.exports = nextConfig
