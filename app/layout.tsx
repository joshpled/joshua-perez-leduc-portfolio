import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "All-Purpose Apps | Custom Software for Businesses and Big Ideas",
  description: "All-Purpose Apps builds websites, web apps, mobile apps, desktop apps, and original software products.",
  icons: {
    icon: "/brand/all-purpose-apps-icon.png",
    shortcut: "/brand/all-purpose-apps-icon.png",
    apple: "/brand/all-purpose-apps-icon.png",
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
