import { MetadataRoute } from "next";

const site_url = process.env.SITE_URL || "";

export const runtime = "edge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: site_url + "/",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];
}
