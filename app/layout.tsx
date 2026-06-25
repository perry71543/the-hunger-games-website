import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";
import "./effects.css";

export const metadata: Metadata = {
  title: {
    default: "Mockingjay Memorial Archive",
    template: "%s | Mockingjay Memorial Archive",
  },
  description:
    "A private archive for Panem, rebellion, memory, and fire.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      "https://mockingjay-memorial-archive.vercel.app",
  ),
  openGraph: {
    title: "Mockingjay Memorial Archive",
    description:
      "A private archive for Panem, rebellion, memory, and fire.",
    type: "website",
    locale: "zh_TW",
    images: [
      {
        url: "/images/panem-archive-hero.jpg",
        width: 1280,
        height: 720,
        alt: "Mockingjay Memorial Archive underground memorial vault",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mockingjay Memorial Archive",
    description:
      "A private archive for Panem, rebellion, memory, and fire.",
    images: ["/images/panem-archive-hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
