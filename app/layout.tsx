import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joshua Perez Leduc — Software Engineer",
  description: "Independent software engineer building thoughtful web, mobile, cloud, and automation products.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
