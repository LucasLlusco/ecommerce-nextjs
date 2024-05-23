import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import withBundleAnalyzer from '@next/bundle-analyzer'; 

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  sassOptions: {
    includePaths: [join(__dirname, 'src/sass')], 
    prependData: `@import "main.sass"`,
  },
  images: {
    remotePatterns: [{
      hostname: 'cdn.shopify.com',
      protocol: 'https'      
    }] 
  }
};

export default bundleAnalyzer(nextConfig);