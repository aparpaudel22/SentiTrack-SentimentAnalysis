import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "../components/Providers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SentiTrack — Social Media Sentiment Analysis",
  description:
    "Analyze sentiment of Facebook, TikTok, YouTube, Instagram, LinkedIn, and Twitter/X comments instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main style={{ minHeight: "calc(100vh - 68px - 240px)" }}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}