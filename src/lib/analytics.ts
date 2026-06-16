import { sendGAEvent } from "@next/third-parties/google";

/**
 * Safe wrapper around sendGAEvent.
 * Silently no-ops if GA hasn't been initialized yet (env var missing,
 * or script still loading) — prevents console warnings in those cases.
 */
export function trackEvent(
  name: string,
  params: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;

  const gaReady = typeof (window as { gtag?: unknown }).gtag === "function";
  if (!gaReady) return;
  sendGAEvent("event", name, params);
}
