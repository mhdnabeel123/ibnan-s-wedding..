import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Plus_Jakarta_Sans, Cinzel } from "next/font/google";
import "./globals.css";
import { weddingData } from "@/data/wedding";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#581825",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ibnan-tanziya-wedding.vercel.app"),
  title: weddingData.website.title,
  description: weddingData.website.description,
  keywords: [
    "Ibnan Shaik",
    "Tanziya Banu",
    "Valima Invitation",
    "Wedding Invitation Mysore",
    "Hilton Garden Mysore",
    "Sheikh Traders Mysore",
    "A.H. Shabeer Hussain",
  ],
  authors: [{ name: "A.H. Shabeer Hussain Family" }],
  openGraph: {
    title: weddingData.website.title,
    description: weddingData.website.description,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/wedding-card-cover.jpg",
        width: 1200,
        height: 1600,
        alt: "Ibnan & Tanziya Valima Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: weddingData.website.title,
    description: weddingData.website.description,
    images: ["/images/wedding-card-cover.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${greatVibes.variable} ${cinzel.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#FFF9F3] text-[#3A2218] antialiased selection:bg-[#F2BFA9] selection:text-[#581825] overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
