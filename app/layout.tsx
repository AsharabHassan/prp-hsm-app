import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
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
  title: "Free AI Hairline Analysis | Harley Street Aesthetics",
  description:
    "Take one photo and receive a personalised hairline and hair-quality report from Harley Street Aesthetics. Discover whether PRP or exosome therapy suits your stage of hair thinning.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Free AI Hairline Analysis | Harley Street Aesthetics",
    description:
      "One photo. A personalised report on your hairline, hair quality and whether PRP or exosome therapy suits you.",
    images: [
      "https://images-strategyguys.netlify.app/harleystreemedics-image-source-main/hsa%20logo.png",
    ],
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
