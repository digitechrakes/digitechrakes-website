"use client";

type TrackWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

/** Send anonymous conversion events only; never pass form values or contact details. */
export function trackEvent(eventName: string) {
  if (typeof window === "undefined") return;
  const trackingWindow = window as TrackWindow;
  trackingWindow.dataLayer?.push({ event: eventName });
  trackingWindow.gtag?.("event", eventName);
  trackingWindow.fbq?.("trackCustom", eventName);
}
