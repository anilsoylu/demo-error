import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ALLOWED_IPS } from "@/lib/ip_list";
import { advancedBotDetector } from "@/lib/advanced-bot-detection";

export async function middleware(request: NextRequest) {
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "";

  const response = NextResponse.next();

  // Manuel izin verilen IP'leri kontrol et
  const isManuallyAllowedIP = (ipAddress: string) => {
    if (ALLOWED_IPS.includes(ipAddress)) {
      return true;
    }
    return ALLOWED_IPS.some(
      (allowedIP) => ipAddress.startsWith(allowedIP) && allowedIP.endsWith(".")
    );
  };

  // Advanced bot detection
  const headers: Record<string, string | undefined> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const fingerprint = advancedBotDetector.createFingerprint(headers, ip);
  const userAgent = fingerprint.userAgent.toLowerCase();
  const isDevelopment = request.nextUrl.hostname === "localhost";
  const claimsGoogleBot = userAgent.includes("googlebot");

  let botAnalysis;

  if (isDevelopment && claimsGoogleBot) {
    // Localhost'ta Google Bot olduğunu iddia eden bir istek her zaman sahtedir.
    // DNS kontrolünü atlayıp doğrudan bot olarak işaretle.
    botAnalysis = {
      isBot: true,
      confidence: 100,
      reasons: ["Spoofed Google Bot on localhost"],
      allowAccess: false,
    };
  } else {
    botAnalysis = await advancedBotDetector.detectBot(fingerprint);
  }
  const referer = request.headers.get("referer") || "";
  const isMobile =
    userAgent.includes("android") || userAgent.includes("iphone");
  const isFromGoogle =
    referer.includes("google.com") || referer.includes("google.com.tr");

  let layoutType = "fakeui"; // Default olarak herkese fake ver

  // Manuel izin verilen IP'lerse default ver
  if (isManuallyAllowedIP(ip)) {
    layoutType = "default";
  }
  // SADECE gerçek Google Bot'lara orjinal content ver
  else if (
    botAnalysis.allowAccess &&
    botAnalysis.reasons.includes("Verified legitimate Google Bot")
  ) {
    layoutType = "default";
  }
  // HER ŞEY ELSE FAKE LAYOUT
  else {
    layoutType = "fakeui"; // Herkese fake layout
  }

  response.headers.set("x-layout-type", layoutType);
  response.headers.set("x-bot-confidence", botAnalysis.confidence.toString());
  response.headers.set("x-bot-reasons", botAnalysis.reasons.join(";"));

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  runtime: "nodejs",
};
