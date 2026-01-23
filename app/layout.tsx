import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mayanka Sharma | Software Engineer",
  description: "Portfolio of Mayanka Sharma - Mid-level Software Engineer specializing in React, Next.js, and full-stack development",
  keywords: ["Software Engineer", "React", "Next.js", "TypeScript", "Full Stack Developer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
