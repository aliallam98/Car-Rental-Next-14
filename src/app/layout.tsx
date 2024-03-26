import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Car Rental",
  description: "Generated by Ali Allam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <Toaster />
        <body>{children}</body>
      </ClerkProvider>
    </html>
  );
}
