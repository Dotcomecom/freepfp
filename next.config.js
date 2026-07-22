/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/style-previews/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate, s-maxage=60" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
