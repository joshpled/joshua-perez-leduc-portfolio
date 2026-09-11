import type { Metadata } from "next";
import "./globals.css";

const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Freelance Software Engineer | Joshua Perez Leduc",
  description: "Independent software engineer building focused web, mobile, SaaS, cloud, and custom software products.",
  icons: {
    icon: `${assetBasePath}/favicon.svg`,
    shortcut: `${assetBasePath}/favicon.svg`,
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
