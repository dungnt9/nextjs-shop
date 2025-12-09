import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdProvider, AppProvider } from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shop Management System",
  description:
    "Modern shop management system built with Next.js and Ant Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdProvider>
          <AppProvider>{children}</AppProvider>
        </AntdProvider>
      </body>
    </html>
  );
}
