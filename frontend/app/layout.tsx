import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI GTM Engine | Sales & Marketing Automation",
  description: "Advanced AI solutions for Lead Generation, Voice Bots, and Content Automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-background text-foreground flex h-screen overflow-hidden`}>
        <Sidebar aria-label="Main Navigation" />
        <main className="flex-1 overflow-y-auto relative bg-[#050505]">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 p-4 md:p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
