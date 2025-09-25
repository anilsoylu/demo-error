import FakeLayout from "@/modules/fake/layout";
import OriginalLayout from "@/modules/original/layout";
import { Metadata } from "next";
import { headers } from "next/headers";

const site_url = process.env.SITE_URL || "";

export default async function HomePage() {
  const headersList = await headers();
  const layoutType = headersList.get("x-layout-type");
  return layoutType === "fakeui" ? <FakeLayout /> : <OriginalLayout />;
}

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const layoutType = headersList.get("x-layout-type");

  if (layoutType === "fakeui") {
    return {
      title: "KzamLongIsland Gaming Platform | Free Online Games & Tournaments",
      description:
        "Join KzamLongIsland for exciting online games, competitive tournaments, and social gaming experiences. Start playing now and compete with friends!",
      keywords:
        "online games, gaming platform, tournaments, free games, multiplayer games, competitive gaming",
      openGraph: {
        title: "KzamLongIsland Gaming Platform",
        description:
          "The most exciting online games and tournaments are here! Play with friends and win amazing prizes.",
        type: "website",
      },
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
    title: "Original Home Page Title",
    description: "Original Home Page Description",
    alternates: {
      canonical: site_url + "/",
      languages: {
        tr: site_url + "/demo_page/",
        en: site_url + "/en/",
      },
    },
  };
}
