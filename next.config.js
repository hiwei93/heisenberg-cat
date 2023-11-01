/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/cat',
                permanent: false,
            },
        ]
    },
}

module.exports = nextConfig
