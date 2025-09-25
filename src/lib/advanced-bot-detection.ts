import { verifyGoogleBot } from "@/lib/dns-verification";

// Advanced Bot Detection System
// Inspired by enterprise-level cloaking techniques

interface BotDetectionResult {
  isBot: boolean;
  confidence: number;
  reasons: string[];
  allowAccess: boolean;
}

interface RequestFingerprint {
  ip: string;
  userAgent: string;
  acceptLanguage?: string;
  acceptEncoding?: string;
  connection?: string;
  referer?: string;
  xForwardedFor?: string;
  cfConnectingIp?: string;
  cfIpCountry?: string;
  cfRay?: string;
}

export class AdvancedBotDetector {
  private suspiciousPatterns = [
    "curl",
    "wget",
    "python",
    "postman",
    "insomnia",
    "httpie",
    "scrapy",
    "selenium",
    "phantomjs",
    "headless",
    "bot",
    "spider",
    "crawler",
    "scraper",
    "axios",
    "fetch",
    "requests",
  ];

  /**
   * Ana bot detection fonksiyonu
   */
  public async detectBot(
    fingerprint: RequestFingerprint
  ): Promise<BotDetectionResult> {
    const results: BotDetectionResult = {
      isBot: false,
      confidence: 0,
      reasons: [],
      allowAccess: false,
    };

    let suspicionScore = 0;
    const reasons: string[] = [];

    // 1. User-Agent analizi
    const uaAnalysis = this.analyzeUserAgent(fingerprint.userAgent);
    suspicionScore += uaAnalysis.score;
    if (uaAnalysis.reasons.length > 0) {
      reasons.push(...uaAnalysis.reasons);
    }

    // 2. Header consistency kontrolü
    const headerAnalysis = this.analyzeHeaders(fingerprint);
    suspicionScore += headerAnalysis.score;
    if (headerAnalysis.reasons.length > 0) {
      reasons.push(...headerAnalysis.reasons);
    }

    // 3. Google Bot özel kontrolü
    const googleBotAnalysis = await this.analyzeGoogleBot(fingerprint);
    if (googleBotAnalysis.isLegitimate) {
      return {
        isBot: false,
        confidence: 0,
        reasons: ["Verified legitimate Google Bot"],
        allowAccess: true,
      };
    }
    if (googleBotAnalysis.isSpoofed) {
      suspicionScore += 100;
      reasons.push("Spoofed Google Bot detected");
    }

    // 4. IP analizi
    const ipAnalysis = this.analyzeIP(
      fingerprint.ip,
      fingerprint.cfConnectingIp
    );
    suspicionScore += ipAnalysis.score;
    if (ipAnalysis.reasons.length > 0) {
      reasons.push(...ipAnalysis.reasons);
    }

    // 5. Cloudflare headers analizi (eğer varsa)
    if (fingerprint.cfRay || fingerprint.cfIpCountry) {
      const cfAnalysis = this.analyzeCloudflareHeaders(fingerprint);
      suspicionScore += cfAnalysis.score;
      if (cfAnalysis.reasons.length > 0) {
        reasons.push(...cfAnalysis.reasons);
      }
    }

    // Sonuç hesaplama
    results.confidence = Math.min(suspicionScore, 100);
    results.isBot = suspicionScore >= 30; // %30 eşik değeri
    results.reasons = reasons;
    results.allowAccess = !results.isBot || googleBotAnalysis.isLegitimate;

    return results;
  }

  private analyzeUserAgent(userAgent: string): {
    score: number;
    reasons: string[];
  } {
    if (!userAgent) {
      return { score: 50, reasons: ["Missing User-Agent header"] };
    }

    const ua = userAgent.toLowerCase();
    const reasons: string[] = [];
    let score = 0;

    // Şüpheli pattern'lar
    for (const pattern of this.suspiciousPatterns) {
      if (ua.includes(pattern)) {
        score += 40;
        reasons.push(`Suspicious pattern detected: ${pattern}`);
      }
    }

    // Çok kısa User-Agent
    if (userAgent.length < 20) {
      score += 30;
      reasons.push("Unusually short User-Agent");
    }

    // Genel browser pattern'ı yok
    if (
      !ua.includes("mozilla") &&
      !ua.includes("webkit") &&
      !ua.includes("gecko")
    ) {
      score += 25;
      reasons.push("Missing common browser identifiers");
    }

    // Şüpheli kombinasyonlar
    if (ua.includes("chrome") && !ua.includes("webkit")) {
      score += 20;
      reasons.push("Invalid Chrome User-Agent pattern");
    }

    return { score, reasons };
  }

