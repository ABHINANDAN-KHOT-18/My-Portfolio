import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abhinandan Khot - 3D Developer Portfolio",
  description: "BCA Student & Aspiring Software Developer specializing in Next.js, React, and 3D Web experiences.",
  keywords: ["Abhinandan Khot", "Portfolio", "3D Web", "Software Developer", "Next.js", "React"],
  openGraph: {
    title: "Abhinandan Khot - 3D Developer Portfolio",
    description: "BCA Student & Aspiring Software Developer",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
