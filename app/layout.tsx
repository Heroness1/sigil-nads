import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { FrameProvider } from "@/components/farcaster-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sigil Generator",
  description: "Create your personal sigil",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FrameProvider>{children}</FrameProvider>
      </body>
    </html>
  );
}
