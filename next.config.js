/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // Generates a static `out/` folder — required for GitHub Pages
  output: 'export',

  // Set this to your repo name if hosting at username.github.io/grey-site
  // Remove or set to '' if using a custom domain or username.github.io
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',

  // GitHub Pages serves static files directly and does not rewrite to route folders.
  // Ensures routes export as `/path/index.html` instead of `/path.html`.
  trailingSlash: true,

  // Required for static export — Next.js image optimization needs a server
  images: {
    unoptimized: true,
  },

}

module.exports = nextConfig
