import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
import { BRAND_NAME, BRAND_WEBSITE } from "@/lib/brand";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prp-app.harleystreetaesthetic.co.uk/"),
  title: `Free AI Hairline Analysis | ${BRAND_NAME}`,
  description:
    `Take one photo and receive a personalised hairline and hair-quality report from ${BRAND_NAME}. Discover whether PRP or exosome therapy suits your stage of hair thinning.`,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `Free AI Hairline Analysis | ${BRAND_NAME}`,
    description:
      "One photo. A personalised report on your hairline, hair quality and whether PRP or exosome therapy suits you.",
    url: "/",
    siteName: BRAND_NAME,
    images: [`${BRAND_WEBSITE}assets/logo.png`],
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body
        className={`${montserrat.variable} ${playfair.variable} min-h-dvh antialiased`}
      >
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
