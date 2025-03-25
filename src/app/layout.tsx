import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { ClientBody } from "./ClientBody";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "FinScope - AI-Powered Financial Health Dashboard",
  description: "Monitor your financial health, track spending trends, and get AI-powered investment insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Toaster position="top-right" />
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
