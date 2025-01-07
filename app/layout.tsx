import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Pasundo - Your Book-and-Ride Solution",
  description:
    "At Pasundo, we provide you with the best book-and-ride solution. Book a ride with us today!",
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
