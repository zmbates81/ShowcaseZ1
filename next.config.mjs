/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ESLint is not part of the dependency set; never let it block a production build.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
