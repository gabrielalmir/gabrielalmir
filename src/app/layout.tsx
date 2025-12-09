import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CommandMenu } from "@/components/command-menu";
import { CustomCursor } from "@/components/custom-cursor";
import { VimScroll } from "@/components/vim-scroll";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gabriel Almir | Backend Software Engineer",
  description: "Portfolio of Gabriel Almir, a Backend Software Engineer specializing in Node.js, Python, and AWS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <CustomCursor />
        <CommandMenu />
        <VimScroll />
        {children}
      </body>
    </html>
  );
}