  private analyzeHeaders(fingerprint: RequestFingerprint): {
    score: number;
    reasons: string[];
  } {
    const reasons: string[] = [];
    let score = 0;

    // Accept-Language eksikliği
    if (!fingerprint.acceptLanguage) {
      score += 15;
      reasons.push("Missing Accept-Language header");
    }

    // Accept-Encoding eksikliği
    if (!fingerprint.acceptEncoding) {
      score += 15;
      reasons.push("Missing Accept-Encoding header");
    }

    // Şüpheli Connection header
    if (fingerprint.connection?.toLowerCase() === "close") {
      score += 10;
      reasons.push("Suspicious Connection header");
    }

    // Header tutarsızlığı
    if (
      fingerprint.userAgent?.includes("chrome") &&
      fingerprint.acceptEncoding &&
      !fingerprint.acceptEncoding.includes("br")
    ) {
      score += 20;
      reasons.push("Header inconsistency detected");
    }

    return { score, reasons };
  }

  private async analyzeGoogleBot(fingerprint: RequestFingerprint): Promise<{
    isLegitimate: boolean;
    isSpoofed: boolean;
  }> {
    const ua = fingerprint.userAgent?.toLowerCase() || "";
    const ip = fingerprint.ip;

    // Google Bot olduğunu iddia ediyor mu? (User-Agent kontrolü)
    const claimsGoogleBot = ua.includes("googlebot");

    if (!claimsGoogleBot) {
      return { isLegitimate: false, isSpoofed: false };
    }

    // User-Agent'ta googlebot varsa, DNS doğrulaması yap
    const isVerified = await verifyGoogleBot(ip);

    if (isVerified) {
      // DNS doğrulaması başarılıysa, bu gerçek bir Google Bot'tur.
      return { isLegitimate: true, isSpoofed: false };
    } else {
      // Google Bot olduğunu iddia ediyor ama DNS doğrulaması başarısızsa, bu sahtedir.
      return { isLegitimate: false, isSpoofed: true };
    }
  }

  private analyzeIP(
    ip: string,
    cfConnectingIp?: string
  ): { score: number; reasons: string[] } {
    const reasons: string[] = [];
    let score = 0;

    // IP format kontrolü
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) {
      score += 30;
      reasons.push("Invalid IP format");
    }

    // Cloudflare ve X-Forwarded-For tutarsızlığı
    if (cfConnectingIp && cfConnectingIp !== ip) {
      score += 10;
      reasons.push("IP header inconsistency");
    }

    // Localhost/private IP'ler
    if (
      ip.startsWith("127.") ||
      ip.startsWith("192.168.") ||
      ip.startsWith("10.")
    ) {
      score += 20;
      reasons.push("Private/localhost IP detected");
    }

    return { score, reasons };
  }

  private analyzeCloudflareHeaders(fingerprint: RequestFingerprint): {
    score: number;
    reasons: string[];
  } {
    const reasons: string[] = [];
    let score = 0;

    // CF-Ray eksikliği
    if (!fingerprint.cfRay) {
      score += 15;
      reasons.push("Missing CF-Ray header (possible direct connection)");
    }

    // Ülke bilgisi eksikliği
    if (!fingerprint.cfIpCountry) {
      score += 10;
      reasons.push("Missing CF-IPCountry header");
    }

    return { score, reasons };
  }

  /**
   * Request'ten fingerprint oluştur
   */
  public createFingerprint(
    headers: Record<string, string | undefined>,
    ip: string
  ): RequestFingerprint {
    return {
      ip,
      userAgent: headers["user-agent"] || "",
      acceptLanguage: headers["accept-language"],
      acceptEncoding: headers["accept-encoding"],
      connection: headers.connection,
      referer: headers.referer,
      xForwardedFor: headers["x-forwarded-for"],
      cfConnectingIp: headers["cf-connecting-ip"],
      cfIpCountry: headers["cf-ipcountry"],
      cfRay: headers["cf-ray"],
    };
  }
}

// Singleton instance
export const advancedBotDetector = new AdvancedBotDetector();
