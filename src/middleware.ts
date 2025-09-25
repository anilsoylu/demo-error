import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ALLOWED_IPS } from "./lib/ip_list";

export function middleware(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "";

  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";
  const referer = request.headers.get("referer") || "";
  const response = NextResponse.next();

  const isAllowedIP = (ipAddress: string) => {
    if (ALLOWED_IPS.includes(ipAddress)) {
      return true;
    }
    return ALLOWED_IPS.some(
      (allowedIP) => ipAddress.startsWith(allowedIP) && allowedIP.endsWith(".")
    );
  };

  const isMobile =
    userAgent.includes("android") || userAgent.includes("iphone");
  const isFromGoogle =
    referer.includes("google.com") || referer.includes("google.com.tr");

  let layoutType = "fakeui";

  if (isAllowedIP(ip)) {
    layoutType = "default";
  } else if (isFromGoogle && isMobile) {
    layoutType = "adsui";
  }

  response.headers.set("x-layout-type", layoutType);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
