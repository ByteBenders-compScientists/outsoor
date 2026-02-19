import type { NextRequest } from "next/server"

/**
 * Returns the canonical public base URL for redirects (payments, emails, etc).
 *
 * Priority:
 *  1) APP_URL (server-only, recommended)
 *  2) NEXT_PUBLIC_APP_URL
 *  3) x-forwarded-proto + x-forwarded-host (when behind a proxy)
 *  4) request.url origin (last resort)
 */
export function getAppUrl(req?: NextRequest | Request): string {
  const fromEnv = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL

  let base = fromEnv

  if (!base && req) {
    // Try proxy headers first (typical for production behind a load balancer)
    const headers = "headers" in req ? req.headers : undefined
    const xfHost = headers?.get("x-forwarded-host")
    const xfProto = headers?.get("x-forwarded-proto")

    if (xfHost) {
      const proto = xfProto || "https"
      base = `${proto}://${xfHost}`
    } else {
      // Last resort: derive from the request URL
      base = new URL(req.url).origin
    }
  }

  if (!base) {
    throw new Error(
      "APP_URL/NEXT_PUBLIC_APP_URL is not set and no request was provided to infer the origin"
    )
  }

  // Normalize
  base = base.trim().replace(/\/$/, "")

  // Hard safety: never allow localhost redirects in production
  const isProd = process.env.NODE_ENV === "production"
  if (isProd && /(localhost|127\.0\.0\.1)/i.test(base)) {
    throw new Error(
      `Refusing to use localhost base URL in production. Resolved base was: ${base}`
    )
  }

  return base
}
