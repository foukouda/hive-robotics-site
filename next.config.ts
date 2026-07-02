import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Partner logos (Rainbooh, trust-bar, social-proof, press…) are SVGs served
    // from /public. next/image refuses to optimize SVG unless this is enabled.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
