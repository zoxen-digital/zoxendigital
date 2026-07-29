import type { Metadata } from "next";
import { Sora, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zoxen Digital - Websites That Elevate Brands",
  description: "We build fast, modern and conversion-focused websites that help businesses stand out and grow online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${hankenGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}
