/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.jp",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
