import FakeLayout from "@/modules/fake/layout";
import OriginalLayout from "@/modules/original/layout";
import { Metadata } from "next";
import { headers } from "next/headers";

const site_url = process.env.SITE_URL || "";

export default async function DemoPage() {
  const headersList = await headers();
  const layoutType = headersList.get("x-layout-type");
  return layoutType === "fakeui" ? (
    <FakeLayout />
  ) : layoutType === "adsui" ? (
    <div>AdsUI</div>
  ) : (
    <OriginalLayout />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const layoutType = headersList.get("x-layout-type");

  if (layoutType === "fakeui") {
    return {
      title: "Fake Demo Page Title",
      description: "Fake Demo Page Description",
      alternates: {
        canonical: site_url + "/",
        languages: {
          tr: site_url + "/demo_page/",
          en: site_url + "/en/",
        },
      },
    };
  }

  return {
    title: "Original Demo Page Title",
    description: "Original Demo Page Description",
    alternates: {
      canonical: site_url + "/",
      languages: {
        tr: site_url + "/demo_page/",
        en: site_url + "/en/",
      },
    },
  };
}
