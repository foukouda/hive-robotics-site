import type { MetadataRoute } from "next";

const BASE = "https://hiverobotics.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/robots", priority: 0.8 },
    { path: "/publicite", priority: 0.7 },
    { path: "/a-propos", priority: 0.7 },
    { path: "/faq", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    { path: "/partenaires", priority: 0.8 },
    { path: "/mentions-legales", priority: 0.3 },
    { path: "/cgv", priority: 0.3 },
    { path: "/confidentialite", priority: 0.3 },
    { path: "/dis", priority: 0.3 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));
}
