import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ALLOWED_IPS } from "./lib/ip_list";

const isAllowedIP = (ipAddress: string) => {
  for (const allowedIP of ALLOWED_IPS) {
    if (allowedIP.endsWith(".")) {
      if (ipAddress.startsWith(allowedIP)) return true;
    } else if (ipAddress === allowedIP) return true;
  }
  return false;
};

export function middleware(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "";

  const userAgent = request.headers.get("user-agent") || "";
  const response = NextResponse.next();

  const isGoogleBot = userAgent.includes("Googlebot");

  let layoutType = "fakeui";

  if (isAllowedIP(ip) && isGoogleBot) {
    layoutType = "default";
  } else {
    const userAgentLower = userAgent.toLowerCase();
    const isMobile =
      userAgentLower.includes("android") || userAgentLower.includes("iphone");

    if (isMobile) {
      const referer = request.headers.get("referer") || "";
      const isFromGoogle =
        referer.includes("google.com") || referer.includes("google.com.tr");

      if (isFromGoogle) {
        layoutType = "adsui";
      }
    }
  }

  response.headers.set("x-layout-type", layoutType);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|hreflang.xml).*)"],
};
