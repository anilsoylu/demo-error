import { MetadataRoute } from "next";

const site_url = process.env.SITE_URL || "";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${site_url}/sitemap.xml`,
  };
}
