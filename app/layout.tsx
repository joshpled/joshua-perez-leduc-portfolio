import type { Metadata } from "next";
import "./globals.css";

const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "All-Purpose Apps | Custom Software for Businesses and Big Ideas",
  description: "All-Purpose Apps builds websites, web apps, mobile apps, desktop apps, and original software products.",
  icons: {
    icon: `${assetBasePath}/brand/all-purpose-apps-icon.png`,
    shortcut: `${assetBasePath}/brand/all-purpose-apps-icon.png`,
    apple: `${assetBasePath}/brand/all-purpose-apps-icon.png`,
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
