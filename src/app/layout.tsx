import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WayFinder | Explore. Plan. Go.",
  description: "A sua plataforma centralizada e interativa de planeamento de viagens internacionais e realojamento.",
  keywords: ["viagens", "visto", "segurança", "custos", "clima", "estudos no estrangeiro", "emigração"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 font-sans selection:bg-indigo-500/20 selection:text-indigo-900 dark:selection:text-indigo-200">
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
