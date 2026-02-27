/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com', // <-- This is the crucial addition!
            },
            {
                protocol: 'https',
                hostname: 'i.pinimg.com',
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'carmentune.com',
            },
            {
                protocol: 'https',
                hostname: 'zeroheight-wordpress-uploads.s3.amazonaws.com',
            }
        ],
    },
};

export default nextConfig;