import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn-icons-png.flaticon.com'],
  },
};

export default withNextIntl(nextConfig);
