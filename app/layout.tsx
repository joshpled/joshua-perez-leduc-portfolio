import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://allpurposeapps.com"),
  title: "All-Purpose Apps | Custom Software for Businesses and Big Ideas",
  description: "All-Purpose Apps builds websites, web apps, mobile apps, desktop apps, and original software products.",
  manifest: "/brand/site.webmanifest",
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon.ico" },
    ],
    shortcut: "/brand/favicon.ico",
    apple: "/brand/apple-touch-icon.png",
  },
  openGraph: {
    title: "All-Purpose Apps | Custom Software for Businesses and Big Ideas",
    description: "Your ideas. Made from scratch. Websites, web apps, mobile apps, desktop apps, and original software products.",
    url: "https://allpurposeapps.com",
    siteName: "All-Purpose Apps",
    type: "website",
    images: [
      {
        url: "/brand/share-card-1200x630.png",
        width: 1200,
        height: 630,
        alt: "All-Purpose Apps — your ideas, made from scratch.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All-Purpose Apps | Custom Software for Businesses and Big Ideas",
    description: "Your ideas. Made from scratch.",
    images: ["/brand/share-card-1200x630.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
