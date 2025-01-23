import type { Metadata, Viewport } from "next";
import { Poppins, Rajdhani } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pasundo.com"),
  title: {
    default: "Pasundo - Your Book-and-Ride Solution",
    template: "%s | Pasundo",
  },
  description:
    "At Pasundo, we provide you with the best book-and-ride solution. Book a ride with us today!",
  keywords: [
    "ride hailing",
    "book a ride",
    "taxi service",
    "transportation",
    "pasundo",
  ],
  authors: [{ name: "Shrader Technologies" }],
  creator: "Shrader Technologies",
  publisher: "Pasundo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "your-google-site-verification",
  },
  openGraph: {
    type: "website",
    siteName: "Pasundo",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rajdhani.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
