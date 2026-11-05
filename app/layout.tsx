import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Digi Tech Rakes | Digital Marketing Consultant for Local Businesses",
  description:
    "Practical digital marketing consultation for local businesses in Nepal. Diagnose the gaps between attention, customer inquiries and follow-up before choosing what to do next.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Digi Tech Rakes | Digital Marketing Consultant for Local Businesses",
    description:
      "A practical digital system that helps local businesses connect attention to customer inquiries.",
    url: siteUrl,
    siteName: "Digi Tech Rakes",
    images: [{ url: "/opengraph-image.svg", width: 1200, height: 630, alt: "Digi Tech Rakes — Digital marketing consultation for local businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digi Tech Rakes | Digital Marketing Consultant for Local Businesses",
    description: "Start with clarity before spending more money on marketing.",
    images: ["/opengraph-image.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#070d16",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
