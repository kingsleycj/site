import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/fx/MotionProvider";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import { THEME_SCRIPT } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.meta.title, template: `%s · ${site.name}` },
  description: site.meta.description,
  keywords: [...site.meta.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "profile",
    siteName: `${site.name} — Portfolio`,
    locale: "en_GB",
    url: site.url,
    title: site.meta.title,
    description: site.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#161616" },
    { media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontVariables} h-full`} suppressHydrationWarning>
      <body className="min-h-full">
        {/* Sets data-theme before first paint: stored choice, then OS preference, then dark. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <MotionProvider>{children}</MotionProvider>
        <JsonLd />
      </body>
    </html>
  );
}
