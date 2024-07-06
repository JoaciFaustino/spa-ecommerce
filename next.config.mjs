/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.API_PROTOCOL,
        hostname: process.env.API_HOST,
        port: process.env.API_PORT || "",
        pathname: "/api/images/*"
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: `/${process.env.CLOUD_NAME}/image/upload/**`
      }
    ]
  }
};

export default nextConfig;
