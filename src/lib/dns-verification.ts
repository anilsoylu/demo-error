import { promisify } from "util";
import { lookup, reverse } from "dns";

const dnsLookup = promisify(lookup);
const dnsReverse = promisify(reverse);

/**
 * Google Bot IP'sinin gerçek olup olmadığını reverse DNS ile doğrular
 * Google'ın resmi dokümanına göre: https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot
 */
export async function verifyGoogleBot(ip: string): Promise<boolean> {
  try {
    // 1. IP'den hostname'e reverse DNS lookup
    const hostnames = await dnsReverse(ip);

    if (!hostnames || hostnames.length === 0) {
      return false;
    }

    // 2. Hostname Google Bot'a ait mi kontrol et
    const hostname = hostnames[0];
    const isGoogleHostname =
      hostname.endsWith(".googlebot.com") || hostname.endsWith(".google.com");

    if (!isGoogleHostname) {
      return false;
    }

    // 3. Forward DNS lookup ile doğrula
    const resolvedIP = await dnsLookup(hostname);

    if (Array.isArray(resolvedIP)) {
      return resolvedIP.some((addr) => addr.address === ip);
    }

    return resolvedIP.address === ip;
  } catch (error) {
    console.error("DNS verification failed:", error);
    return false;
  }
}
