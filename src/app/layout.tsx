import type { Metadata } from "next";
import "./globals.css";

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Gabriel Almir",
  description: "A backend developer with over 10 years of experience in the JavaScript ecosystem, specializing in building robust and scalable applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        {children}
      </body>
    </html>
  );
}
