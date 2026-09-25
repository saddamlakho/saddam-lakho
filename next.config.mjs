/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', 'lenis'],
  images: {
    unoptimized: true
  }
};

export default nextConfig;
